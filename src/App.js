import React from 'react';
import { connect } from 'react-redux'
import { getTranslation } from './redux/actions'
import styled, { keyframes } from 'styled-components'
//import { dataArray } from './jsonArray'

const spin  = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoaderAnimation = styled.div`
  border: 14px solid #f3f3f3; 
  border-top: 14px solid skyblue; 
  border-bottom: 14px solid palevioletred;
  border-radius: 50%;
  padding: 30px;
  animation: ${spin} 2s linear infinite;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const Text = styled.h2`
  font: 2em Arial;
  color: ${props => props.isError? 'red' : 'skyblue'};
`
const Title = styled(Text)`
  color: palevioletred
`
const TextInput = styled.input`
  outline: none;
  border: 2px solid skyblue;
  border-radius: 6px;
  padding: 1em;
  widTh: 25em;
  font-size: 14px;
`
const Button = styled.button`
  color: palevioletred
  font-family: Arial
  font-size: 14px
  margin: 0.5em;
  border-radius: 6px;
  border: 2px solid palevioletred;
  padding: 14px
`
const Table = styled.table`
  border: 1px solid skyblue;
  border-collapse: collapse;
  border-radius: 10px;
  width: 85%;
`
const Td = styled.td`
  font-family: Arial
  padding: 15px;
  border: 1px solid skyblue;
  border-collapse: collapse;
  text-align: center;
`
const Th = styled.th`
  font-family: Arial
  padding: 15px;
  border: 1px solid skyblue;
  border-collapse: collapse;
`

const DataTable = props => {
  const tableData = props.dataSet.map(data => {
    const {ID, Name, Gender, Class, Info} = data
      return (
          <tr>
            <Td>{ID}</Td>
            <Td>{Name}</Td>
            <Td>{Gender}</Td>
            <Td>{Class}</Td>
            <Td>{Info}</Td>
          </tr>
      )
  })
  return (
    <Table> 
      <tr>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>Gender</Th>
        <Th>Class</Th>
        <Th>Info</Th>
      </tr>
      {tableData}
    </Table>
  )
}
const Loader = (props) => {
  if (props.isLoading)
    return <LoaderAnimation/>
  else 
    return null
} 
class App extends React.Component {
  state = {
    toTranslate: '',
    translated: '',
    error: '',
    showLoader: false,
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      translated: newProps.translated,
      error: newProps.error,
      showLoader: false
    })
  }
  handleInputChange = event => {
    this.setState({ toTranslate: event.target.value} )
  }
  handleTranslate = () => {
    this.setState({showLoader: true})
    this.props.getTranslation(this.state.toTranslate)
  }
  handleKeyPress = event => {
    if (event.keyCode === 13)
      this.handleTranslate()
  }
  render() {
    return (
      <Wrapper>
        <div>
          <Title>Simple Translation App</Title>
        </div>
        <div>
          <TextInput 
            type="text" 
            value={this.state.toTranslated} 
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyPress} 
            placeholder="Enter Text"
            autoFocus
          />
          <Button
            type="submit" 
            onClick={this.handleTranslate}
          >
            Translate
          </Button>
        </div>
        <Text isError={this.state.error}>
          {this.state.showLoader?
          null:
          (this.state.translated? this.state.translated : this.state.error)
          }
        </Text>
        <Loader isLoading={this.state.showLoader}/>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  translated: state.translated,
  error: state.error
})
export default connect(mapStateToProps, {getTranslation})(App)
