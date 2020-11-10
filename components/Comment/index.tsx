import styled from "styled-components"
import UpVote from "../UpVote"
import { mapTime } from "../../common/util"
import { Comment as CommentType } from "../../common/types"
import { render } from "enzyme"
import { useState } from "react"

interface CommentTypeComponent
	extends Omit<CommentType, "deleted" | "id" | "parent" | "type"> {
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
	descendants,
}) => {
	const [isExpanded, setIsExpanded] = useState(true)
	const expandToggleClick = () => {
		console.log(isExpanded)
		setIsExpanded(!isExpanded)
	}

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
	console.log(isExpanded)

	if (!isExpanded)
		return (
			<StyledComment>
				<Header collapsed>{header}</Header>
			</StyledComment>
		)

	return (
		<StyledComment>
			<Header>
				<UpVote />
				{header}
			</Header>
			<Body dangerouslySetInnerHTML={{ __html: text }} />
		</StyledComment>
	)
}

export default Comment
