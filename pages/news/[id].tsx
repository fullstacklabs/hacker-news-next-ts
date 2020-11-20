import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import AddComment from "../../components/AddComment"
import Comments from "../../components/Comments"
import Story from "../../components/Story"
import { News as NewsType } from "../../common/types"
import { useAPI } from "../../common/util"

interface Props {
	id: number
	newsPage: NewsType
	error: boolean
}

const StyledNews = styled.div`
	padding: 10px;
`

const NewsPage: React.FC<Props> = ({ id, newsPage, error }) => {
	const [story, setStory] = useState(newsPage)
	const [isValid, setIsValid] = useState(true)
	const [clientError, setClientError] = useState<null | string>(null)
	const { callAPI } = useAPI()

	const onReply = useCallback(() => setIsValid(false), [])

	const onCommentHandler = useCallback(() => {
		setIsValid(false)
	}, [])

	useEffect(() => {
		if (!isValid) {
			callAPI(`/news/${id}`)
				.then((json) => {
					setStory(json)
					setIsValid(true)
				})
				.catch((error) => setClientError(error.toString()))
		}
	}, [isValid])

	if (error) return <StyledNews>{error}</StyledNews>

	if (clientError) return <StyledNews>{clientError}</StyledNews>

	if (!newsPage) return <StyledNews>Loading...</StyledNews>

	return (
		<React.Fragment>
			<Story news={story} />
			<AddComment id={id} onReply={onReply} />
			<Comments onComment={onCommentHandler} kids={story.kids} />
		</React.Fragment>
	)
}

type Params = {
	params: {
		id: string
	}
}

export async function getStaticProps({ params }: Params) {
	const res = await fetch(`http://localhost:3001/news/${params.id}`)
	const resData = await res.json()

	return {
		props: {
			id: parseInt(params.id, 10),
			newsPage: resData,
			error: false,
		},
	}
}

export async function getStaticPaths() {
	const res = await fetch("http://localhost:3001/news")
	const resData = await res.json()

	return {
		paths: resData.map((news: NewsType) => ({
			params: {
				id: news.id.toString(),
			},
		})),
		fallback: false,
	}
}

export default NewsPage
