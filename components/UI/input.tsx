import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import {
	InputContainer,
	LabelInput,
	StyledInput,
	StyledTextarea,
	StyledError,
} from "."

interface Props {
	type: string
	label?: string
	touched: boolean
	error?: string
}

const Input: React.FC<
	Props &
		InputHTMLAttributes<HTMLInputElement> &
		TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ type, label, touched, error, ...props }) => {
	let inputElement = null

	switch (type) {
		case "textarea":
			inputElement = <StyledTextarea {...props} />
			break
		default:
			inputElement = <StyledInput type={type} {...props} />
	}

	return (
		<InputContainer>
			{label && <LabelInput>{label}</LabelInput>}
			{inputElement}

			{error && touched && <StyledError>{error}</StyledError>}
		</InputContainer>
	)
}

export default Input
