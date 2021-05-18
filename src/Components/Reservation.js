import React, { useState, useEffect } from "react";

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import axios from "axios";

import * as date from "../Utilities/Date";
import Timeslot from "../Utilities/Timeslot";

const Reservation = (props) => {
  const [dates, setDates] = useState();
  let [dateSelect, setDateSelect] = useState();
  const [timestamps, setTimestamps] = useState();

  useEffect(() => {
    setDates(date.getFullDate());
  }, []);

  const returnDateSelect = (dates) => {
    let renderDate;
    renderDate = dates.map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ));
    return renderDate;
  };

  const returnTimestamp = (timestamps) => {
    let renderTimestamps;
    renderTimestamps = timestamps.map((value, index) => (
      <Timeslot
        key={index}
        url={props.url}
        id={value.id}
        timeslot_start={value.timeslot_start}
        timeslot_end={value.timeslot_end}
        is_bookable={value.is_bookable}
        is_full={value.is_full}
        ppl_id={props.id}
      />
    ));
    return renderTimestamps;
  };

  const callTimestampForDate = async () => {
    if (!dateSelect) {
      dateSelect = dates[0];
    }
    try {
      const response = await axios({
        method: "post",
        url: `${props.url}/getDataFromDate`,
        data: {
          id: props.id,
          club: props.club,
          date_select: dateSelect,
        },
      });

      if (response) {
        setTimestamps(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let renderDate;
  let renderTimestamp;

  if (dates) {
    if (!dateSelect) {
      setDateSelect(dates[0]);
      callTimestampForDate();
    }
  }

  if (dates) {
    renderDate = returnDateSelect(dates);
  }

  if (timestamps) {
    renderTimestamp = returnTimestamp(timestamps);
  }

  return (
    <div className={"reservation-app"}>
      <h1 className={"reservation-tag"}>Trainmore reserveren</h1>
      <div className={"date-selector"}>
        <InputLabel className={"date-selector"} htmlFor="date-selector">
          Datum
        </InputLabel>
        <Select
          native
          name="dateSelect"
          id="date-selector"
          onChange={(e) => {
            dateSelect = e.target.value;
            callTimestampForDate();
          }}
        >
          {renderDate}
        </Select>
      </div>
      {renderTimestamp}
      <div className={"mobile-margin"}></div>
    </div>
  );
};

export default Reservation;
