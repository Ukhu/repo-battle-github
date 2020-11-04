import React from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular'
import Battle from './components/Battle'
import Nav from './components/Nav'
import { ThemeProvider } from './contexts/theme'
import './styles.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: 'dark',
      toggleTheme: () => {
        this.setState(({theme}) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }
    }
  }

  render() {
    return (
      <ThemeProvider value={this.state}>
        <div className={this.state.theme}>
          <div className="container">
            <Nav />
            <Popular />
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)