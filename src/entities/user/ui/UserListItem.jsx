import { useDeleteUserMutation } from '@/entities/user/api/userApi'
import React, { useState } from 'react'

export function UserListItem({ user }) {
	console.log('🚀 ~ UserListItem ~ user:', user.id)
	const [isDeleting, setIsDeleting] = useState(false)
	const [deleteUser] = useDeleteUserMutation()

	const handleDelete = async () => {
		setIsDeleting(true)
		try {
			await deleteUser(user.id).unwrap
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div
			style={{
				borderBottom: '1px solid #ccc',
				padding: '8px 8px',
				display: 'flex',
				alignItems: 'center',
				gap: '12px',
			}}>
			<strong>{user.name}</strong> — {user.email} — Роль: {user.role}
			<button
				disabled={isDeleting}
				onClick={handleDelete}>
				{isDeleting ? 'Deleting' : 'Delete'}
			</button>
		</div>
	)
}
