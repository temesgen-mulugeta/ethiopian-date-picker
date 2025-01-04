import React from 'react'

const EthiopianDayPicker = () => {
  return (
    <components.Month
      className={classNames[UI.Month]}
      style={styles?.[UI.Month]}
      key={displayIndex}
      displayIndex={displayIndex}
      calendarMonth={calendarMonth}
    >
      <components.MonthCaption
        className={classNames[UI.MonthCaption]}
        style={styles?.[UI.MonthCaption]}
        calendarMonth={calendarMonth}
        displayIndex={displayIndex}
      >
        {captionLayout?.startsWith("dropdown") ? (
          <components.DropdownNav
            className={classNames[UI.Dropdowns]}
            style={styles?.[UI.Dropdowns]}
          >
            {captionLayout === "dropdown" ||
            captionLayout === "dropdown-months" ? (
              <components.MonthsDropdown
                className={classNames[UI.MonthsDropdown]}
                aria-label={labelMonthDropdown()}
                classNames={classNames}
                components={components}
                disabled={Boolean(props.disableNavigation)}
                onChange={handleMonthChange(calendarMonth.date)}
                options={dropdownMonths}
                style={styles?.[UI.Dropdown]}
                value={dateLib.getMonth(calendarMonth.date)}
              />
            ) : (
              <span role="status" aria-live="polite">
                {formatMonthDropdown(calendarMonth.date, dateLib)}
              </span>
            )}
            {captionLayout === "dropdown" ||
            captionLayout === "dropdown-years" ? (
              <components.YearsDropdown
                className={classNames[UI.YearsDropdown]}
                aria-label={labelYearDropdown(dateLib.options)}
                classNames={classNames}
                components={components}
                disabled={Boolean(props.disableNavigation)}
                onChange={handleYearChange(calendarMonth.date)}
                options={dropdownYears}
                style={styles?.[UI.Dropdown]}
                value={dateLib.getYear(calendarMonth.date)}
              />
            ) : (
              <span role="status" aria-live="polite">
                {formatYearDropdown(calendarMonth.date, dateLib)}
              </span>
            )}
          </components.DropdownNav>
        ) : (
          <components.CaptionLabel
            className={classNames[UI.CaptionLabel]}
            role="status"
            aria-live="polite"
          >
            {formatCaption(calendarMonth.date, dateLib.options, dateLib)}
          </components.CaptionLabel>
        )}
      </components.MonthCaption>
      <components.MonthGrid
        role="grid"
        aria-multiselectable={mode === "multiple" || mode === "range"}
        aria-label={
          labelGrid(calendarMonth.date, dateLib.options, dateLib) || undefined
        }
        className={classNames[UI.MonthGrid]}
        style={styles?.[UI.MonthGrid]}
      >
        {!props.hideWeekdays && (
          <components.Weekdays
            className={classNames[UI.Weekdays]}
            style={styles?.[UI.Weekdays]}
          >
            {showWeekNumber && (
              <components.WeekNumberHeader
                aria-label={labelWeekNumberHeader(dateLib.options)}
                className={classNames[UI.WeekNumberHeader]}
                style={styles?.[UI.WeekNumberHeader]}
                scope="col"
              >
                {formatWeekNumberHeader()}
              </components.WeekNumberHeader>
            )}
            {weekdays.map((weekday, i) => (
              <components.Weekday
                aria-label={labelWeekday(weekday, dateLib.options, dateLib)}
                className={classNames[UI.Weekday]}
                key={i}
                style={styles?.[UI.Weekday]}
                scope="col"
              >
                {formatWeekdayName(weekday, dateLib.options, dateLib)}
              </components.Weekday>
            ))}
          </components.Weekdays>
        )}
        <components.Weeks
          className={classNames[UI.Weeks]}
          style={styles?.[UI.Weeks]}
        >
          {calendarMonth.weeks.map((week, weekIndex) => {
            return (
              <components.Week
                className={classNames[UI.Week]}
                key={week.weekNumber}
                style={styles?.[UI.Week]}
                week={week}
              >
                {showWeekNumber && (
                  <components.WeekNumber
                    week={week}
                    style={styles?.[UI.WeekNumber]}
                    aria-label={labelWeekNumber(week.weekNumber, {
                      locale,
                    })}
                    className={classNames[UI.WeekNumber]}
                    scope="row"
                    role="rowheader"
                  >
                    {formatWeekNumber(week.weekNumber)}
                  </components.WeekNumber>
                )}
                {week.days.map((day: CalendarDay) => {
                  const { date } = day;
                  const modifiers = getModifiers(day);

                  modifiers[DayFlag.focused] =
                    !modifiers.hidden && Boolean(focused?.isEqualTo(day));

                  modifiers[SelectionState.selected] =
                    !modifiers.disabled &&
                    (isSelected?.(date) || modifiers.selected);

                  if (isDateRange(selectedValue)) {
                    // add range modifiers
                    const { from, to } = selectedValue;
                    modifiers[SelectionState.range_start] = Boolean(
                      from && to && dateLib.isSameDay(date, from)
                    );
                    modifiers[SelectionState.range_end] = Boolean(
                      from && to && dateLib.isSameDay(date, to)
                    );
                    modifiers[SelectionState.range_middle] = rangeIncludesDate(
                      selectedValue,
                      date,
                      true,
                      dateLib
                    );
                  }

                  const style = getStyleForModifiers(
                    modifiers,
                    styles,
                    props.modifiersStyles
                  );

                  const className = getClassNamesForModifiers(
                    modifiers,
                    classNames,
                    props.modifiersClassNames
                  );

                  const ariaLabel =
                    !isInteractive && !modifiers.hidden
                      ? labelGridcell(date, modifiers, dateLib.options, dateLib)
                      : undefined;

                  return (
                    <components.Day
                      key={`${dateLib.format(
                        date,
                        "yyyy-MM-dd"
                      )}_${dateLib.format(day.displayMonth, "yyyy-MM")}`}
                      day={day}
                      modifiers={modifiers}
                      className={className.join(" ")}
                      style={style}
                      role="gridcell"
                      aria-selected={modifiers.selected || undefined}
                      aria-label={ariaLabel}
                      data-day={dateLib.format(date, "yyyy-MM-dd")}
                      data-month={
                        day.outside
                          ? dateLib.format(date, "yyyy-MM")
                          : undefined
                      }
                      data-selected={modifiers.selected || undefined}
                      data-disabled={modifiers.disabled || undefined}
                      data-hidden={modifiers.hidden || undefined}
                      data-outside={day.outside || undefined}
                      data-focused={modifiers.focused || undefined}
                      data-today={modifiers.today || undefined}
                    >
                      {!modifiers.hidden && isInteractive ? (
                        <components.DayButton
                          className={classNames[UI.DayButton]}
                          style={styles?.[UI.DayButton]}
                          type="button"
                          day={day}
                          modifiers={modifiers}
                          disabled={modifiers.disabled || undefined}
                          tabIndex={isFocusTarget(day) ? 0 : -1}
                          aria-label={labelDayButton(
                            date,
                            modifiers,
                            dateLib.options,
                            dateLib
                          )}
                          onClick={handleDayClick(day, modifiers)}
                          onBlur={handleDayBlur(day, modifiers)}
                          onFocus={handleDayFocus(day, modifiers)}
                          onKeyDown={handleDayKeyDown(day, modifiers)}
                          onMouseEnter={handleDayMouseEnter(day, modifiers)}
                          onMouseLeave={handleDayMouseLeave(day, modifiers)}
                        >
                          {formatDay(date, dateLib.options, dateLib)}
                        </components.DayButton>
                      ) : (
                        !modifiers.hidden &&
                        formatDay(day.date, dateLib.options, dateLib)
                      )}
                    </components.Day>
                  );
                })}
              </components.Week>
            );
          })}
        </components.Weeks>
      </components.MonthGrid>
    </components.Month>
  );
};

export default EthiopianDayPicker;
