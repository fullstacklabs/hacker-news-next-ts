import { useState, useContext } from "react"
import { Formik } from "formik"
import styled from "styled-components"
import { UserContext } from "../../common/UserContext"
import Input from "../../components/UI/input"
import { StyledButton, StyledError } from "../../components/UI"
import Spinner from "../../components/UI/Spinner"
import { useRequireNoUser, useAPI } from "../../common/util"

type FormErrors = {
	email?: string
	password?: string
}

const StyledForm = styled.form`
	padding: 30px;
`

const LoginPage: React.FC = () => {
	const [verificationError, setVerificationError] = useState<string | null>(
		null
	)
	const { user, login } = useContext(UserContext)
	useRequireNoUser(user)
	const { loading, error, callAPI } = useAPI()

	if (user) return <StyledError>You are already logged in</StyledError>

	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
			}}
			validate={(values) => {
				const errors: FormErrors = {}

				if (!values.email) errors.email = "Required"

				if (!values.password) errors.password = "Required"

				return errors
			}}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				setVerificationError(null)
				const res = await callAPI(`/user?email=${values.email}`)

				if (res && res.length) {
					let resUser = res[0]

					if (resUser.password === values.password) {
						resetForm()
						login(resUser)
					} else setVerificationError("Invalid login. Please try again.")
				} else setVerificationError("Invalid login. Please try again.")

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
					{loading && <Spinner />}

					<Input
						type="email"
						name="email"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
						placeholder="Email"
						error={errors.email}
						touched={!!touched.email}
					/>

					<Input
						type="password"
						name="password"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
						placeholder="Password"
						error={errors.password}
						touched={!!touched.password}
					/>

					{error && <StyledError>{error}</StyledError>}

					{verificationError && <StyledError>{verificationError}</StyledError>}

					<StyledButton type="submit" disabled={isSubmitting}>
						Login
					</StyledButton>
				</StyledForm>
			)}
		</Formik>
	)
}

export default LoginPage
