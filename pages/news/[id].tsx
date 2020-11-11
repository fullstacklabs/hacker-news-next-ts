import React, { useEffect } from "react"
import styled from "styled-components"
import { useGlobal } from "../../store"
import { actions } from "../../actions"
import Comments from "../../components/Comments"
import Story from "../../components/Story"

interface Props {
	id: number
}

const StyledNews = styled.div`
	padding: 10px;
`

const News: React.FC<Props> = ({ id }) => {
	const [state, actions] = useGlobal()

	useEffect(() => {
		actions.getNewsById(id)
	}, [])

	useEffect(() => {
		if (state.newsPage) {
			actions.getCommentsById(state.newsPage.kids)
		}
	}, [state.newsPage])

	if (state.error) return <StyledNews>{state.error}</StyledNews>

	if (!state.newsPage) return <StyledNews>Loading...</StyledNews>

	const { kids } = state.newsPage

	return (
		<React.Fragment>
			<Story news={state.newsPage} />
			<Comments kids={kids} />
		</React.Fragment>
	)
}

type Params = {
	params: {
		id: string
	}
}

export async function getStaticProps({ params }: Params) {
	return {
		props: {
			id: parseInt(params.id, 10),
		},
	}
}

export async function getStaticPaths() {
	const jsonData = await actions.fetchNewStories()

	return {
		paths: jsonData.map((news: number) => ({
			params: {
				id: news.toString(),
			},
		})),
		fallback: false,
	}
}

export default News
