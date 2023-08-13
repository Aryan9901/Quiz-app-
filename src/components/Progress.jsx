import React from "react";

const Progress = ({ index, numQuestions, points, maxPoints, answer }) => {
	return (
		<header className="progress">
			<progress max={numQuestions} value={index + Number(answer !== null)} />
			<p>
				Questions <strong> {index + 1}</strong> / {numQuestions}
			</p>
			<p>
				{points} / {maxPoints} points
			</p>
		</header>
	);
};

export default Progress;
