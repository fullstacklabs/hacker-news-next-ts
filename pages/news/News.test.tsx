import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import NewsPage from "./[id]"

configure({ adapter: new Adapter() })

describe("<NewsPage />", () => {
	it("renders without crashing", () => {
		const wrapper = shallow(<NewsPage id={25049079} />)
		expect(wrapper).toHaveLength(1)
	})
})
