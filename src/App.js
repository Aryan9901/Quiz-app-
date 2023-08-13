import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";

const SEC_PER_QUESTION = 30;
const initialState = {
	questions: [],
	// 'loading' 'ready' 'error' 'finished' 'active'
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
	secondsRemaining: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return {
				...state,
				questions: action.payload,
				status: "ready",
			};
		case "dataFailed":
			return {
				...state,
				status: "error",
			};
		case "startQuiz":
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SEC_PER_QUESTION,
			};
		case "newAnswer":
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points: action.payload === question.correctOption ? state.points + question.points : state.points,
			};
		case "nextQuestion":
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		case "onSubmit":
			return {
				...state,
				answer: null,
				status: "finished",
				highScore: state.points > state.highScore ? state.points : state.highScore,
			};
		case "onRestart":
			return {
				...state,
				status: "ready",
				points: 0,
				index: 0,
				secondsRemaining: state.questions.length * SEC_PER_QUESTION,
			};
		case "tick":
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? "finished" : state.status,
				highScore: state.points > state.highScore ? state.points : state.highScore,
			};
		default:
			throw "invalid type!";
	}
}

function App() {
	const [{ questions, status, index, answer, points, highScore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);
	const numQuestions = questions.length;
	const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
	useEffect(function () {
		fetch("http://localhost:5500/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);
	return (
		<div className="app">
			<Header />
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && <StartScreen dispatch={dispatch} numQuestions={numQuestions} />}
				{status === "active" && (
					<>
						<Progress answer={answer} index={index} numQuestions={numQuestions} maxPoints={maxPoints} points={points} />
						<Question dispatch={dispatch} question={questions[index]} answer={answer} />
						<Footer secondsRemaining={secondsRemaining} dispatch={dispatch} numQuestions={numQuestions} index={index} answer={answer} />
					</>
				)}
				{status === "finished" && (
					<>
						<FinishedScreen highScore={highScore} points={points} maxPoints={maxPoints} />
						<button className="btn btn-ui" onClick={() => dispatch({ type: "onRestart" })}>
							Restart
						</button>
					</>
				)}
			</Main>
		</div>
	);
}

export default App;
