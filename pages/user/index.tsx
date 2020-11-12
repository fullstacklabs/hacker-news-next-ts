import { useState, useCallback } from "react"
import { useRouter } from "next/router"
import { Formik } from "formik"
import styled from "styled-components"
import { useGlobal } from "../../store"
import { StyledInput, StyledButton, StyledError } from "../../components/UI"
import Spinner from "../../components/UI/Spinner"

type FormErrors = {
	name?: string
	title?: string
	email?: string
	password?: string
	passwordConfirm?: string
}

const StyledUser = styled.div`
	padding: 15px;
`

const StyledForm = styled.form`
	padding: 30px;
`

const User: React.FC = () => {
	const [isEditing, setIsEditing] = useState(false)
	const router = useRouter()
	const [state, actions] = useGlobal()

	const { userLoading, userError } = state

	const editClickHandler = useCallback(() => setIsEditing(!isEditing), [
		isEditing,
	])

	if (!state.user && typeof window !== "undefined") {
		router.push("/")
	}

	if (state.user !== null && state.user.id) {
		const { name, title, email, password, id } = state.user

		if (!isEditing)
			return (
				<StyledUser>
					<div>
						{title} {name}
					</div>
					<div>{email}</div>

					<StyledButton onClick={editClickHandler}>Edit</StyledButton>
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
							const user = {
								...values,
								passwordConfirm: undefined,
							}

							await actions.editUser(user, id)
							resetForm()
							setSubmitting(false)
							setIsEditing(false)
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
								{userLoading && <Spinner />}

								<StyledInput
									type="text"
									name="name"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
									placeholder="Name"
								/>

								<StyledError>
									{errors.name && touched.name && errors.name}
								</StyledError>

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
									type="email"
									name="email"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
									placeholder="Email"
								/>

								<StyledError>
									{errors.email && touched.email && errors.email}
								</StyledError>

								<StyledInput
									type="password"
									name="password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									placeholder="Password"
								/>

								<StyledError>
									{errors.password && touched.password && errors.password}
								</StyledError>

								<StyledInput
									type="password"
									name="passwordConfirm"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.passwordConfirm}
									placeholder="Password Confirmation"
								/>

								<StyledError>
									{errors.passwordConfirm &&
										touched.passwordConfirm &&
										errors.passwordConfirm}
								</StyledError>

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
	} else {
		return <StyledError>Error loading user</StyledError>
	}
}

export default User
