import React, { useEffect } from "react"
import styled from "styled-components"
import { useGlobal } from "../../store"
import { actions } from "../../actions"
import Comments from "../../components/Comments"
import Story from "../../components/Story"
import { News as NewsType } from "../../common/types"
import { useRouter } from "next/router"

interface Props {
	id: number
	newsPage: NewsType
	error: boolean
}

const StyledNews = styled.div`
	padding: 10px;
`

const News: React.FC<Props> = ({ id, newsPage, error }) => {
	if (error) return <StyledNews>{error}</StyledNews>

	if (!newsPage) return <StyledNews>Loading...</StyledNews>

	const { kids } = newsPage

	return (
		<React.Fragment>
			<Story news={newsPage} />
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
	console.log(params.id)

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

export default News
