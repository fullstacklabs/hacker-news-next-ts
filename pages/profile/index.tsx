import { useState, useEffect, useContext } from "react"
import { GetServerSideProps } from "next"
import { Formik } from "formik"
import styled from "styled-components"
import cookies from "next-cookies"
import { UserContext } from "../../common/UserContext"
import { useRequireUser, useAPI } from "../../common/util"
import Input from "../../components/UI/input"
import Story from "../../components/Story"
import { StyledLoading, StyledButton, StyledError } from "../../components/UI"
import { News, User } from "../../common/types"

type FormErrors = {
	name?: string
	title?: string
	email?: string
	password?: string
	passwordConfirm?: string
}

interface Props {
	serverUser: User | string
	serverNews: News[] | string
}

const StyledUser = styled.div`
	padding: 15px;
`

const StyledStories = styled.div`
	margin-top: 45px;

	> h2 {
		text-align: center;
	}
`

const StyledForm = styled.form`
	padding: 30px;
`

const UserPage: React.FC<Props> = ({ serverUser, serverNews }) => {
	const { user: clientUser, login } = useContext(UserContext)
	const typedServerUser = typeof serverUser !== "string" ? serverUser : null
	const user = clientUser || typedServerUser

	useRequireUser(user)

	const typedServerNews = typeof serverNews !== "string" ? serverNews : []
	const [userNews, setUserNews] = useState<News[]>(typedServerNews)
	const [isEditing, setIsEditing] = useState(false)

	const { loading: userLoading, error: userError, callAPI: userAPI } = useAPI({
		method: "PATCH",
	})
	const { loading: newsLoading, error: newsError, callAPI: newsAPI } = useAPI()

	useEffect(() => {
		if (user)
			newsAPI(`/news?userId=${user.id}`).then((news) => setUserNews(news))
	}, [user])

	const editClickHandler = () => setIsEditing(!isEditing)

	if (!user) return <StyledError>Error loading user</StyledError>

	const { name, title, email, password } = user

	if (!isEditing)
		return (
			<StyledUser>
				<div>
					{title} {name}
				</div>
				<div>{email}</div>

				<StyledButton onClick={editClickHandler}>Edit</StyledButton>

				<StyledStories>
					<h2>Your News Posts</h2>
					{userNews &&
						userNews.map((item, index) => (
							<Story key={item.id} news={item} rank={index + 1} />
						))}
				</StyledStories>
			</StyledUser>
		)
	else
		return (
			<>
				<Formik
					initialValues={{
						name: name,
						title: title,
						email: email,
						password: password,
						passwordConfirm: password,
					}}
					validate={(values) => {
						const errors: FormErrors = {}

						if (!values.name) errors.name = "Required"

						if (!values.title) errors.title = "Required"

						if (!values.email) errors.email = "Required"

						if (!values.password) errors.password = "Required"

						if (!values.passwordConfirm) errors.passwordConfirm = "Required"

						if (values.password !== values.passwordConfirm)
							errors.passwordConfirm = "Passwords don't match"

						return errors
					}}
					onSubmit={async (values, { setSubmitting, resetForm }) => {
						const updatedUser = {
							...values,
							passwordConfirm: undefined,
						}

						const json = await userAPI(`/user/${user.id}`, {
							body: JSON.stringify(updatedUser),
						})

						if (json) {
							login(json)
							resetForm()
							setIsEditing(false)
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
						<StyledForm onSubmit={handleSubmit}>
							{userLoading && <StyledLoading />}

							<Input
								type="text"
								name="name"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
								placeholder="Name"
								touched={!!touched.name}
								error={errors.name}
							/>

							<Input
								type="text"
								name="title"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.title}
								placeholder="Title"
								touched={!!touched.title}
								error={errors.title}
							/>

							<Input
								type="email"
								name="email"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								placeholder="Email"
								touched={!!touched.email}
								error={errors.email}
							/>

							<Input
								type="password"
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								placeholder="Password"
								touched={!!touched.password}
								error={errors.password}
							/>

							<Input
								type="password"
								name="passwordConfirm"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.passwordConfirm}
								placeholder="Password Confirmation"
								touched={!!touched.passwordConfirm}
								error={errors.passwordConfirm}
							/>

							{userError && <StyledError>{userError}</StyledError>}

							<StyledButton type="submit" disabled={isSubmitting}>
								Submit
							</StyledButton>
						</StyledForm>
					)}
				</Formik>

				<StyledButton
					onClick={editClickHandler}
					style={{ marginBottom: "15px" }}
				>
					Cancel Edit
				</StyledButton>
			</>
		)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	let user = cookies(ctx).user
	let news

	if (user) {
		// @ts-ignore
		const res = await fetch(`http://localhost:3001/news?userId=${user.id}`)
		news = await res.json()
	}

	return {
		props: {
			serverUser: user || "",
			serverNews: news || "",
		},
	}
}

export default UserPage
