import React, { useEffect, useState, useContext, useCallback } from "react"
import styled from "styled-components"
import { UserContext } from "../../common/UserContext"
import UpVote from "../UpVote"
import AddComment from "../AddComment"
import EditComment from "../EditComment"
import { mapTime } from "../../common/util"
import { Comment as CommentType } from "../../common/types"
import { StyledError } from "../UI"

interface CommentTypeComponent {
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

const Inner = styled.div`
	margin: 5px 0 5px 14px;
	font-size: 0.8rem;
`

const ToggleButton = styled.span`
	cursor: pointer;
`

const StyledUserActions = styled.div`
	margin-top: 5px;
	text-decoration: underline;
	font-size: 0.8em;
`

const StyledUserAction = styled.div`
	display: inline-block;
	cursor: pointer;

	&:not(:first-child) {
		margin-left: 5px;
	}
`

interface Props {
	id: number
	onComment: () => void
}

const Comment: React.FC<Props> = ({ id, onComment }) => {
	const [isExpanded, setIsExpanded] = useState(true)
	const [isReplying, setIsReplying] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const { user } = useContext(UserContext)
	const [comment, setComment] = useState<CommentType>()
	const [error, setError] = useState<string | null>(null)
	const [isValid, setIsValid] = useState(true)

	const expandToggleClick = useCallback(() => {
		setIsExpanded((prev) => !prev)
	}, [])

	const replyToggleClick = useCallback(() => {
		setIsReplying((prev) => !prev)
	}, [])

	const editToggleClick = useCallback(() => {
		setIsEditing((prev) => !prev)
	}, [])

	const onChange = useCallback(() => {
		setIsValid(false)
		setIsReplying(false)
		setIsEditing(false)
		onComment()
	}, [])

	useEffect(() => {
		fetch(`http://localhost:3001/comments/${id}`)
			.then((res) => res.json())
			.then((data) => setComment(data))
			.catch((error) => setError(error.toString()))
	}, [id])

	useEffect(() => {
		if (!isValid) {
			fetch(`http://localhost:3001/comments/${id}`)
				.then((res) => res.json())
				.then((json) => {
					setComment(json)
					setIsValid(true)
				})
				.catch((error) => setError(error.toString()))
		}
	}, [isValid])

	if (error) return <StyledError>{error}</StyledError>

	if (!comment) return <p>Loading...</p>

	const header = (
		<>
			{comment.by} {mapTime(comment.creationDate)}
			&nbsp;
			{comment && (
				<ToggleButton onClick={expandToggleClick}>
					{isExpanded ? "-" : (comment.kids && comment.kids.length) || 0}
				</ToggleButton>
			)}
		</>
	)

	const nestedComments =
		comment.kids &&
		comment.kids
			.slice(0, 3)
			.map((kidID) => <Comment key={kidID} id={kidID} onComment={onComment} />)

	return (
		<StyledComment>
			<Header>
				<UpVote />
				{header}
			</Header>
			<div style={{ display: !isExpanded ? "none" : "block" }}>
				<Inner>
					{!isEditing && (
						<div dangerouslySetInnerHTML={{ __html: comment.text }} />
					)}
					{user && (
						<StyledUserActions>
							{!isEditing && (
								<StyledUserAction onClick={replyToggleClick}>
									{isReplying ? "close" : "reply"}
								</StyledUserAction>
							)}
							{!isReplying && comment.userId === user.id && (
								<StyledUserAction onClick={editToggleClick}>
									{isEditing ? "cancel" : "edit"}
								</StyledUserAction>
							)}
						</StyledUserActions>
					)}
					{isReplying && <AddComment id={id} onReply={onChange} isComment />}
					{isEditing && <EditComment comment={comment} onEdit={onChange} />}
				</Inner>
				{nestedComments}
			</div>
		</StyledComment>
	)
}

export default React.memo(Comment)
