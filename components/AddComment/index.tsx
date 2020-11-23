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

type FormErrors = {
	title?: string
	text?: string
}

interface Props {
	id: number
	isComment?: boolean
	onReply: () => void
}

interface isCommentProps {
	isComment?: boolean
}

const CommentForm = styled.form<isCommentProps>`
	display: ${(props) => (props.isComment ? "flex" : "block")};
	padding: 5px ${(props) => (props.isComment ? "0" : "25px")};
`

const CommentTextArea = styled(StyledTextarea)`
	margin: 0;
`

const SubmitButton = styled(StyledButton)<isCommentProps>`
	margin-top: ${(props) => (props.isComment ? "0" : "5px")};
	margin-left: ${(props) => (props.isComment ? "5px" : "0")};
`

const AddCommment: React.FC<Props> = ({ id, isComment, onReply }) => {
	const { loading, error, callAPI } = useAPI()
	const { user } = useContext(UserContext)

	if (!user) return null

	return (
		<Formik
			initialValues={{
				text: "",
			}}
			validate={(values) => {
				const errors: FormErrors = {}

				if (!values.text) errors.text = "Required"

				return errors
			}}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				const commentValues = {
					...values,
					likes: [],
					kids: [],
					by: user.name,
					userId: user.id,
					creationDate: new Date().toISOString(),
				}

				const commentJSON = await callAPI("/comments", {
					method: "POST",
					body: JSON.stringify(commentValues),
				})

				const parentURL = isComment ? `/comments/${id}` : `/news/${id}`

				if (commentJSON) {
					const parentJSON = await callAPI(parentURL, { method: "GET" })

					await callAPI(parentURL, {
						method: "PATCH",
						body: JSON.stringify({
							kids: [...parentJSON.kids, commentJSON.id],
						}),
					})

					resetForm()
					onReply()
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
				<CommentForm isComment={isComment} onSubmit={handleSubmit}>
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

					<SubmitButton
						isComment={isComment}
						type="submit"
						disabled={isSubmitting}
					>
						Submit
					</SubmitButton>
				</CommentForm>
			)}
		</Formik>
	)
}

export default AddCommment
