import { Store } from "use-global-hook"
import {
	Comment,
	InitialState,
	MyAssociatedActions,
	News,
} from "../common/types"
import { baseUrl, displayNumber, newStoriesUrl } from "../common/constants"
import { login, register, checkAuth, logout } from "./auth"

const getDataDetail = async (ids: number[]): Promise<News[]> => {
	const addingNews: News[] = await Promise.all(
		ids.slice(0, displayNumber).map(async (newsId) => {
			const res = await fetch(`${baseUrl}/item/${newsId}.json?print=pretty`)
			const resJson = await res.json()
			return resJson
		})
	)
	return addingNews
}

/* const getcommentsData = async (ids: number[]): Promise<Comment[]> => {
	const comments: Comment[] = await Promise.all(
		ids.slice(0, displayNumber).map(async (newsId) => {
			const res = await fetch(`${baseUrl}/item/${newsId}.json?print=pretty`)
			const resJson = await res.json()
			return resJson
		})
	)
	return comments
} */

const fetchNewStories = async () => {
	const result = await fetch(newStoriesUrl)
	const jsonData = (await result.json()) as number[]
	return jsonData
}

const getNewStories = async (
	store: Store<InitialState, MyAssociatedActions>
) => {
	try {
		const jsonData = await fetchNewStories()
		const getNewsDetail: News[] = await getDataDetail(
			jsonData.slice(0, displayNumber)
		)

		store.setState({
			...store.state,
			currNews: jsonData.slice(0, displayNumber),
			totalNews: jsonData,
			news: [...store.state.news, ...getNewsDetail],
		})
	} catch (e) {
		store.setState({ ...store.state, error: e.message as string })
	}
}
/**
 * Internal Process to display news in chunck `${displayNumber}`
 *
 */
const getMoreNews = async (store: Store<InitialState, MyAssociatedActions>) => {
	const { countDisplay, hasMore, currNews, totalNews } = store.state
	if (currNews.length === totalNews.length) {
		store.setState({ ...store.state, hasMore: false })
		return
	}

	const getNewsDetail: News[] = await getDataDetail(
		totalNews.slice(
			countDisplay.prev + displayNumber,
			countDisplay.next + displayNumber
		)
	)
	const newsList = currNews.concat(
		totalNews.slice(
			countDisplay.prev + displayNumber,
			countDisplay.next + displayNumber
		)
	)
	store.setState({
		...store.state,
		currNews: newsList,
		countDisplay: {
			prev: store.state.countDisplay.prev + displayNumber,
			next: store.state.countDisplay.next + displayNumber,
		},
		news: [...store.state.news, ...getNewsDetail],
	})
}

/* const getCommentsById = async (
	store: Store<InitialState, MyAssociatedActions>,
	ids: number[]
) => {
	try {
		const comments: Comment[] = await getcommentsData(
			ids.slice(
				store.state.countKidsDisplay.prev,
				store.state.countKidsDisplay.next
			)
		)
		//console.log(comments)
		store.setState({
			...store.state,
			comments: [
				...store.state.comments,
				...comments
			],
		})
	} catch (e) {
		store.setState({ ...store.state, error: e.message as string })
	}
} */

const getNewsById = async (
	store: Store<InitialState, MyAssociatedActions>,
	id: number
) => {
	try {
		const newsItem: News[] = await getDataDetail([id])
		store.setState({
			...store.state,
			newsPage: newsItem[0],
		})
	} catch (e) {
		store.setState({ ...store.state, error: e.message as string })
	}
}

const addNews = async (
	store: Store<InitialState, MyAssociatedActions>,
	newsData: Omit<
		News,
		"id" | "kids" | "score" | "time" | "type" | "descendants"
	>
) => {
	try {
		store.setState({ ...store.state, loading: true })
		const { by, title, url, text, likes, creationDate } = newsData
		const body = {
			kids: [],
			creationDate: new Date().toISOString(),
			text: text,
			url: url,
			title: title,
			by: "testing",
		}
		console.log(body)
		await fetch("http://localhost:3001/news", {
			method: "post",
			body: JSON.stringify(body),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((json) => console.log(json))

		store.setState({ ...store.state, loading: false })
	} catch (e) {
		store.setState({
			...store.state,
			error: e.message as string,
			loading: false,
		})
	}
}

export const actions = {
	fetchNewStories,
	getNewStories,
	getMoreNews,
	getNewsById,
	addNews,
	login,
	register,
	checkAuth,
	logout,
}
