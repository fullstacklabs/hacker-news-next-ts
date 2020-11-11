import React from "react"
import { configure, shallow, ShallowWrapper } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import Comments from "."

configure({ adapter: new Adapter() })

describe("<Comments />", () => {
	let wrapper: ShallowWrapper

	beforeEach(() => {
		wrapper = shallow(<Comments kids={[1, 2, 3]} />)
	})

	it("renders without crashing", () => {
		expect(wrapper).toHaveLength(1)
	})
})
