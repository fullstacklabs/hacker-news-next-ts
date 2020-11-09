import React from "react"
import { configure, shallow, ShallowWrapper } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import Index from "."
import { beforeEach } from "@jest/globals"

configure({ adapter: new Adapter() })

describe("<Index />", () => {
	let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>

	beforeEach(() => {
		wrapper = shallow(<Index />)
	})

	it("renders without crashing", () => {
		expect(wrapper).toHaveLength(1)
	})
})
