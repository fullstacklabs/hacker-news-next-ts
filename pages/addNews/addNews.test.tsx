import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import AddNews from "./"

const state = {
	by: "",
	title: "",
	url: "",
	loading: false,
}

configure({ adapter: new Adapter() })

describe("<AddNews />", () => {
	it("renders without crashing", () => {
		const wrapper = shallow(<AddNews {...state} />)
		expect(wrapper).toHaveLength(1)
	})
})
