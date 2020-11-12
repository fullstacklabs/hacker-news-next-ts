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
	userId: number | null
	userLoading: boolean
	userError: string | null
}

export interface MyAssociatedActions {
	getNewStories: () => Promise<void>
	getMoreNews: () => Promise<void>
	// getCommentsById: (id: number[]) => Promise<void>
	getNewsById: (id: number) => Promise<void>
	register: (user: User) => Promise<void>
}

export interface News {
	by: string
	id: number
	kids: number[]
	score: number
	time: number
	title: string
	url: string
	type: string
	descendants: number
}

export interface Comment {
	by: string
	deleted: boolean | null
	id: number
	kids?: number[]
	parent: number
	time: number
	text: string
	type: string
}

export interface User {
	id?: number
	name: string
	title: string
	email: string
	password?: string
	passwordConfirm?: string
}
