import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";

dayjs.extend(utc);
dayjs.extend(tz);

type UseTimeProps = {
  primaryTz: string;
  otherTzs: string[];
};

/**
 * A custom hook to manage and provide the current time ( usually own countries' timezone ) and list of other timezones ( usually friends' countries' timezones ).
 *
 * primary tz updates every second, while other timezones update every minute.
 *
 * utilize dayjs
 *
 * @returns An object containing the current time and an array of other timezones.
 */
const useTime = ({ primaryTz, otherTzs }: UseTimeProps) => {
  const [currentTime, setCurrentTime] = useState(dayjs().tz(primaryTz));
  const [otherTimes, setOtherTimes] = useState(otherTzs.map((tz) => dayjs().tz(tz)));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().tz(primaryTz));
    }, 1000);

    return () => clearInterval(interval);
  }, [primaryTz]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOtherTimes(otherTzs.map((tz) => dayjs().tz(tz)));
    }, 60000);

    return () => clearInterval(interval);
  }, [otherTzs]);

  return {
    currentTime,
    otherTimes,
  };
};

export default useTime;
