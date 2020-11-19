import styled, { StyledComponent } from "styled-components"

interface Props {
	textColor?: string
}

export const StyledInput = styled.input`
	outline: 0;
	border: 1px solid ${({ theme }) => theme.colors.primary};
	width: 100%;
	margin: 10px auto;
	padding: 10px 15px;
`
export const StyledButton: StyledComponent<
	"button",
	any,
	Props,
	never
> = styled.button`
	display: block;
	appearance: none;
	outline: 0;
	border: 0;
	margin: 15px auto 0;
	padding: 10px 15px;
	background: ${({ theme, color }) => (color ? color : theme.colors.primary)};
	color: ${(props) => (props.textColor ? props.textColor : "#fff")};

	font-size: 1.2rem;
	cursor: pointer;
	transition: 350ms;

	&:hover {
		background: ${({ theme }) => theme.colors.secondary};
	}
`

export const StyledForm = styled.form`
	padding: 30px;
`

export const Container = styled.div`
	width: 100%;
	padding-right: 15px;
	padding-left: 15px;
	margin-right: auto;
	margin-left: auto;
	@media (min-width: 576px) {
		max-width: 540px;
	}
	(min-width: 768px) {
		max-width: 720px;
	}
	@media (min-width: 992px) {
		max-width: 960px;
	}
	@media (min-width: 1200px) {
		max-width: 1140px;
	} ;
`

export const InputContainer = styled.div`
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
`
export const LabelInput = styled.div`
	font-weight: bold;
	display: block;
	margin: 8px;
`

export const StyledTextarea = styled.textarea`
	outline: 0;
	border: 1px solid ${({ theme }) => theme.colors.primary};
	width: 100%;
	margin: 10px auto;
	padding: 10px 15px;
`

export const StyledLoading = styled.div`
	margin: 100px auto;
	font-size: 25px;
	width: 1em;
	height: 1em;
	border-radius: 50%;
	position: relative;
	text-indent: -9999em;
	-webkit-animation: load5 1.1s infinite ease;
	animation: load5 1.1s infinite ease;
	-webkit-transform: translateZ(0);
	-ms-transform: translateZ(0);
	transform: translateZ(0);

	@-webkit-keyframes load5 {
		0%,
		100% {
			box-shadow: 0em -2.6em 0em 0em #ff6600,
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2),
				2.5em 0em 0 0em rgba(255, 102, 0, 0.2),
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.2),
				0em 2.5em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.2),
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.5),
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.7);
		}
		12.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.7),
				1.8em -1.8em 0 0em #ff6600, 2.5em 0em 0 0em rgba(255, 102, 0, 0.2),
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.2),
				0em 2.5em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.2),
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.5);
		}
		25% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.5),
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.7), 2.5em 0em 0 0em #ff6600,
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.2),
				0em 2.5em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.2),
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2);
		}
		37.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.2),
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.5),
				2.5em 0em 0 0em rgba(255, 102, 0, 0.7), 1.75em 1.75em 0 0em #ff6600,
				0em 2.5em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.2),
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2);
		}
		50% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.2),
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2),
				2.5em 0em 0 0em rgba(255, 102, 0, 0.5),
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.7), 0em 2.5em 0 0em #ff6600,
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.2),
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2);
		}
		62.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.2),
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2),
				2.5em 0em 0 0em rgba(255, 102, 0, 0.2),
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.5),
				0em 2.5em 0 0em rgba(255, 102, 0, 0.7), -1.8em 1.8em 0 0em #ff6600,
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2);
		}
		75% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.2),
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2),
				2.5em 0em 0 0em rgba(255, 102, 0, 0.2),
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.2),
				0em 2.5em 0 0em rgba(255, 102, 0, 0.5),
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.7), -2.6em 0em 0 0em #ff6600,
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2);
		}
		87.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.2),
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2),
				2.5em 0em 0 0em rgba(255, 102, 0, 0.2),
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.2),
				0em 2.5em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.5),
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.7), -1.8em -1.8em 0 0em #ff6600;
		}
	}
	@keyframes load5 {
		0%,
		100% {
			box-shadow: 0em -2.6em 0em 0em #ff6600,
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2),
				2.5em 0em 0 0em rgba(255, 102, 0, 0.2),
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.2),
				0em 2.5em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.2),
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.5),
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.7);
		}
		12.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.7),
				1.8em -1.8em 0 0em #ff6600, 2.5em 0em 0 0em rgba(255, 102, 0, 0.2),
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.2),
				0em 2.5em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.2),
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.5);
		}
		25% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.5),
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.7), 2.5em 0em 0 0em #ff6600,
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.2),
				0em 2.5em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.2),
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2);
		}
		37.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.2),
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.5),
				2.5em 0em 0 0em rgba(255, 102, 0, 0.7), 1.75em 1.75em 0 0em #ff6600,
				0em 2.5em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.2),
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2);
		}
		50% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.2),
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2),
				2.5em 0em 0 0em rgba(255, 102, 0, 0.5),
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.7), 0em 2.5em 0 0em #ff6600,
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.2),
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2);
		}
		62.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.2),
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2),
				2.5em 0em 0 0em rgba(255, 102, 0, 0.2),
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.5),
				0em 2.5em 0 0em rgba(255, 102, 0, 0.7), -1.8em 1.8em 0 0em #ff6600,
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2);
		}
		75% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.2),
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2),
				2.5em 0em 0 0em rgba(255, 102, 0, 0.2),
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.2),
				0em 2.5em 0 0em rgba(255, 102, 0, 0.5),
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.7), -2.6em 0em 0 0em #ff6600,
				-1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2);
		}
		87.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(255, 102, 0, 0.2),
				1.8em -1.8em 0 0em rgba(255, 102, 0, 0.2),
				2.5em 0em 0 0em rgba(255, 102, 0, 0.2),
				1.75em 1.75em 0 0em rgba(255, 102, 0, 0.2),
				0em 2.5em 0 0em rgba(255, 102, 0, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 102, 0, 0.5),
				-2.6em 0em 0 0em rgba(255, 102, 0, 0.7), -1.8em -1.8em 0 0em #ff6600;
		}
	}
`

export const StyledError = styled.div`
	text-align: center;
	color: red;
`
