import React, { useState } from 'react'

import { useGetUsersQuery } from '../../entities/user/api/userApi'
import { UserListItem } from '../../entities/user/ui/UserListItem'
import CreateUserModal from '@/entities/user/ui/CreateUserModal'
export function UserList() {
	const [modal, setModal] = useState(false)
	const [page, setPage] = useState(1)
	const limit = 10
	const { data, isLoading, error } = useGetUsersQuery({ page, limit })
	if (isLoading) return <div>Завантаження...</div>
	if (error) return <div>Помилка: {error.toString()}</div>
	const users = data?.items || []
	const totalPages = data?.totalPages || 1

	return (
		<div>
			<CreateUserModal
				visible={modal}
				setVisible={setModal}
			/>
			<button
				onClick={() => setModal(true)}
				style={{ margin: '15px' }}
			>
				Create User
			</button>
			{users.map((user) => (
				<UserListItem
					key={user.id}
					user={user}
				/>
			))}
			<div style={{ marginTop: 10 }}>
				<button
					onClick={() => setPage((p) => Math.max(p - 1, 1))}
					disabled={page === 1}
				>
					Назад
				</button>
				<span style={{ margin: '0 10px' }}>
					Сторінка {page} з {totalPages}
				</span>
				<button
					onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
					disabled={page === totalPages}
				>
					Вперед
				</button>
			</div>
		</div>
	)
}
