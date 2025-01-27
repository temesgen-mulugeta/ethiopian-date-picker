"use client";

import DatePicker from "@/components/date-picker";
import Description from "./_components/description";
import Steps from "./_components/steps";
import Contribution from "./_components/contribution";

export default function Home() {
  console.log(new Intl.NumberFormat("ge").format(123));
  return (
    <div>
      <div className="mx-auto w-screen md:w-[700px] p-4">
        <div className="py-14 border bg-muted flex justify-center items-center rounded-lg">
          <DatePicker />
        </div>
        <Description />
        <Steps />
        <Contribution />
      </div>
    </div>
  );
}
