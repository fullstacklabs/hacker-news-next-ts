import styled from "styled-components"
import Story from "../../components/Story"
import { News, User } from "../../common/types"

interface Props {
	id: number
	serverUser: User
	serverNews: News[]
	error: null | string
}

const StyledUser = styled.div`
	padding: 15px;
`

const StyledStories = styled.div`
	margin-top: 45px;

	> h2 {
		text-align: center;
	}
`

const NewsPage: React.FC<Props> = ({ id, serverUser, serverNews, error }) => {
	if (error) return <StyledUser>{error}</StyledUser>

	const { name } = serverUser

	return (
		<StyledUser>
			<StyledStories>
				<h2>{name}'s News Posts</h2>
				{serverNews &&
					serverNews.map((item) => <Story key={item.id} news={item} />)}
			</StyledStories>
		</StyledUser>
	)
}

type Params = {
	params: {
		id: string
	}
}

export async function getStaticProps({ params }: Params) {
	let error = null
	let serverUser
	let serverNews

	try {
		const userRes = await fetch(`http://localhost:3001/user/${params.id}`)
		serverUser = await userRes.json()

		const newsRes = await fetch(
			`http://localhost:3001/news?userId=${params.id}`
		)
		serverNews = await newsRes.json()
	} catch (e) {
		error = e.toString()
	}

	return {
		props: {
			id: parseInt(params.id, 10),
			serverUser,
			serverNews,
			error,
		},
	}
}

export async function getStaticPaths() {
	const res = await fetch("http://localhost:3001/news")
	const resData = await res.json()

	return {
		paths: resData.map((news: News) => ({
			params: {
				id: news.id.toString(),
			},
		})),
		fallback: false,
	}
}

export default NewsPage
