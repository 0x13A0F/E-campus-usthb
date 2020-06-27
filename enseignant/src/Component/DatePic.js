import React from "react";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import { FormControl } from "react-bootstrap";
import moment from "moment";

import { database } from "../firebase";
class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start).add(1, "days").subtract(1, "seconds");
    this.state = {
      start: start,
      end: end,
    };

    this.applyCallback = this.applyCallback.bind(this);
  }

  applyCallback(startDate, endDate) {
    this.setState({
      start: startDate,
      end: endDate,
    });
    let end = this.state.end.toString();
    //4)
    database
      .ref("/Formulaires/RSD/Formulaire" + this.props.IdFormulaire + "/Date/a")
      .set(end);
  }

  render() {
    const IdFormulaire = this.props.IdFormulaire;
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start).add(0, "days").subtract(1, "seconds");
    let ranges = {
      "356 Days": [moment(start).subtract(356, "days"), moment(end)],
    };
    let local = {
      format: "DD-MM-YYYY HH:mm",
      sundayFirst: false,
    };
    let maxDate = moment(start).add(365, "days");
    return (
      <div>
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
        >
          <FormControl
            className="Calendrier"
            id="formControlsTextB"
            type="text"
            label="Text"
            placeholder={this.state.end.toString()}
            size="lg"
          />
        </DateTimeRangeContainer>
      </div>
    );
  }
}
export default Wrapper;
