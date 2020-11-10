import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import Layout from "."

configure({ adapter: new Adapter() })

describe("<Layout />", () => {
	it("renders without crashing", () => {
		const wrapper = shallow(<Layout>Test</Layout>)
		expect(wrapper).toHaveLength(1)
	})

	it("renders children", () => {
		const wrapper = shallow(<Layout>Test</Layout>)
		expect(wrapper.contains("Test")).toBe(true)
	})
})
