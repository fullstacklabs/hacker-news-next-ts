import { useRouter } from "next/router"
import { Formik } from "formik"
import styled from "styled-components"
import { useGlobal } from "../../store"
import { StyledInput, StyledButton, StyledError } from "../../components/UI"
import Spinner from "../../components/UI/Spinner"

type FormErrors = {
	email?: string
	password?: string
}

const StyledForm = styled.form`
	padding: 30px;
`

const Register: React.FC = () => {
	const router = useRouter()
	const [state, actions] = useGlobal()

	const { userLoading, userError } = state

	if (state.user) {
		router.push("/")
	}

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
				await actions.login(values)
				resetForm()
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
					{userLoading && <Spinner />}

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
					{userError && <StyledError>{userError}</StyledError>}

					<StyledButton type="submit" disabled={isSubmitting}>
						Login
					</StyledButton>
				</StyledForm>
			)}
		</Formik>
	)
}

export default Register
