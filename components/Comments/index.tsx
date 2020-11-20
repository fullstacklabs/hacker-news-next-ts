import Comment from "../Comment"

interface Props {
	kids: number[]
	onCommentChange: () => void
}

const Comments: React.FC<Props> = ({ kids, onCommentChange }) => {
	return (
		<div>
			{kids &&
				kids
					.slice(0, 10)
					.map((id) => (
						<Comment id={id} onCommentChange={onCommentChange} key={id} />
					))}
		</div>
	)
}

export default Comments
