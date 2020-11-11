import React from "react"
import { News } from "../../common/types"
import { StoryTitle, StorySubText } from "../../styles/StoryStyles"
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
	color: #828282;
	a:visited {
		color: #828282;
	}
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
	a:link,
	a:visited {
		color: #828282;
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
					<a>{score} &nbsp;</a>
				</Link>{" "}
				points| by {by} &nbsp;|&nbsp; {mapTime(time)}&nbsp;|&nbsp;
				<Link href={`/news/${id}`}>
					<a>
						{""}
						{descendants}
					</a>
				</Link>
				&nbsp; comments
			</Details>
		</StyledNews>

		// <div>
		// 	<div style={{ display: "inline-block" }}>
		// 		<StoryTitle>{`${rank + 1}.`}</StoryTitle>
		// 		<StoryTitle>
		// 			<UpVote src="/grayarrow.gif" alt="Upvote" />
		// 		</StoryTitle>
		// 		<StoryTitle>
		// 			<Link href={news.url}>
		// 				<a>{news.title}</a>
		// 			</Link>
		// 		</StoryTitle>
		// 	</div>
		// 	<div>
		// 		<StorySubText>
		// 			<Link href={`/news/${news.id}`}>
		// 				<a>{news.score} </a>
		// 			</Link>
		// 			Points |
		// 		</StorySubText>
		// 		<StorySubText>{`By: ${news.by}| `}</StorySubText>
		// 		<StorySubText>{` ${mapTime(news.time)} | `}</StorySubText>
		// 		<StorySubText>
		// 			{" "}
		// 			<Link href={`/news/${news.id}`}>
		// 				<a>{news.descendants} </a>
		// 			</Link>
		// 			{` comments ${news.kids && news.kids.length}`}
		// 		</StorySubText>
		// 	</div>
		// </div>
	)
}

export default Story
