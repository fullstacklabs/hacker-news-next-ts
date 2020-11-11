import styled from "styled-components"
import { mapTime } from "../../common/util"
import { Comment as CommentType } from "../../common/types"
import { render } from "enzyme"
import { FunctionComponent, useEffect, useState } from "react"
import { baseUrl } from "../../common/constants"

interface CommentTypeComponent {
	comment?: CommentType
	id: number
}

const StyledComment = styled.div`
	padding: 10px;
`

const Header = styled.div<{ collapsed?: boolean }>`
	display: flex;
	align-items: center;
	font-size: 0.85rem;
	color: #828282;
	margin-left: ${(props) => props.collapsed && "14px"};
`

const UpVote = styled.img`
	display: block;
	width: 10px;
	height: 10px;
	border: 0px;
	margin: 3px 2px 6px;
	cursor: pointer;
`

const Body = styled.div`
	margin: 5px 0 5px 14px;
	font-size: 0.8rem;
`

const ToggleButton = styled.span`
	cursor: pointer;
`

const CommentUI: FunctionComponent<CommentTypeComponent> = ({
	id,
	comment,
}) => {
	const [isExpanded, setIsExpanded] = useState(true)
	const [_comment, setComment] = useState(comment)

	const expandToggleClick = () => {
		console.log(isExpanded)
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

	if (!isExpanded)
		return (
			<StyledComment>
				<Header collapsed>{header}</Header>
			</StyledComment>
		)

	const nestedComments =
		_comment &&
		_comment.kids &&
		_comment.kids
			.slice(0, 3)
			.map((comment) => <CommentUI key={comment} id={comment} />)
	return (
		<StyledComment>
			<Header>
				<UpVote src="/grayarrow.gif" alt="Upvote" />
				{header}
			</Header>
			<Body dangerouslySetInnerHTML={{ __html: _comment?.text || "" }} />
			<div style={{ display: !isExpanded ? "none" : "block" }}>
				{nestedComments}
			</div>
		</StyledComment>
	)
}

export default CommentUI
