import * as React from "react"
import { render } from "react-dom"
import "./app.css"

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center",
}

const App = () => (
	<div className="container" style={styles}>
		<div className="message">
			Hello I ✉️️️j️u️s️t️ ️s️e️n️t️ ️y️o️u️ ️a️ ️ ✉️️{" "}
		</div>

		<div className="_spacer" />
		<div className="_spacer" />

		<div className="_relative">
			<input type="text" defaultValue="Hello 🌍, I ❤️ you" />
			<button>📬</button>
		</div>
	</div>
)

render(<App />, document.getElementById("root"))
