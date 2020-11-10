import React, { useEffect, useState } from "react"
import { useGlobal } from "../store"
import InfiniteScroll from "react-infinite-scroll-component"
import { InitialState } from "../common/types"

interface Props extends InitialState {}

const Home: React.FC<Props> = () => {
	const [state, actions] = useGlobal()

	useEffect(() => {
		actions.getNewStories()
	}, [])

	return (
		<InfiniteScroll
			dataLength={state.news.length}
			next={actions.getMoreNews}
			hasMore={state.hasMore}
			loader={<h4>Loading...</h4>}
		>
			<div>
				{state.news &&
					state.news.map((item, index) => (
						<div key={index} className="post">
							<h3>{`${item.title}`}</h3>
						</div>
					))}
			</div>
		</InfiniteScroll>
	)
}

export default Home
