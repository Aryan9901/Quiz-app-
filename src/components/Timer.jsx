import React, { useEffect } from "react";

const Timer = ({ dispatch, secondsRemaining }) => {
	const minutes = Math.floor(secondsRemaining / 60);
	const seconds = secondsRemaining % 60;
	useEffect(
		function () {
			const id = setInterval(function () {
				dispatch({ type: "tick" });
			}, 1000);
			return () => clearInterval(id);
		},
		[dispatch]
	);
	return (
		<div className="timer">
			{minutes}:{seconds}
		</div>
	);
};

export default Timer;
