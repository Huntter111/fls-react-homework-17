import React, { useState } from 'react'
import cl from './CreateUserModal.module.css'
import { useCreateUserMutation } from '@/entities/user/api/userApi'
const initialUserData = {
	email: '',
	password: '',
	name: '',
	role: 'user',
}
const CreateUserModal = ({ visible, setVisible }) => {
	const rootClasses = [cl.modal]
	if (visible) {
		rootClasses.push(cl.active)
	}
	const [createUser, { isLoading: isCreatingUser }] = useCreateUserMutation()
	const handleCreateUser = async (e) => {
		e.preventDefault()

		try {
			await createUser(userData).unwrap()
			setUserData(initialUserData)
			setVisible(false)
		} catch (e) {
			console.log('User Create Error', e.error)
		}
	}
	const [userData, setUserData] = useState(initialUserData)

	const handleChange = (e) => {
		setUserData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
	}
	return (
		<div
			className={rootClasses.join(' ')}
			onClick={() => setVisible(false)}>
			<div
				className={cl.modalContent}
				onClick={(e) => e.stopPropagation()}>
				<button
					onClick={() => setVisible(false)}
					className={cl.modalClose}>
					X
				</button>
				<form
					action=""
					onSubmit={handleCreateUser}>
					<div className={cl.modalBody}>
						<label>
							Input Email
							<input
								value={userData.email}
								type="email"
								name="email"
								required
								id=""
								onChange={handleChange}
							/>
						</label>
						<label>
							Input Name
							<input
								value={userData.name}
								type="text"
								name="name"
								required
								id=""
								onChange={handleChange}
							/>
						</label>
						<label>
							Input Password
							<input
								value={userData.password}
								type="password"
								name="password"
								required
								id=""
								onChange={handleChange}
							/>
						</label>
						<select
							value={userData.role}
							name="role"
							id=""
							onChange={handleChange}>
							<option value="user">user</option>
							<option value="admin">admin</option>
							<option value="manager">manager</option>
						</select>
					</div>
					<button
						type="submit"
						disabled={isCreatingUser}>
						{isCreatingUser ? 'Creating' : 'Create'}
					</button>
				</form>
			</div>
		</div>
	)
}

export default CreateUserModal
