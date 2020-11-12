import React from "react"
import globalHook, { Store } from "use-global-hook"
import { actions } from "../actions"
import { displayNumber } from "../common/constants"
import { InitialState, MyAssociatedActions } from "../common/types"

const initialState: InitialState = {
	totalNews: [],
	currNews: [],
	error: "",
	countDisplay: { prev: 0, next: displayNumber },
	countKidsDisplay: { prev: 0, next: displayNumber },
	hasMore: true,
	news: [],
	comments: [],
	newsPage: null,
	userId: null,
	userLoading: false,
	userError: null,
}

export const useGlobal = globalHook<InitialState, MyAssociatedActions>(
	React,
	initialState,
	actions
)
