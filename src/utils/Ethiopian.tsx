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
      captionLayout="dropdown-years"
      defaultMonth={new Date(2024, 6)}
      startMonth={new Date(2021, 6)}
      endMonth={new Date(2028, 9)}
      selected={date}
      weekStartsOn={0}
      onSelect={(date) => setDate(date ?? new Date())}
      hideNavigation
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
