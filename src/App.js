import React from 'react';
import { connect } from 'react-redux'
import { getTranslation } from './redux/actions'

import * as Styled from './styles'  
//import { dataArray } from './jsonArray'
/*
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
*/
const Loader = (props) => {
  if (props.isLoading)
    return <Styled.LoaderAnimation/>
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
      <Styled.Wrapper>
        <div>
          <Styled.Title>Simple Translation App</Styled.Title>
        </div>
        <div>
          <Styled.TextInput 
            type="text" 
            value={this.state.toTranslated} 
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyPress} 
            placeholder="Enter Text"
            autoFocus
          />
          <Styled.Button
            type="submit" 
            onClick={this.handleTranslate}
          >
            Translate
          </Styled.Button>
        </div>
        <Styled.Text isError={this.state.error}>
          {this.state.showLoader?
          null:
          (this.state.translated? this.state.translated : this.state.error)
          }
        </Styled.Text>
        <Loader isLoading={this.state.showLoader}/>
      </Styled.Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  translated: state.translated,
  error: state.error
})
export default connect(mapStateToProps, {getTranslation})(App)
