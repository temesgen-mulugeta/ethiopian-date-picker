import React, { useState } from "react";

import { DayPicker } from "react-day-picker";

import { EthiopianDateLib } from "./EthiopianDateLib";

export function Ethiopian() {
  const [date, setDate] = useState(new Date());
  console.log("date", date);
  return (
    <DayPicker
      mode="single"
      required={false}
      dateLib={new EthiopianDateLib()}
      showWeekNumber
      selected={date}
      onSelect={(date) => setDate(date ?? new Date())}
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
