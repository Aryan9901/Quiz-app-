import React from "react";

const FinishedScreen = ({ points, maxPoints, highScore }) => {
	const percentage = (points / maxPoints) * 100;
	let emoji;
	if (percentage >= 95) emoji = "🥇";
	if (percentage >= 80 && percentage < 95) emoji = "🥈";
	if (percentage >= 65 && percentage < 80) emoji = "🥉";
	if (percentage >= 50 && percentage < 65) emoji = "🤕";
	if (percentage >= 30 && percentage < 50) emoji = "🤔";
	if (percentage > 0 && percentage < 30) emoji = "🫢";
	if (percentage === 0) emoji = "🤦‍♂️🤦‍♂️";
	return (
		<>
			<p className="result">
				<span>{emoji}</span>You Scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
			</p>
			<p className="highscore">(High Score: {highScore} Points)</p>
		</>
	);
};

export default FinishedScreen;
