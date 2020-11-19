import { useContext } from "react"
import { useRouter } from "next/router"
import { Formik } from "formik"
import { UserContext } from "../../common/UserContext"
import Input from "../../components/UI/input"
import {
	StyledLoading,
	StyledForm,
	StyledButton,
	StyledError,
} from "../../components/UI"
import { useRequireNoUser, useAPI } from "../../common/util"

type FormErrors = {
	name?: string
	title?: string
	email?: string
	password?: string
	passwordConfirm?: string
}

const Register: React.FC = () => {
	const router = useRouter()
	const { user, login } = useContext(UserContext)
	useRequireNoUser(user)
	const { loading, error, callAPI } = useAPI({
		method: "post",
	})

	if (user) return <StyledError>You are already logged in</StyledError>

	return (
		<Formik
			initialValues={{
				name: "",
				title: "",
				email: "",
				password: "",
				passwordConfirm: "",
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

				const json = await callAPI("/user", { body: JSON.stringify(user) })

				if (json) {
					login(json)
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
				<StyledForm onSubmit={handleSubmit}>
					{loading && <StyledLoading />}

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

					{error && <StyledError>{error}</StyledError>}

					<StyledButton type="submit" disabled={isSubmitting}>
						Submit
					</StyledButton>
				</StyledForm>
			)}
		</Formik>
	)
}

export default Register
