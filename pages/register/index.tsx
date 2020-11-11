import styled from "styled-components"
import { StyledInput, StyledButton } from "../../components/UI"

const StyledForm = styled.div`
	padding: 30px;
`

const Register: React.FC = () => {
	return (
		<StyledForm>
			<StyledInput type="text" name="username" placeholder="UserName" />
			<StyledInput type="password" name="password" placeholder="Password" />
			<StyledInput
				type="password"
				name="password-confirm"
				placeholder="Confirm Password"
			/>
			<StyledButton>Submit</StyledButton>
		</StyledForm>
	)
}

export default Register
