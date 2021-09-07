import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import dotenv from "dotenv";
const dotEnvOptions = {
	path: "/.env",
};

dotenv.config(dotEnvOptions);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
