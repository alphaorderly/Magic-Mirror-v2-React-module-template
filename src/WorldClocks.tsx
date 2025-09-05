import { Dayjs } from "dayjs";
import React from "react";

type WorldClocksProps = {
    times: Dayjs[];
    tzNames: string[];
    primaryTime: Dayjs;
};

// A single secondary timezone row
const WorldClockRow: React.FC<{
    time: Dayjs;
    label: string;
    primaryTime: Dayjs;
}> = ({ time, label, primaryTime }) => {
    const offsetHours = time.utcOffset() / 60; // minutes -> hours
    const sign = offsetHours >= 0 ? "+" : "-";
    const offsetDisplay = `UTC${sign}${Math.abs(offsetHours).toString().padStart(2, "0")}`;

    const dayDiff = time.startOf("day").diff(primaryTime.startOf("day"), "day");
    const dayDiffDisplay =
        dayDiff === 0 ? "" : dayDiff > 0 ? `(+${dayDiff}d)` : `(${dayDiff}d)`;

    return (
        <div className="flex items-baseline justify-between py-1">
            <div className="flex flex-col">
                <span className="text-sm font-medium tracking-wide text-gray-400 uppercase">
                    {label}
                </span>
                <span className="text-xs text-gray-500 tabular-nums">
                    {offsetDisplay} {dayDiffDisplay}
                </span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-3xl font-light tabular-nums text-white">
                    {time.format("HH:mm")}
                </span>
                <span className="text-xs text-gray-500 tabular-nums">
                    {time.format("YYYY.MM.DD")}
                </span>
            </div>
        </div>
    );
};

const WorldClocks: React.FC<WorldClocksProps> = ({ times, tzNames, primaryTime }) => {
    if (!times.length) return null;

    return (
        <div className="mt-2 flex flex-col gap-2 w-full max-w-md">
            <div className="divide-y divide-gray-800/60">
                {times.map((t, i) => (
                    <WorldClockRow
                        key={tzNames[i] ?? i}
                        time={t}
                        label={tzNames[i] ?? "UNKNOWN"}
                        primaryTime={primaryTime}
                    />
                ))}
            </div>
        </div>
    );
};

export default WorldClocks;
