"use client";

import { EthiopianDateLib } from "@/utils/EthiopianDateLib";
import { DateLibOptions } from "react-day-picker";
import { Ethiopian } from "./Ethiopian";

export default function Home() {
  return (
    <div className="p-20">
      <Ethiopian />
    </div>
  );
}

export const getDateLib = (options?: DateLibOptions) => {
  return new EthiopianDateLib({
    ...options,
  });
};
