import React from 'react';

function withHover(WrappedComponent, propName='hovering') {
  return class WithHover extends React.Component {
    state = { hovering: false }

    onMouseOver = () => this.setState({hovering: true})
    onMouseOut = () => this.setState({hovering: false})

    render() {
      const { children } = this.props;

      const props = {
        [propName]: this.state.hovering,
        ...this.props
      }

      return (
        <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
          <WrappedComponent {...props}>
            {children}
          </WrappedComponent>
        </div>
      )
    }
  }
}

export default withHover;
