import { useGetCommentsByPostQuery } from '@/entities/post/comments'
import { CommentItem } from '@/entities/post/comments/ui/CommentItem'
// ! List переносимо у widgets

export function CommentList({ postId }) {
	const { data, isLoading, error } = useGetCommentsByPostQuery({
		postId,
	})
	if (isLoading) return <div>Завантаження коментарів...</div>
	if (error) return <div>Помилка: {error.toString()}</div>
	const comments = data || []
	return (
		<div style={{ marginTop: 10 }}>
			<h4>Коментарі</h4>
			{comments.map((c) => (
				<CommentItem
					key={c.id}
					comment={c}
				/>
			))}
		</div>
	)
}
