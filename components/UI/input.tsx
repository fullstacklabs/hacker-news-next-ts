import { ChangeEvent } from "react"
import { InputContainer, LabelInput, StyledInput, StyledTextarea } from "."
import { ElementType } from "../../common/types"

interface Props {
	label?: string
	type?: string
	value?: string
	elementConfig?: ElementType
	onChangeHanlder: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void
}

const Input: React.FC<Props> = ({
	type,
	value,
	elementConfig,
	onChangeHanlder,
	label,
}) => {
	let inputElement = null
	switch (type) {
		case "text":
			inputElement = (
				<StyledInput {...elementConfig} onChange={onChangeHanlder} />
			)
			break
		case "textarea":
			inputElement = (
				<StyledTextarea {...elementConfig} onChange={onChangeHanlder} />
			)
			break
		default:
			inputElement = (
				<StyledInput {...elementConfig} onChange={onChangeHanlder} />
			)
	}
	return (
		<InputContainer>
			<LabelInput>{label}</LabelInput>
			{inputElement}
		</InputContainer>
	)
}

export default Input
