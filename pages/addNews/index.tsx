import { useContext } from "react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import { Formik } from "formik"
import cookies from "next-cookies"
import { UserContext } from "../../common/UserContext"
import { Container } from "../../components/UI"
import Input from "../../components/UI/input"
import { StyledButton, StyledLoading, StyledError } from "../../components/UI"
import { useRequireUser, useAPI } from "../../common/util"
import { NewsSubmit, User } from "../../common/types"

type FormErrors = {
	title?: string
	url?: string
	text?: string
}

interface Props {
	serverUser: User | string
}

const AddNewsPage: React.FC<Props> = ({ serverUser }) => {
	const { loading, error, callAPI } = useAPI({
		method: "post",
	})
	const router = useRouter()
	const { user: clientUser } = useContext(UserContext)
	const typedServerUser = typeof serverUser !== "string" ? serverUser : null
	const user = clientUser || typedServerUser
	useRequireUser(user)

	if (!user) return null

	return (
		<Container>
			<Head>
				<title>Add news</title>
			</Head>

			<h1>New Story</h1>

			{loading ? (
				<StyledLoading />
			) : (
				<Formik
					initialValues={{
						title: "",
						url: "",
						text: "",
					}}
					validate={(values: NewsSubmit) => {
						const errors: FormErrors = {}

						if (!values.title) errors.title = "Required"

						if (!values.text) errors.text = "Required"

						return errors
					}}
					onSubmit={async (values, { setSubmitting, resetForm }) => {
						const { title, url, text } = values

						const body = {
							kids: [],
							creationDate: new Date().toISOString(),
							text,
							url,
							title,
							by: user.name,
							type: "story",
							user: user.id,
							likes: [],
						}

						if (
							await callAPI("/news", {
								body: JSON.stringify(body),
							})
						) {
							resetForm()
							router.push("/")
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
						<form onSubmit={handleSubmit}>
							<Input
								type="text"
								name="title"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.title}
								label="Title"
								error={errors.title}
								touched={!!touched.title}
							/>

							<Input
								type="text"
								name="url"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.url}
								label="URL"
								error={errors.url}
								touched={!!touched.url}
							/>

							<Input
								type="textarea"
								name="text"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.text}
								label="Summary"
								error={errors.text}
								touched={!!touched.text}
							/>

							<div
								style={{
									justifyContent: "space-between",
									display: "flex",
									maxWidth: "300px",
									margin: "auto",
									padding: "10px 0",
								}}
							>
								<StyledButton
									color={"white"}
									textColor="black"
									onClick={() => router.push("/")}
								>
									Cancel
								</StyledButton>

								<StyledButton type="submit" disabled={isSubmitting}>
									Save
								</StyledButton>

								{error && <StyledError>{error}</StyledError>}
							</div>
						</form>
					)}
				</Formik>
			)}
		</Container>
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return {
		props: {
			serverUser: cookies(ctx).user || "",
		},
	}
}

export default AddNewsPage
