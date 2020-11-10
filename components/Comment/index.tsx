import styled from "styled-components"
import { mapTime } from "../../common/util"
import { Comment as CommentType } from "../../common/types"

interface CommentTypeComponent
	extends Omit<CommentType, "deleted" | "id" | "parent" | "type"> {
	expandToggleClick: () => void
	isExpanded: boolean
	descendants: number
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

const Comment: React.FC<CommentTypeComponent> = ({
	by,
	time,
	text,
	expandToggleClick,
	isExpanded,
	descendants,
}) => {
	const toggleButton = (
		<ToggleButton onClick={expandToggleClick}>
			[{isExpanded ? "-" : descendants}]
		</ToggleButton>
	)

	const header = (
		<>
			{by} {mapTime(time)}&nbsp;{toggleButton}
		</>
	)

	if (!isExpanded)
		return (
			<StyledComment>
				<Header collapsed>{header}</Header>
			</StyledComment>
		)

	return (
		<StyledComment>
			<Header>
				<UpVote src="/grayarrow.gif" alt="Upvote" />
				{header}
			</Header>
			<Body dangerouslySetInnerHTML={{ __html: text }} />
		</StyledComment>
	)
}

export default Comment
