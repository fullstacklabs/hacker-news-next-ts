import React from "react"
import styled from "styled-components"
import { News } from "../../common/types"
import {
	Card,
	CardBody,
	CardButton,
	CardContent,
	CardTitle,
	CarItem,
	StoryMeta,
	StoryMetaElement,
} from "../../styles/StoryStyles"
import { mapTime } from "../../common/util"

interface Props {
	news: News
}

const NewsUI: React.FC<Props> = ({ news }) => {
	return (
		<CarItem>
			<Card>
				<CardContent>
					<CardTitle>{news.title}</CardTitle>
					<CardBody>
						<StoryMeta>
							<span>
								<StoryMetaElement color="#000">By:</StoryMetaElement> {news.by}
							</span>
							<span>
								<StoryMetaElement color="#000">Posted:</StoryMetaElement> {` `}
								{mapTime(news.time)}
							</span>
							<span>
								<StoryMetaElement color="#000">Score:</StoryMetaElement> {` `}
								{news.score}
							</span>
						</StoryMeta>
						<CardButton>Read More</CardButton>
					</CardBody>
				</CardContent>
			</Card>
		</CarItem>
	)
}

export default NewsUI
