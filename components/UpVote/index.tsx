import styled from "styled-components"

const StyledUpVote = styled.img`
	display: block;
	width: 10px;
	height: 10px;
	border: 0px;
	margin: 3px 2px 6px;
	cursor: pointer;
`

const UpVote: React.FC = () => (
	<StyledUpVote src="/grayarrow.gif" alt="Upvote" />
)

export default UpVote
