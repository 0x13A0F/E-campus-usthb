import React from "react";

class PopUp extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <h2>{this.props.text}</h2>
          <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

export default PopUp;
