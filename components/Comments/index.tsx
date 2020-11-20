import Comment from "../Comment"

interface Props {
	kids: number[]
	onComment: () => void
}

const Comments: React.FC<Props> = ({ kids, onComment }) => {
	return (
		<div>
			{kids &&
				kids
					.slice(0, 10)
					.map((id) => <Comment id={id} onComment={onComment} key={id} />)}
		</div>
	)
}

export default Comments
