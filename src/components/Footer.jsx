import React from "react";
import SubmitButton from "./SubmitButton";
import NextButton from "./NextButton";
import Timer from "./Timer";

const Footer = ({ dispatch, answer, index, numQuestions, secondsRemaining }) => {
	return (
		<footer>
			<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
			{index + 1 !== numQuestions ? <NextButton dispatch={dispatch} answer={answer} /> : ""}
			{answer && index + 1 === numQuestions ? <SubmitButton dispatch={dispatch} /> : ""}
		</footer>
	);
};

export default Footer;
