import React from "react"
import { News } from "../../common/types"
import { StoryTitle, StorySubText, UpVote } from "../../styles/StoryStyles"
import { mapTime } from "../../common/util"
import Link from "next/link"

interface Props {
	news: News
	rank: number
}

const NewsUI: React.FC<Props> = ({ news, rank }) => {
	return (
		<div>
			<div style={{ display: "inline-block" }}>
				<StoryTitle>{`${rank + 1}.`}</StoryTitle>
				<StoryTitle>
					<UpVote src="/grayarrow.gif" alt="Upvote" />
				</StoryTitle>
				<StoryTitle>
					<Link href={news.url}>
						<a>{news.title}</a>
					</Link>
				</StoryTitle>
			</div>
			<div>
				<StorySubText>{`${news.score} Points |`}</StorySubText>
				<StorySubText>{`By: ${news.by}| `}</StorySubText>
				<StorySubText>{` ${mapTime(news.time)} | `}</StorySubText>
				<StorySubText>{` ${news.descendants} comments `}</StorySubText>
			</div>
		</div>
	)
}

export default NewsUI
