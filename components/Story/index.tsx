import React, { useState, useContext, useCallback } from "react"
import Link from "next/link"
import styled from "styled-components"
import { UserContext } from "../../common/UserContext"
import { News } from "../../common/types"
import { mapTime, useAPI } from "../../common/util"
import UpVote from "../../components/UpVote"

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
	const { callAPI } = useAPI()
	const { title, url, by, creationDate, score, descendants, id } = news

	const likeToggleHandler = useCallback(async () => {
		if (!user) return

		const likes = [...news.likes]

		const userLikeIndex = likes.findIndex((like) => like.userId === user.id)

		if (userLikeIndex === -1) likes.push({ userId: user.id })
		else likes.splice(userLikeIndex, 1)

		const json = await callAPI(`/news/${id}`, {
			method: "patch",
			body: JSON.stringify({ likes }),
		})

		console.log(json)
	}, [news])

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
			</Header>
			<Details>
				<Link href={`/news/${id}`}>
					<a>{score} points</a>
				</Link>
				&nbsp;| by {by} | {creationDate && mapTime(creationDate)} |&nbsp;
				<Link href={`/news/${id}`}>
					<a>{descendants} comments</a>
				</Link>
			</Details>
		</StyledNews>
	)
}

export default React.memo(Story)
