import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import UpVote from "."

configure({ adapter: new Adapter() })

describe("<UpVote />", () => {
	it("renders without crashing", () => {
		const wrapper = shallow(<UpVote />)
		expect(wrapper).toHaveLength(1)
	})
})
