import React from 'react';
import { connect } from 'react-redux'
import { getTranslation } from './redux/actions'
import * as Styled from './styles'
import hindiImage from './assets/hindi-image.jpg' 

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
          <img src={hindiImage} alt='hindi-image' width='150'/>
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
