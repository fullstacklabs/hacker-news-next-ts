import React, { useState, useEffect, useContext, useCallback } from "react"
import Link from "next/link"
import styled from "styled-components"
import { UserContext } from "../../common/UserContext"
import { News } from "../../common/types"
import { mapTime, useAPI } from "../../common/util"
import UpVote from "../../components/UpVote"
import { StyledError } from "../UI"

interface Props {
	news: News
	rank?: number
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
	color: ${({ theme }) => theme.colors.secondary};
	a:visited {
		color: ${({ theme }) => theme.colors.secondary};
	}
`

const Domain = styled.div`
	font-size: 0.7rem;

	&,
	a {
		color: ${({ theme }) => theme.colors.secondary};
	}

	a:hover {
		text-decoration: underline;
	}
`

const Delete = styled.div`
	color: red;
	cursor: pointer;
	margin: 0 5px;
	font-size: 0.7rem;
`

const Details = styled.div`
	display: flex;
	align-items: baseline;
	margin: 5px 0 5px 19px;
	font-size: 0.7rem;
	color: ${({ theme }) => theme.colors.secondary};
	a:link,
	a:visited {
		color: ${({ theme }) => theme.colors.secondary};
	}
`

const Story: React.FC<Props> = ({ news: propsNews, rank }) => {
	const [news, setNews] = useState(propsNews)
	const { user } = useContext(UserContext)
	const { loading, error, callAPI } = useAPI()
	const { title, url, by, creationDate, likes, kids, id, userId } = news

	const likeToggleHandler = useCallback(() => {
		if (!user) return

		const likes = [...news.likes]

		const userLikeIndex = likes.findIndex((like) => like.userId === user.id)

		if (userLikeIndex === -1) likes.push({ userId: user.id })
		else likes.splice(userLikeIndex, 1)

		callAPI(`/news/${id}`, {
			method: "PATCH",
			body: JSON.stringify({ likes }),
		}).then((json) => setNews(json))
	}, [user, news])

	const deleteHandler = useCallback(() => {
		if (!user) return

		if (confirm("Are you sure you want to delete?"))
			callAPI(`/news/${id}`, { method: "DELETE" }).then(() =>
				location.replace("/")
			)
	}, [user])

	useEffect(() => {
		setNews(propsNews)
	}, [propsNews])

	let titleLink: React.ReactNode = title
	let hostname = ""

	if (url) {
		try {
			const parsedDomain = new URL(url)
			hostname = parsedDomain.hostname

			titleLink = <a href={url}>{title}</a>
		} catch (error) {
			console.error(error)
		}
	}

	if (error) return <StyledError>{error}</StyledError>

	if (loading) return <p>Loading...</p>

	return (
		<StyledNews>
			<Header>
				{rank && <Title>{rank}.</Title>}
				<UpVote onClick={likeToggleHandler} />
				<Title>{titleLink}</Title>
				{url && (
					<Domain>
						(<a href={url}>{hostname}</a>)
					</Domain>
				)}
				{user && user.id === userId && (
					<Delete onClick={deleteHandler}>delete</Delete>
				)}
			</Header>
			<Details>
				<Link href={`/news/${id}`}>
					<a>{likes.length} points</a>
				</Link>
				&nbsp;| by&nbsp;
				<Link href={`/user/${userId}`}>
					<a>{by}</a>
				</Link>
				&nbsp;| {creationDate && mapTime(creationDate)} |&nbsp;
				<Link href={`/news/${id}`}>
					<a>{kids.length} comments</a>
				</Link>
			</Details>
		</StyledNews>
	)
}

export default React.memo(
	Story,
	(prev, next) => JSON.stringify(prev.news) === JSON.stringify(next.news)
)
