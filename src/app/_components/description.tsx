export default function Description() {
  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-4 text-sm ">
      <h2 className="text-2xl font-bold tracking-tight">
        Ethiopian Date Picker
      </h2>
      <p className="leading-relaxed">
        A custom DateLib implementation for{" "}
        <span className="font-bold bg-muted px-2 py-0.5 text-xs rounded-sm">
          react-day-picker
        </span>{" "}
        that enables Ethiopian calendar functionality. The provided component
        uses{" "}
        <span className="font-bold bg-muted px-2 py-0.5 text-xs rounded-sm">
          shadcn/ui
        </span>{" "}
        for styling, but you can use{" "}
        <span className="font-bold bg-muted px-2 py-0.5 text-xs rounded-sm">
          EthiopianDateLib
        </span>{" "}
        directly with react-day-picker to create your own custom styled
        components.
      </p>
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Key Features</h3>
        <ul className="grid gap-2 text-sm">
          <li className="flex gap-3 items-start">
            <div className="size-2 mt-2 rounded-full bg-muted-foreground/20" />
            <span className="text-muted-foreground leading-relaxed">
              Stores dates in Gregorian format internally while displaying in
              Ethiopian calendar
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <div className="size-2 mt-2 rounded-full bg-muted-foreground/20" />
            <span className="text-muted-foreground leading-relaxed">
              Comprehensive date utility functions for Ethiopian calendar
              operations (conversion, formatting, calculations)
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <div className="size-2 mt-2 rounded-full bg-muted-foreground/20" />
            <span className="text-muted-foreground leading-relaxed">
              Fully customizable - use{" "}
              <span className="font-medium text-foreground">
                EthiopianDateLib
              </span>{" "}
              directly with{" "}
              <span className="font-medium text-foreground">
                react-day-picker
              </span>{" "}
              for custom implementations
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <div className="size-2 mt-2 rounded-full bg-muted-foreground/20" />
            <span className="text-muted-foreground leading-relaxed">
              Dual calendar view with Ethiopian and Gregorian dates
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <div className="size-2 mt-2 rounded-full bg-muted-foreground/20" />
            <span className="text-muted-foreground leading-relaxed">
              Supports both single date and date range selection modes
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
