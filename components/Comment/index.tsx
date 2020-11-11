import React from "react"
import styled from "styled-components"
import UpVote from "../UpVote"
import { mapTime } from "../../common/util"
import { Comment as CommentType } from "../../common/types"
import { FunctionComponent, useEffect, useState } from "react"
import { baseUrl } from "../../common/constants"

interface CommentTypeComponent {
	comment?: CommentType
	id: number
}

const StyledComment = styled.div`
	padding: 10px;
`

const Header = styled.div`
	display: flex;
	align-items: center;
	font-size: 0.85rem;
	color: ${({ theme }) => theme.colors.secondary};
`

const Body = styled.div`
	margin: 5px 0 5px 14px;
	font-size: 0.8rem;
`

const ToggleButton = styled.span`
	cursor: pointer;
`

const Comment: FunctionComponent<CommentTypeComponent> = ({ id, comment }) => {
	const [isExpanded, setIsExpanded] = useState(true)
	const [_comment, setComment] = useState(comment)

	const expandToggleClick = () => {
		setIsExpanded(!isExpanded)
	}

	useEffect(() => {
		fetch(`${baseUrl}/item/${id}.json?print=pretty`)
			.then((res) => res.json())
			.then((data) => setComment({ ...comment, ...data }))
	}, [id])

	const toggleButton = (
		<ToggleButton onClick={expandToggleClick}>
			[{isExpanded ? "-" : _comment?.kids?.length || 0}]
		</ToggleButton>
	)

	const header = (
		<>
			{_comment?.by} {mapTime(_comment?.time || 0)}&nbsp;{toggleButton}
		</>
	)

	const nestedComments =
		_comment &&
		_comment.kids &&
		_comment.kids
			.slice(0, 3)
			.map((comment) => <Comment key={comment} id={comment} />)
	return (
		<StyledComment>
			<Header>
				<UpVote />
				{header}
			</Header>
			<div style={{ display: !isExpanded ? "none" : "block" }}>
				<Body dangerouslySetInnerHTML={{ __html: _comment?.text || "" }} />
				{nestedComments}
			</div>
		</StyledComment>
	)
}

export default React.memo(Comment)
