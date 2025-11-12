export const authCheckLoader =
	({ refreshMutex }) =>
	async (route) => {
		console.log(route)
		console.log(refreshMutex)
		return true
	}
