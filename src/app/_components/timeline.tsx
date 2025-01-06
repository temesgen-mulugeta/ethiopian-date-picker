"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     if (ref.current) {
//       const rect = ref.current.getBoundingClientRect();
//       setHeight(rect.height);
//     }
//   }, [ref]);

  const height = 2200;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 70%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full -ml-5 bg-white dark:bg-neutral-950"
      ref={containerRef}
    >
      <div ref={ref} className="relative  mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 gap-10">
            <div className="sticky flex flex-col pl-16 gap-4 z-40 top-40 self-start md:w-full">
              <div className="size-5 absolute left-[23px]  rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="size-2 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 " />
              </div>

              <h3 className=" font-bold">{item.title}</h3>
              <div className="">{item.content}</div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
