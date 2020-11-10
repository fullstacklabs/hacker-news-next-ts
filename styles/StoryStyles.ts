import styled from "styled-components"

export const CarItem = styled.div`
	display: block;
	padding: 0.5rem;
	margin: auto;
	@media (min-width: 40rem) {
		width: 50%;
	}
	@media (min-width: 56rem) {
		width: 90%;
	}
`
export const Card = styled.div`
	background-color: white;
	border-radius: 0.25rem;
	box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
	display: flex;
	flex-direction: column;
	overflow: hidden;
`

export const CardContent = styled.div`
	padding: 0.5rem;
`
export const CardTitle = styled.div`
	color: #666;
	font-size: 1.1rem;
	font-weight: 700;
	letter-spacing: 1px;
	text-transform: capitalize;
	margin: 0px;
`
export const CardBody = styled.div`
	color: #666;
	font-size: 0.875rem;
	line-height: 1.5;
	margin-top: 1.25rem;
	margin-bottom: 1.25rem;
	font-weight: 400;
`
export const CardButton = styled.button`
	color: blue;
	padding: 0.8rem;
	font-size: 14px;
	text-transform: uppercase;
	border-radius: 4px;
	font-weight: 400;
	display: block;
	width: 40%;
	margin: auto;
	margin-top: 10px;
	cursor: pointer;
	border: 1px solid #ccc;
	background: transparent;
`

export const StoryWrapper = styled.section`
	padding-top: 10px;
	margin-bottom: 20px;
	border-top: 1px solid #cccccc;
	&:first-of-type {
		border-top: 0;
	}
	&:last-of-type {
		margin-bottom: 0;
		padding-bottom: 0;
	}
`

export const StoryTitle = styled.h1`
	margin-bottom: 5px;
	font-size: 18px;
	line-height: 1.8;
	margin: 0;
	text-decoration: none;
	a {
		color: #2e2e2c;
		background-color: #f8dc3d;
		text-decoration: none;
	}
`

export const StoryMeta = styled.div`
  font-style: italic;
  color: #ccc,
  > span:first-child {
    margin-right: 10px;
  }
  > span:not(:first-child):before {
    content: '•'
    margin: 0 7px;
  }
  .story__meta-bold {
    font-weight: bold;
  }
`

export const StoryMetaElement = styled.span`
	font-weight: bold;
	margin-left: 10px;
	color: ${(props) => props.color};
`
