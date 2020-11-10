import React from "react"
import { configure, shallow, ShallowWrapper } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import Comment from "."

configure({ adapter: new Adapter() })

describe("<Comment />", () => {
	let wrapper: ShallowWrapper

	beforeEach(() => {
		wrapper = shallow(
			<Comment
				by="Test Person"
				time={1605020470}
				text="Body text"
				expandToggleClick={() => null}
				isExpanded
				descendants={5}
			/>
		)
	})

	it("renders without crashing", () => {
		expect(wrapper).toHaveLength(1)
	})

	it("renders by prop", () => {
		if (wrapper === null || wrapper === undefined) return
		expect(wrapper.contains("Test Person")).toBe(true)
	})

	it("renders text prop", () => {
		if (wrapper === null || wrapper === undefined) return
		expect(wrapper.html()).toContain("Body text")
	})

	it("doesn't render body if not expanded", () => {
		if (wrapper === null || wrapper === undefined) return
		wrapper.setProps({ isExpanded: false })
		expect(wrapper.contains("Body text")).toBe(false)
	})
})
