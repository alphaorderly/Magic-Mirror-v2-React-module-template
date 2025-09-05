import { Dayjs } from "dayjs";

type MainClockProps = {
    time: Dayjs;
};

const MainClock = ({ time }: MainClockProps) => {
    const hour = time.hour();
    const minute = time.minute();
    const second = time.second();

    const years = time.year();
    const month = time.month() + 1;
    const date = time.date();

    const weekday = time.format("dddd");

    return (
        <div className="flex flex-col items-start self-start">
            {/** TIME */}
            <div className="flex items-baseline gap-1 text-8xl font-extralight tracking-tight">
                <span className="text-white">{hour.toString().padStart(2, "0")}</span>
                <span className="text-6xl md:text-7xl text-gray-400">:</span>
                <span className="text-white">{minute.toString().padStart(2, "0")}</span>
                <span className="text-4xl md:text-5xl text-gray-500 ml-2">
                    {second.toString().padStart(2, "0")}
                </span>
            </div>

            {/** DATE + WEEKDAY (inline) */}
            <div className="flex items-baseline gap-4">
                <div className="text-2xl md:text-3xl font-light text-gray-300 tracking-wide tabular-nums">
                    {years}.{month.toString().padStart(2, "0")}.
                    {date.toString().padStart(2, "0")}
                </div>
                <div className="text-lg md:text-xl font-medium text-gray-400 uppercase tracking-widest">
                    {weekday}
                </div>
            </div>
        </div>
    );
};

export default MainClock;
