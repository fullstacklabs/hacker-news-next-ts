import { useContext } from "react"
import { useRouter } from "next/router"
import { Formik } from "formik"
import styled from "styled-components"
import { UserContext } from "../../../common/UserContext"
import { StyledInput, StyledButton, StyledError } from "../../../components/UI"
import Spinner from "../../../components/UI/Spinner"
import { News } from "../../../common/types"
import { useAPI } from "../../../common/util"

type Props = {
	id: number
	news: News
	error: string | boolean
}

type FormErrors = {
	title?: string
	url?: string
	text?: string
}

const StyledForm = styled.form`
	padding: 30px;
`

const EditNewsPage: React.FC<Props> = ({ id, news, error }) => {
	const router = useRouter()
	const { user } = useContext(UserContext)
	const { loading, error: apiError, callAPI } = useAPI({
		method: "PATCH",
	})

	if (!user) return <StyledError>You are not logged in</StyledError>

	if (news.userId !== user.id)
		return <StyledError>You are not authorized to access this page</StyledError>

	return (
		<Formik
			initialValues={{
				title: news.title,
				url: news.url,
				text: news.text,
			}}
			validate={(values) => {
				const errors: FormErrors = {}

				if (!values.title) errors.title = "Required"

				if (!values.url) errors.url = "Required"

				if (!values.text) errors.text = "Required"

				return errors
			}}
			onSubmit={async (values, { setSubmitting }) => {
				const editedNews = {
					...values,
				}

				const json = await callAPI(`/news/${news.id}`, {
					body: JSON.stringify(editedNews),
				})

				if (json) router.push(`/news/${id}`)

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
				<StyledForm onSubmit={handleSubmit}>
					{isSubmitting && <Spinner />}

					<StyledInput
						type="text"
						name="title"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.title}
						placeholder="Title"
					/>

					<StyledError>
						{errors.title && touched.title && errors.title}
					</StyledError>

					<StyledInput
						type="text"
						name="url"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.url}
						placeholder="URL"
					/>

					<StyledError>{errors.url && touched.url && errors.url}</StyledError>

					<StyledInput
						type="text"
						name="text"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.text}
						placeholder="Summary"
					/>

					<StyledError>
						{errors.text && touched.text && errors.text}
					</StyledError>

					{error && <StyledError>{error}</StyledError>}

					{apiError && <StyledError>{apiError}</StyledError>}

					<StyledButton type="submit" disabled={isSubmitting}>
						Edit News
					</StyledButton>
				</StyledForm>
			)}
		</Formik>
	)
}

type Params = {
	params: {
		id: string
	}
}

export async function getServerProps({ params: { id } }: Params) {
	let error = false
	let news: News | null = null

	try {
		const res = await fetch(`http://localhost:3001/news/${id}`)
		news = await res.json()
	} catch (error) {
		error = error
	}

	return {
		props: {
			id: parseInt(id, 10),
			news,
			error,
		},
	}
}

export default EditNewsPage
