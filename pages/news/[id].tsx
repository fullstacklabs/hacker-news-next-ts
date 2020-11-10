import React, { useEffect } from "react"
import styled from "styled-components"
import UpVote from "../../components/UpVote"
import { useGlobal } from "../../store"
import { actions } from "../../actions"
import { mapTime } from "../../common/util"

interface Props {
	id: number
}

const StyledNews = styled.div`
	padding: 10px;
`

const Header = styled.div`
	display: flex;
	align-items: baseline;
`

const Title = styled.h1`
	margin: 0 5px;
	font-size: 0.9rem;
	font-weight: normal;
`

const Domain = styled.div`
	font-size: 0.7rem;

	&,
	a {
		color: #828282;
	}

	a:hover {
		text-decoration: underline;
	}
`

const Details = styled.div`
	display: flex;
	align-items: baseline;
	margin: 5px 0 5px 19px;
	font-size: 0.7rem;
	color: #828282;
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

	const { by, kids, score, time, title, url, descendants } = state.newsPage

	const parsedDomain = new URL(url)

	return (
		<StyledNews>
			<Header>
				<UpVote />
				<Title>{title}</Title>
				<Domain>
					(<a href={url}>{parsedDomain.hostname}</a>)
				</Domain>
			</Header>
			<Details>
				{score} points by {by} {mapTime(time)} {descendants} comments
			</Details>
		</StyledNews>
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
