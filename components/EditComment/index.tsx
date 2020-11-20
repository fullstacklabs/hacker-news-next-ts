import React, { useContext } from "react"
import styled from "styled-components"
import { Formik } from "formik"
import { UserContext } from "../../common/UserContext"
import {
	StyledTextarea,
	StyledButton,
	StyledError,
	StyledLoading,
} from "../../components/UI"
import { useAPI } from "../../common/util"
import { Comment } from "../../common/types"

type FormErrors = {
	title?: string
	text?: string
}

interface Props {
	comment: Comment
	onEdit: () => void
}

const CommentForm = styled.form`
	display: flex;
	padding: 5px 0;
`

const CommentTextArea = styled(StyledTextarea)`
	margin: 0;
`

const SubmitButton = styled(StyledButton)`
	margin-top: 0;
	margin-left: 5px;
`

const EditCommment: React.FC<Props> = ({ comment, onEdit }) => {
	const { loading, error, callAPI } = useAPI()
	const { user } = useContext(UserContext)

	if (!user) return null

	return (
		<Formik
			initialValues={{
				text: comment.text,
			}}
			validate={(values) => {
				const errors: FormErrors = {}

				if (!values.text) errors.text = "Required"

				return errors
			}}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				const commentValues = {
					text: values.text,
				}

				const commentJSON = await callAPI(`/comments/${comment.id}`, {
					method: "PATCH",
					body: JSON.stringify(commentValues),
				})

				if (commentJSON) {
					resetForm()
					onEdit()
				}

				setSubmitting(false)
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
			}) => (
				<CommentForm onSubmit={handleSubmit}>
					{loading && <StyledLoading />}

					<CommentTextArea
						name="text"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.text}
						placeholder="Add Comment"
					/>

					{errors.text && touched.text && (
						<StyledError>{errors.text}</StyledError>
					)}

					{error && <StyledError>{error}</StyledError>}

					<SubmitButton type="submit" disabled={isSubmitting}>
						Submit
					</SubmitButton>
				</CommentForm>
			)}
		</Formik>
	)
}

export default EditCommment
