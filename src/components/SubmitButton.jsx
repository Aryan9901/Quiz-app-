import React from "react";

const SubmitButton = ({ dispatch }) => {
	return (
		<>
			<button onClick={() => dispatch({ type: "onSubmit" })} className="btn btn-ui">
				Submit Now
			</button>
		</>
	);
};

export default SubmitButton;
