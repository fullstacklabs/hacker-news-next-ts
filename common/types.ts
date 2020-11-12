import { Store } from "use-global-hook"

export interface CountDisplay {
	prev: number
	next: number
}

export interface InitialState {
	totalNews: number[]
	currNews: number[]
	error: string
	countDisplay: CountDisplay
	countKidsDisplay: CountDisplay
	hasMore: boolean
	news: News[]
	comments: Comment[]
	newsPage: News | null
	loading: boolean
	user: User | null
	userLoading: boolean
	userError: string | null
}

export interface MyAssociatedActions {
	getNewStories: () => Promise<void>
	getMoreNews: () => Promise<void>
	// getCommentsById: (id: number[]) => Promise<void>
	getNewsById: (id: number) => Promise<void>
	addNews: (
		newsData: Omit<
			News,
			"id" | "kids" | "score" | "time" | "type" | "descendants" | "userId"
		>,
		userId: number
	) => Promise<void>
	login: (login: Login) => Promise<void>
	register: (user: User) => Promise<void>
	editUser: (user: User, id: number) => Promise<void>
	checkAuth: () => void
	logout: () => void
}

export interface News {
	by: string
	id: number
	kids: number[]
	score: number
	title: string
	url: string
	type: string
	descendants: number
	userId: number
	text?: string
	likes?: []
	creationDate?: string
}

export interface Comment {
	by: string
	deleted: boolean | null
	id: number
	kids?: number[]
	parent: number
	text: string
	type: string
	creationDate: string
}

export interface ElementType {
	type?: string
	placeholder?: string
}
export interface Login {
	email: string
	password: string
}

export interface User {
	id?: number
	name: string
	title: string
	email: string
	password?: string
	passwordConfirm?: string
}
