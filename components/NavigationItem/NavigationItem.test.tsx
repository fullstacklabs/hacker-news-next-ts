import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import Link from "next/link"

import NavigationItem from "."

configure({ adapter: new Adapter() })

describe("<NavigationItem />", () => {
	it("renders without crashing", () => {
		const wrapper = shallow(<NavigationItem href="/">Test</NavigationItem>)
		expect(wrapper).toHaveLength(1)
	})

	it("render children as text", () => {
		const wrapper = shallow(<NavigationItem href="/">Test</NavigationItem>)
		expect(wrapper.contains("Test")).toBe(true)
	})
})
