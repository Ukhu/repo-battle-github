import React from 'react';
import { ThemeConsumer } from '../contexts/theme';

function Nav() {
  return (
    <ThemeConsumer>
      {({theme, toggleTheme}) => (
        <nav className='row space-between'>
          <button
            style={{fontSize: 30, cursor: "pointer"}}
            className='btn-clear'
            onClick={toggleTheme}>
            {theme === 'light' ? '🔦' : '💡'}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  )
}

export default Nav;
