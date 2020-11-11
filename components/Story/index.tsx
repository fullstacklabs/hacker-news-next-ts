import React from "react"
import { News } from "../../common/types"
import { mapTime } from "../../common/util"
import Link from "next/link"
import styled from "styled-components"
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

const Story: React.FC<Props> = ({ news, rank }) => {
	const { title, url, by, time, score, descendants, id } = news
	const parsedDomain = new URL(url)

	return (
		<StyledNews>
			<Header>
				{rank && <Title> {rank}.</Title>}
				<UpVote />
				<Title>
					<Link href={url}>
						<a>{title}</a>
					</Link>
				</Title>
				<Domain>
					(<a href={url}>{parsedDomain.hostname}</a>)
				</Domain>
			</Header>
			<Details>
				<Link href={`/news/${id}`}>
					<a>{score} points</a>
				</Link>
				&nbsp;| by {by} | {mapTime(time)} |&nbsp;
				<Link href={`/news/${id}`}>
					<a>{descendants} comments</a>
				</Link>
			</Details>
		</StyledNews>
	)
}

export default React.memo(Story)
