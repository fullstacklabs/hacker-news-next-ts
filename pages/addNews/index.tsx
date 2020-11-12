import { useRouter } from "next/router"
import Input from "../../components/UI/input"
import { StyledButton, StyledLoading } from "../../components/UI"
import { Container } from "../../components/UI"
import Head from "next/head"
import { useGlobal } from "../../store"
import { InitialState, News } from "../../common/types"
import Router from "next/router"
import { ChangeEvent, useState } from "react"

interface Props {}
const defaultState: Omit<
	News,
	"id" | "kids" | "score" | "time" | "type" | "descendants" | "userId"
> = {
	by: "",
	title: "",
	url: "",
}

const AddNews: React.FC<Props> = () => {
	let elementConfig = {
		type: "text",
		placeholder: "",
	}
	const [newsData, setNewsData] = useState<
		Omit<
			News,
			"id" | "kids" | "score" | "time" | "type" | "descendants" | "userId"
		>
	>(defaultState)
	const [globalState, actions] = useGlobal()
	const router = useRouter()

	if (!globalState.user || !globalState.user.id) {
		if (typeof window !== "undefined" && router) router.push("/")
		return null
	}

	const userId = globalState.user.id

	const saveHandler = async () => {
		await actions.addNews(newsData, userId)
		router.push("/")
	}
	const onTitleChangeHanlder = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		console.log(newsData)
		setNewsData({ ...newsData, ...{ title: e.target.value } })
	}
	const onUrlChangeHanlder = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setNewsData({ ...newsData, ...{ url: e.target.value } })
	}
	const onTextChangeHanlder = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setNewsData({ ...newsData, ...{ text: e.target.value } })
	}

	return (
		<Container>
			<Head>
				<title>Add news</title>
			</Head>
			<h1>New Story</h1>
			{globalState.loading ? (
				<StyledLoading />
			) : (
				<>
					{" "}
					<Input
						type="text"
						value={newsData.title}
						label="Title"
						onChangeHanlder={onTitleChangeHanlder}
						elementConfig={elementConfig}
					/>
					<Input
						type="text"
						value={newsData.url}
						label="URL"
						key="url"
						onChangeHanlder={onUrlChangeHanlder}
						elementConfig={elementConfig}
					/>
					<Input
						type="textarea"
						value={newsData.text}
						label="Summary"
						onChangeHanlder={onTextChangeHanlder}
						elementConfig={elementConfig}
					/>
					<div
						style={{
							justifyContent: "space-between",
							display: "flex",
							maxWidth: "300px",
							margin: "auto",
							padding: "10px 0",
						}}
					>
						<StyledButton
							color={"white"}
							textColor="black"
							onClick={() => Router.push("/")}
						>
							Cancel
						</StyledButton>
						<StyledButton onClick={saveHandler}>Save</StyledButton>
					</div>
				</>
			)}
		</Container>
	)
}

export default AddNews
