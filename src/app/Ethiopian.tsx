import React from "react";

import { DayPicker } from "react-day-picker";

import { EthiopianDateLib } from "./EthiopianDateLib";

export function Ethiopian() {
  return (
    <DayPicker
      mode="single"
      dateLib={new EthiopianDateLib()}
      showWeekNumber
      components={{
        Weekday(props) {
          return <td {...props}>{props.children}</td>;
        },
        Week(props) {
          return <tr {...props}>{props.children}</tr>;
        },
        Month(props) {
          return <div {...props}>{props.children}</div>;
        },
      }}
    />
  );
}
