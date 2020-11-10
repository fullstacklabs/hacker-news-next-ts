import React from "react"
import { configure, shallow, ShallowWrapper } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import Index from "./"
import { beforeEach } from "@jest/globals"
import { News } from "../../common/types"

configure({ adapter: new Adapter() })

const initialProps: News = {
	by: "roberth",
	id: 1234,
	kids: [12, 212, 32],
	score: 874,
	time: 1605032027,
	title: "this is a test title",
	url: "https://www.apple.com/apple-events/event-stream/?2020",
	type: "story",
	descendants: 304,
}

describe("<Index />", () => {
	let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>

	beforeEach(() => {
		wrapper = shallow(<Index news={initialProps} />)
	})

	it("renders without crashing", () => {
		expect(wrapper).toHaveLength(1)
	})
})
