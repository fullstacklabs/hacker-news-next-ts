import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import Navigation from "."

configure({ adapter: new Adapter() })

describe("<Navigation />", () => {
	it("renders without crashing", () => {
		const wrapper = shallow(<Navigation />)
		expect(wrapper).toHaveLength(1)
	})
})
