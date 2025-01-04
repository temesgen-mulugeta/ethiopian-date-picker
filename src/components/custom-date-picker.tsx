"use client";

import { EthiopianDateLib } from "@/utils/EthiopianDateLib";
import { DateLibOptions, DayPicker } from "react-day-picker";

export default function EthiopianCalendar() {
  const dateLib = getDateLib();
  return (
    <DayPicker
      components={{
        Day(props) {
          return <td {...props}>{props.children}</td>;
        },
        Week(props) {
          return <tr {...props}>{props.children}</tr>;
        },
      }}
      dateLib={dateLib}
    
    />
  );
}


export const getDateLib = (options?: DateLibOptions) => {
  return new EthiopianDateLib({
    ...options,
  });
};
