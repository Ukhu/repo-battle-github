import React from 'react';
import PropTypes from 'prop-types';
import withHover from './withHover';

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  }
};

function Tooltip({text, children, hovering}) {
  return (
    <div style={styles.container}>
      {hovering === true && <div style={styles.tooltip}>{text}</div>}
      {children}
    </div>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  hovering: PropTypes.bool.isRequired
}

/**
 * The second argument is to specify the prop that the 
 * wrapped component is expecting to detect the hover state.
 * This is to avoid name collisions e.g if withHover supplies 'hovering'
 * by default but Tooltip accepts 'hovering' originally as a prop
 * for something else and 'hover' for the hover state detection.
 * With the second argument, you can change what withHover supplies
 * to what Tooltip is already expecting as the hover detection prop.
 * 
 */
 
export default withHover(Tooltip, 'hovering'); 