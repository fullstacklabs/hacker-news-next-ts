import { NextPage } from "next"
import { actions } from "../actions"
import { News } from "../common/types"
import Story from "../components/Story"

interface Props {
	userAgent?: string
	stories: News[]
}

const Page: NextPage<Props> = ({ stories }) => {
	return (
		<div>
			{stories &&
				stories.map((item, index) => (
					<Story key={item.id} news={item} rank={index + 1} />
				))}
		</div>
	)
}

Page.getInitialProps = async () => {
	const res = await fetch("http://localhost:3001/news?type=story")
	const resData = await res.json()

	return { stories: resData }
}

export default Page
