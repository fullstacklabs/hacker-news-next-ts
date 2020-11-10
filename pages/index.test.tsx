import React from "react"
import { configure, shallow, ShallowWrapper } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import Index from "./"
import { beforeEach } from "@jest/globals"
import { InitialState } from "../common/types"

configure({ adapter: new Adapter() })

const initialProps: InitialState = {
	totalNews: [],
	currNews: [],
	error: "",
	countDisplay: { prev: 0, next: 30 },
	hasMore: true,
	news: [],
	comments: [],
}
describe("<Index />", () => {
	let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>

	beforeEach(() => {
		wrapper = shallow(<Index {...initialProps} />)
	})

	it("renders without crashing", () => {
		expect(wrapper).toHaveLength(1)
	})
})
