import { useLogout } from '@/features/auth'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth/api/authSlice'

import { frontRoutes } from '@/shared/config/routes/frontRoutes'
export function UserInfo() {
	const user = useSelector(selectAuthUser)
	const navigate = useNavigate()
	const { logoutUser } = useLogout()
	if (!user) {
		return (
			<Link
				to={frontRoutes.pages.LoginPage.navigationPath}
				style={{ marginLeft: 20 }}
			>
				Увійти
			</Link>
		)
	}
	const onLogout = () => {
		logoutUser()
		navigate(frontRoutes.pages.LoginPage.navigationPath)
	}
	return (
		<div style={{ marginLeft: 20, color: 'gray' }}>
			<span>
				{user.name} ({user.role})
			</span>
			<button
				onClick={onLogout}
				style={{ marginLeft: 10 }}
			>
				Вийти
			</button>
		</div>
	)
}
