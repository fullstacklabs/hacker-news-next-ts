import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import Header from "."

configure({ adapter: new Adapter() })

describe("<Header />", () => {
	it("renders without crashing", () => {
		const wrapper = shallow(<Header />)
		expect(wrapper).toHaveLength(1)
	})
})
