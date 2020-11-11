import styled from "styled-components"

export const StyledInput = styled.input`
	outline: 0;
	border: 1px solid ${({ theme }) => theme.colors.primary};
	width: 100%;
	margin: 10px auto;
	padding: 10px 15px;
`

export const StyledButton = styled.button`
	appearance: none;
	outline: 0;
	border: 0;
	margin: 10px auto;
	padding: 10px 15px;
	background: ${({ theme }) => theme.colors.primary};
	color: #fff;
	cursor: pointer;
	transition: 350ms;

	&:hover {
		background: ${({ theme }) => theme.colors.secondary};
	}
`
