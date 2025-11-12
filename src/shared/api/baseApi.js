import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '@/features/auth/api/authSlice'

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL || 'https://fls-react-homework-17-backend.onrender.com/api',
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth?.accessToken
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	},
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)

	// Якщо 401 і це НЕ refresh endpoint — спробуємо оновити токен
	if (result?.error?.status === 401 && args.url !== '/auth/refresh') {
		console.warn('Access token expired, attempting refresh...')

		try {
			const refreshResult = await baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions)

			if (refreshResult.data) {
				// Оновлюємо токен у state
				api.dispatch(setCredentials(refreshResult.data))
				// Повторюємо оригінальний запит з новим токеном
				result = await baseQuery(args, api, extraOptions)
			} else {
				// Refresh не вдалось
				api.dispatch(logout())
				window.location.href = '/login'
			}
		} catch (err) {
			console.error('Refresh error:', err)
			api.dispatch(logout())
			window.location.href = '/login'
		}
	}

	return result
}

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User', 'Post', 'Comment'],
	endpoints: () => ({}),
})
