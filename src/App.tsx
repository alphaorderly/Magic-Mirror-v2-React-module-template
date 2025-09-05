import React from "react";
import { ensureConfig } from "./config";
import useTime from "./hooks/useTime";
import MainClock from "./MainClock";
import WorldClocks from "./WorldClocks";

export default function App(): JSX.Element {
    const config = ensureConfig();

    const { currentTime, otherTimes } = useTime({
        primaryTz: config?.primary ?? "UTC",
        otherTzs: config?.others ?? [],
    });

    return (
        <div className="flex flex-col items-start p-4">
            <MainClock time={currentTime} />
            <WorldClocks
                times={otherTimes}
                tzNames={config?.others ?? []}
                primaryTime={currentTime}
            />
        </div>
    );
}
