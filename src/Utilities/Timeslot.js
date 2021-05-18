import React from "react";

import Button from "@material-ui/core/Button";
import axios from "axios";

const Timeslot = (props) => {
  let renderTimeslot;

  let renderReserve = () => {
    return (
      <Button
        className={"timeslot-btn"}
        variant="contained"
        color="primary"
        onClick={() => reserveSpot()}
      >
        {" "}
        Reserveer
      </Button>
    );
  };

  let renderFullTimeslot = () => {
    return (
      <Button variant="contained" color="primary" disabled>
        VOL
      </Button>
    );
  };

  const reserveSpot = () => {
    console.log("reservespot");
    axios({
      method: "post",
      url: `${props.url}/reserveSpot`,
      data: {
        id: props.id,
        confirmedBookingQuestions: true,
        ppl_id: props.ppl_id,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (props.is_full) {
    renderTimeslot = renderFullTimeslot();
  }

  return (
    <div className={"timeslot"}>
      <p className={"timeslot-time"} id={props.id}>
        {props.timeslot_start} - {props.timeslot_end}
      </p>
      {renderTimeslot}
      {renderReserve()}
    </div>
  );
};

export default Timeslot;
