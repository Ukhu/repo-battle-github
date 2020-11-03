import React from 'react';

class Hover extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hovering: false
    }

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver() {
    this.setState({
      hovering: true
    })
  }

  onMouseOut() {
    this.setState({
      hovering: false
    })
  }

  render() {
    const { hovering } = this.state;

    return (
      <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        {this.props.children(hovering)}
      </div>
    )
  }
}

export default Hover;
