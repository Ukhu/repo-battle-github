import React from 'react'
import PropTypes from 'prop-types'
import {fetchPopularRepos} from '../utils/api'

function LanguagesNav({selected, onUpdateLanguage}) {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="flex-center">
      {languages.map(lang => (
        <li key={lang}>
          <button 
            className="btn-clear nav-link"
            style={selected === lang ? {color: 'rgb(187, 46, 31)'} : null}
            onClick={() => onUpdateLanguage(lang)}>
            {lang}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'All',
      error: null,
      repos: {}
    }
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selected)
  }

  updateLanguage(newSelected) {
    this.setState({
      selected: newSelected,
      error: null
    })

    if (!this.state.repos[newSelected]) {
      fetchPopularRepos(newSelected)
        .then((data) => {
          this.setState(({repos}) => ({
            repos: {
              ...repos,
              [newSelected]: data
            }
          }))
        })
        .catch((error) => {
          console.warn('Error fetching repos', error)
          this.setState({
            error: 'There was an error fetching repositories'
          })
        })
    }
  }

  isLoading() {
    const {selected, error, repos} = this.state

    return !repos[selected] && error === null
  }

  render() {
    const {selected, repos, error} = this.state

    return (
      <React.Fragment>
        <LanguagesNav 
          selected={selected}
          onUpdateLanguage={this.updateLanguage}/>

        {this.isLoading() && <p>Loading repos...</p>}

        {error && <p>{error}</p>}

        {repos[selected] && <pre>{JSON.stringify(repos[selected], null, 2)}</pre>}
      </React.Fragment>
    )
  }
}
