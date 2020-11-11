import Comment from "../Comment"

interface Prop {
	kids: number[]
}

const Comments: React.FC<Prop> = ({ kids }) => {
	return (
		<div>
			{kids && kids.slice(0, 10).map((id) => <Comment id={id} key={id} />)}
		</div>
	)
}

export default Comments
