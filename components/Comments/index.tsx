import Comment from "../Comment"

interface Props {
	kids: number[]
}

const Comments: React.FC<Props> = ({ kids }) => {
	return (
		<div>
			{kids && kids.slice(0, 10).map((id) => <Comment id={id} key={id} />)}
		</div>
	)
}

export default Comments
