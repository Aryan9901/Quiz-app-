import React from "react";

const NextButton = ({ dispatch, answer }) => {
	if (answer === null) return;
	return (
		<>
			<button onClick={() => dispatch({ type: "nextQuestion" })} className="btn btn-ui">
				Next Question
			</button>
		</>
	);
};

export default NextButton;
