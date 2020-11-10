import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import Footer from "."

configure({ adapter: new Adapter() })

describe("<Footer />", () => {
	it("renders without crashing", () => {
		const wrapper = shallow(<Footer />)
		expect(wrapper).toHaveLength(1)
	})
})
