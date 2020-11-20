import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { User } from "../common/types"
import { baseUrl } from "./constants"

export const mapTime = (date: string) => {
	const currentDate = new Date()
	const oldDate = new Date(date)
	const seconds: number = Math.floor(
		(currentDate.getTime() - oldDate.getTime()) / 1000
	)

	let interval = Math.floor(seconds / 31536000)

	if (interval > 1) {
		return `${interval} years ago`
	}

	if (interval === 1) {
		return `${interval} year ago`
	}

	interval = Math.floor(seconds / 2592000)

	if (interval > 1) {
		return `${interval} months ago`
	}

	if (interval === 1) {
		return `${interval} month ago`
	}

	interval = Math.floor(seconds / 86400)

	if (interval > 1) {
		return `${interval} days ago`
	}

	if (interval === 1) {
		return `${interval} day ago`
	}

	interval = Math.floor(seconds / 3600)

	if (interval > 1) {
		return `${interval} hours ago`
	}

	if (interval === 1) {
		return `${interval} hour ago`
	}

	interval = Math.floor(seconds / 60)

	if (interval > 1) {
		return `${interval} minutes ago`
	}

	if (interval === 1) {
		return `${interval} minute ago`
	}

	return `${Math.floor(seconds)} seconds ago`
}

export const useRequireUser = (user: User | null) => {
	const router = useRouter()

	useEffect(() => {
		if (!user) router.push("/")
	}, [user])
}

export const useRequireNoUser = (user: User | null) => {
	const router = useRouter()

	useEffect(() => {
		if (user) router.push("/")
	}, [user])
}

type useAPIReturn = {
	loading: boolean
	error: string | null
	callAPI: (path: string, moreFetchOptions?: RequestInit) => Promise<any>
}

const defaultFetchOptions: RequestInit = {
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json",
	},
}

export const useAPI: (baseFetchOptions?: RequestInit) => useAPIReturn = (
	baseFetchOptions
) => {
	const [loading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	async function callAPI(path: string, moreFetchOptions?: RequestInit) {
		let fetchOptions = defaultFetchOptions

		if (baseFetchOptions)
			fetchOptions = {
				...fetchOptions,
				...baseFetchOptions,
			}

		if (moreFetchOptions)
			fetchOptions = {
				...fetchOptions,
				...moreFetchOptions,
			}

		if (loading) return

		try {
			setIsLoading(true)

			const res = await fetch(baseUrl + path, fetchOptions)
			setError(null)
			return await res.json()
		} catch (error) {
			setError(error.toString())
		} finally {
			setIsLoading(false)
		}
	}

	return { loading, error, callAPI }
}
