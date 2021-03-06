import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'
import { ThemeConsumer } from '../contexts/theme'

function ProfileList({profile}) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color='rgb(144, 115, 255)' size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color='#795548' size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaCode color='rgb(89, 95, 105)' size={22} />
        {profile.public_repos.toLocaleString()} repos
      </li>
      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
}

class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }
  
  componentDidMount () {
    const { playerOne, playerTwo } = queryString.parse(this.props.location.search);

    battle([ playerOne, playerTwo ])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        })
      }).catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        })
      })
  }

  render() {
    const { winner, loser, error, loading } = this.state

    if (loading === true) {
      return <Loading text='Battling'/>
    }

    if (error) {
      return (
        <p className='center-text error'>{error}</p>
      )
    }

    return (
      <ThemeConsumer>
        {({theme}) => (
          <React.Fragment>
            <div className='grid space-around container-sm'>
              <Card
                header={winner.score === loser.score ? 'Tie' : 'Winner'}
                subHeader={`Score: ${winner.score.toLocaleString()}`}
                avatar={winner.profile.avatar_url}
                name={winner.profile.login}
                href={winner.profile.html_url}>
                  <ProfileList profile={winner.profile}/>
              </Card>
              <Card
                header={winner.score === loser.score ? 'Tie' : 'Loser'}
                subHeader={`Score: ${loser.score.toLocaleString()}`}
                avatar={loser.profile.avatar_url}
                name={loser.profile.login}
                href={loser.profile.html_url}>
                  <ProfileList profile={loser.profile}/>
              </Card>
            </div>
            <Link
              to='/battle'
              className={`btn ${theme === 'light' ? 'btn-dark' : 'btn-light'} btn-space`}>
                Reset
            </Link>
          </React.Fragment>
        )}
      </ThemeConsumer>
    )
  }
}

export default Results