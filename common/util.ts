
export const mapTime = (timestamp: Date) => {
	if (!timestamp) {
		return false
	}
	const currentDate = new Date()
	const oldDate = new Date(date)
	const seconds: number = Math.floor(
		(currentDate.getTime() - timestamp.getTime()) / 1000
	)
	console.log(oldDate, date)
	let interval = Math.floor(seconds / 31536000)

	if (interval > 1) {
		return `${interval} years ago`
	}
	interval = Math.floor(seconds / 2592000)

	if (interval > 1) {
		return `${interval} months ago`
	}
	interval = Math.floor(seconds / 86400)

	if (interval > 1) {
		return `${interval} days ago`
	}
	interval = Math.floor(seconds / 3600)

	if (interval > 1) {
		return `${interval} hours ago`
	}
	interval = Math.floor(seconds / 60)

	if (interval > 1) {
		return `${interval} minutes ago`
	}

	return `${Math.floor(seconds)} seconds ago`
}
