import React, { useEffect, useState } from "react"
import { useGlobal } from "../store"
import InfiniteScroll from "react-infinite-scroll-component"
import { InitialState } from "../common/types"
import Story from "../components/Story"

interface Props extends InitialState {}

const Home: React.FC<Props> = () => {
	const [state, actions] = useGlobal()

	useEffect(() => {
		actions.getNewStories()
	}, [])

	return (
		<div>
			<InfiniteScroll
				dataLength={state.news.length}
				next={actions.getMoreNews}
				hasMore={state.hasMore}
				loader={<h4>Loading...</h4>}
				style={{ textAlign: "center" }}
			>
				<div style={{ textAlign: "center" }}>
					{state.news &&
						state.news.map((item, index) => <Story key={index} news={item} />)}
				</div>
			</InfiniteScroll>
		</div>
	)
}

export default Home
