import { useEffect, useState } from "react"
import { InitialState } from "../../common/types"
import Comment from "../../components/Comment"
import { useGlobal } from "../../store"

const kids: number[] = [
	25051147,
	25049908,
	25050763,
	25049432,
	25049846,
	25049838,
	25049638,
	25050891,
	25049927,
	25051526,
	25050363,
	25049789,
	25049347,
	25050096,
	25050136,
	25049514,
	25049986,
	25050089,
	25050324,
	25049633,
	25049581,
	25049318,
	25050400,
	25049925,
	25051567,
	25050480,
	25049478,
	25051639,
	25050395,
	25049537,
	25049681,
	25050220,
	25051031,
	25050815,
	25049648,
	25049554,
	25051628,
	25049732,
	25050564,
	25050182,
	25049611,
	25050662,
	25050890,
	25049518,
	25049755,
	25051228,
	25051815,
	25050355,
	25049639,
	25051180,
	25050177,
	25051018,
	25049448,
	25050597,
	25050517,
	25049311,
	25049678,
	25050448,
	25049378,
	25050992,
	25049592,
	25049736,
	25050352,
	25049389,
	25050125,
	25049561,
	25049291,
	25049258,
	25049665,
	25049362,
	25050015,
	25050402,
	25050550,
	25049276,
	25049744,
	25050020,
	25051451,
	25051729,
	25050715,
	25049809,
	25050546,
	25049684,
	25051226,
	25049662,
	25049551,
	25050563,
	25050239,
	25049234,
	25050238,
	25049637,
	25051212,
	25049429,
	25050718,
	25050700,
	25050610,
	25050568,
	25050281,
	25049524,
	25049303,
	25051675,
	25050876,
	25051839,
	25049560,
	25049451,
	25049613,
]

interface Props extends InitialState {}

const CommentPage = () => {
	const [state, actions] = useGlobal()
	useEffect(() => {
		actions.getCommentsById(kids)
	}, [])

	return (
		<div>
			{state.comments &&
				state.comments.map((kid) => (
					<Comment
						key={kid.id}
						by={kid.by}
						time={kid.time}
						text={kid.text}
						descendants={kid.kids ? kid.kids.length : 0}
					/>
				))}
		</div>
	)
}

export default CommentPage
