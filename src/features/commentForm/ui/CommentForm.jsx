import { useCreateCommentMutation } from '@/entities/post/comments'
import { useState } from 'react'
// ! Форму переносимо у features
// import { useCreateCommentMutation } from '../api/commentApi'
export function CommentForm({ postId }) {
	const [content, setContent] = useState('')
	const [createComment, { isLoading }] = useCreateCommentMutation()
	const onSubmit = async (e) => {
		e.preventDefault()
		if (!content.trim()) return
		await createComment({ postId, text: content })
		setContent('')
	}
	return (
		<form
			onSubmit={onSubmit}
			style={{ marginTop: 10 }}
		>
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				rows={3}
				placeholder="Напишіть коментар..."
				required
				style={{ width: '100%', backgroundColor: 'grey', color: 'black' }}
			/>
			<button
				type="submit"
				disabled={isLoading}
			>
				Додати коментар
			</button>
		</form>
	)
}
