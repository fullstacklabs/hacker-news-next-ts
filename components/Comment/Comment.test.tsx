import React from "react"
import { configure, shallow, ShallowWrapper } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import Comment from "."

configure({ adapter: new Adapter() })

describe("<Comment />", () => {
	let wrapper: ShallowWrapper

	beforeEach(() => {
		wrapper = shallow(<Comment id={5} />)
	})

	it("renders without crashing", () => {
		expect(wrapper).toHaveLength(1)
	})
})
