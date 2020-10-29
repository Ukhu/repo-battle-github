import React from 'react'
import PropTypes from 'prop-types'
import {fetchPopularRepos} from '../utils/api'
import {FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from 'react-icons/fa'

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

function ReposGrid ({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url} className='card bg-light'>
            <h4 className='header-lg center-text'>
              #{index + 1}
            </h4>
            <img
              className='avatar'
              src={avatar_url}
              alt={`Avatar for ${login}`}/>
            <h2 className='center-text no-scroll'>
              <a className='link' href={html_url}>{name}</a>
            </h2>
            <ul className='card-list'>
              <li>
                <FaUser color='rgb(255, 191, 116)' size={22} />
                <a href={`https://github.com/${login}`}>
                  {login}
                </a>
              </li>
              <li>
                <FaStar color='rgb(255, 215, 0)' size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                {open_issues.toLocaleString()} open issues
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
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

        {error && <p className='center-text error'>{error}</p>}

        {repos[selected] && <ReposGrid repos={repos[selected]}/>}
      </React.Fragment>
    )
  }
}
