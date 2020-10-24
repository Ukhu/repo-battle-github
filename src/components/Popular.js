import React from 'react'
import PropTypes from 'prop-types'

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
      selected: 'All'
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(newSelected) {
    this.setState({
      selected: newSelected
    })
  }

  render() {
    return (
      <React.Fragment>
        <LanguagesNav 
          selected={this.state.selected}
          onUpdateLanguage={this.updateLanguage}/>
      </React.Fragment>
    )
  }
}
