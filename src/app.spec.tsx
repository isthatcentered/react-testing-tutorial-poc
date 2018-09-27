import * as React from "react"
import { shallow, ShallowWrapper } from "enzyme"

class Emojictionnary {
	constructor(private _items: { [word: string]: string }) {}

	translate(word: string): string {
		const _word: string = word.toLowerCase()

		const match = Object.keys(this._items).find(
			(w: string) => _word.indexOf(w) > -1,
		)

		return this._items[match as any] || word
	}
}
const emojictionnary = new Emojictionnary({
	unicorn: "🦄",
	love: "😍",
})

class HappInput extends React.Component {
	state = { value: "" }

	render() {
		const { value } = this.state
		return (
			<div>
				<input
					value={value}
					onChange={e => this._handleInputChange(e.target.value)}
					type="text"
				/>
			</div>
		)
	}

	_handleInputChange = (value: string) => {
		const _value = value
			.trim()
			.split(" ")
			.map(w => emojictionnary.translate(w))
			.join(" ")

		this.setState({ value: _value })
	}
}

describe(`HappInput`, () => {
	let wrapper: ShallowWrapper
	beforeEach(() => {
		wrapper = shallow(<HappInput />)
	})

	test(`I can type in some text`, () => {
		type("Batman is the best")

		expectDisplayed("Batman is the best")
	})

	test(`When typing the word "love", it is replaced by "️😍"`, () => {
		type("I love Batman")

		expectDisplayed("I 😍 Batman")
	})

	test(`When typing the word "unicorn", it is replaced by "️🦄"`, () => {
		type("Get me a unicorn Gru")

		expectDisplayed("Get me a 🦄 Gru")
	})

	test(`Replaces multiple words at a time`, () => {
		type("Get me a unicorn Gru, I love them")

		expectDisplayed("Get me a 🦄 Gru, I 😍 them")
	})

	test(`Replaces a word every times it appears`, () => {
		type("love love love")

		expectDisplayed("😍 😍 😍")
	})

	test(`Ignores case when matching a word`, () => {
		type("Love")

		expectDisplayed("😍")
	})

	test(`Matches even with plural or passed form`, () => {
		type("unicorns loved")

		expectDisplayed("🦄 😍")
	})

	function type(content: string) {
		wrapper.find("input").simulate("change", { target: { value: content } })
	}

	function expectDisplayed(content: string) {
		expect(wrapper.html()).toContain(content)
	}
})
