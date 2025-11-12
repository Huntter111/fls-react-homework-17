import { useState } from 'react'

import { roles } from '@/shared/config/roles'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'
import { CommentList } from '@/widgets/commentList/CommentList'
import { CommentForm } from '@/features/commentForm/ui/CommentForm'

export function PostCard({ post, onEdit, onDelete }) {
	const [showComments, setShowComments] = useState(false)
	const user = useSelector(selectAuthUser)
	return (
		<div style={{ border: '1px solid #ddd', marginBottom: 20, padding: 15 }}>
			<h3>{post.title}</h3>
			<p>{post.content}</p>
			<div>
				<small>Автор: {post.author?.name}</small>
			</div>
			{(user?.role === roles.admin || (user?.role === roles.manager && post.authorId === user.id)) && (
				<div style={{ marginTop: 10 }}>
					<button onClick={() => onEdit(post)}>Редагувати</button>
					<button onClick={() => onDelete(post.id)}>Видалити</button>
				</div>
			)}
			<button
				onClick={() => setShowComments((v) => !v)}
				style={{ marginTop: 10 }}
			>
				{showComments ? 'Сховати коментарі' : 'Показати коментарі'}
			</button>

			{showComments && (
				<>
					<CommentList postId={post.id} />
					{user && <CommentForm postId={post.id} />}
				</>
			)}
		</div>
	)
}
