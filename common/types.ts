import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

export interface CountDisplay {
	prev: number
	next: number
}

export interface InitialState {
	totalNews: number[]
	currNews: number[]
	error: string | null
	countDisplay: CountDisplay
	countKidsDisplay: CountDisplay
	hasMore: boolean
	news: News[]
	comments: Comment[]
	newsPage: News | null
	loading: boolean
	user: User | null
}

export interface MyAssociatedActions {
	getNewStories: () => Promise<void>
	getMoreNews: () => Promise<void>
	// getCommentsById: (id: number[]) => Promise<void>
	getNewsById: (id: number) => Promise<void>
	addNews: (newsData: NewsSubmit, user: User) => Promise<void>
	editNews: (newsData: NewsSubmit, originalNews: News) => Promise<boolean>
	toggleNewsLike: (newsId: number) => void
	login: (login: Login) => Promise<void>
	register: (user: UserSumbit) => Promise<boolean>
	editUser: (user: UserSumbit, id: number) => Promise<void>
	checkAuth: () => void
	logout: () => void
}

type Like = {
	userId: number
}

export interface News {
	by: string
	id: number
	kids: number[]
	title: string
	url: string
	type: string
	userId: number
	text?: string
	likes: Like[]
	creationDate?: string
}

export interface NewsSubmit
	extends Omit<
		News,
		| "kids"
		| "time"
		| "type"
		| "descendants"
		| "userId"
		| "creationDate"
		| "by"
		| "id"
		| "likes"
	> {}

export interface Comment {
	by: string
	deleted: boolean | null
	id: number
	kids?: number[]
	likes: Like[]
	parent: number
	text: string
	creationDate: string
	userId: number
}

export interface Login {
	email: string
	password: string
}

export interface User {
	id: number
	name: string
	title: string
	email: string
	password: string
}

export interface UserSumbit extends Omit<User, "id"> {}
