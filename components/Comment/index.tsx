import React, { useEffect, useState, useContext, useCallback } from "react"
import Link from "next/link"
import styled from "styled-components"
import { UserContext } from "../../common/UserContext"
import UpVote from "../UpVote"
import AddComment from "../AddComment"
import EditComment from "../EditComment"
import { mapTime, useAPI } from "../../common/util"
import { Comment as CommentType } from "../../common/types"
import { StyledError } from "../UI"

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
	onCommentChange: () => void
}

const Comment: React.FC<Props> = ({ id, onCommentChange }) => {
	const [isExpanded, setIsExpanded] = useState(true)
	const [isReplying, setIsReplying] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const { user } = useContext(UserContext)
	const [comment, setComment] = useState<CommentType>()
	const [isValid, setIsValid] = useState(true)
	const { loading, error, callAPI } = useAPI()

	const onChange = useCallback(() => {
		setIsValid(false)
		setIsReplying(false)
		setIsEditing(false)
		onCommentChange()
	}, [])

	const expandToggleClick = useCallback(() => {
		setIsExpanded((prev) => !prev)
	}, [])

	const replyToggleClick = useCallback(() => {
		setIsReplying((prev) => !prev)
	}, [])

	const editToggleClick = useCallback(() => {
		setIsEditing((prev) => !prev)
	}, [])

	const deleteClick = useCallback(() => {
		if (confirm("Are you sure you want to delete?")) {
			callAPI(`/comments/${id}`, {
				method: "PATCH",
				body: JSON.stringify({
					text: "<em>This comment has been removed</em>",
					userId: null,
				}),
			}).then(() => {
				onCommentChange()
				setIsValid(false)
			})
		}
	}, [])

	useEffect(() => {
		callAPI(`/comments/${id}`).then((json) => setComment(json))
	}, [id])

	useEffect(() => {
		if (!isValid) {
			callAPI(`/comments/${id}`).then((json) => {
				setComment(json)
				setIsValid(true)
			})
		}
	}, [isValid])

	if (error) return <StyledError>{error}</StyledError>

	if (!comment || loading) return <p>Loading...</p>

	const header = (
		<>
			<Link href={`/user/${comment.userId}`}>
				<a>{comment.by}</a>
			</Link>
			&nbsp;
			{mapTime(comment.creationDate)}
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
			.map((kidID) => (
				<Comment key={kidID} id={kidID} onCommentChange={onCommentChange} />
			))

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
							{!isEditing && !isReplying && comment.userId === user.id && (
								<StyledUserAction onClick={deleteClick}>
									delete
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
