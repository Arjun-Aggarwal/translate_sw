import styled, { keyframes } from 'styled-components'

export const spin  = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const LoaderAnimation = styled.div`
  border: 14px solid #f3f3f3; 
  border-top: 14px solid skyblue; 
  border-bottom: 14px solid palevioletred;
  border-radius: 50%;
  padding: 30px;
  animation: ${spin} 2s linear infinite;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
export const Text = styled.h2`
  font: 2em Arial;
  color: ${props => props.isError? 'red' : 'skyblue'};
`
export const Title = styled(Text)`
  color: palevioletred
`
export const TextInput = styled.input`
  outline: none;
  border: 2px solid skyblue;
  border-radius: 6px;
  padding: 1em;
  widTh: 25em;
  font-size: 14px;
`
export const Button = styled.button`
  color: palevioletred
  font-family: Arial
  font-size: 14px
  margin: 0.5em;
  border-radius: 6px;
  border: 2px solid palevioletred;
  padding: 14px
`
export const Table = styled.table`
  border: 1px solid skyblue;
  border-collapse: collapse;
  border-radius: 10px;
  width: 85%;
`
export const Td = styled.td`
  font-family: Arial
  padding: 15px;
  border: 1px solid skyblue;
  border-collapse: collapse;
  text-align: center;
`
export const Th = styled.th`
  font-family: Arial
  padding: 15px;
  border: 1px solid skyblue;
  border-collapse: collapse;
`