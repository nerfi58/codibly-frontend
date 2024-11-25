import {FC, useEffect, useState} from "react";
import {Footer} from "flowbite-react";
import {Location, WeeklySummary} from "../types.ts";

interface SummaryFooterProps {
    location: Location;
    setLocation: (location: Location) => void;
}

const SummaryFooter: FC<SummaryFooterProps> = ({location}) => {

    const [weeklySummary, setWeeklySummary] = useState<WeeklySummary>({
        averagePressure: 0,
        averageSunshineDuration: 0,
        minTemperature: 0,
        maxTemperature: 0,
        weatherSummary: "",
    })

    useEffect(() => {
        fetch(`https://codibly-backend.onrender.com/weather/weekly-summary?lat=${location.lat}&lon=${location.lon}`)
            .then(response => response.json())
            .then(json => setWeeklySummary(json))
    }, [location]);

    return (
        <Footer container className="rounded-none bg-cyan-900 dark:bg-cyan-700 flex flex-col">
            <h1 className={"text-3xl font-bold text-gray-300 text-center"}>Weekly summary</h1>
            <h1 className="text-xl mt-6 text-gray-300 text-center">{weeklySummary.weatherSummary}</h1>
            <Footer.Divider className="border-gray-400 dark:border-gray-400"/>
            <div
                className="block flex-row m-auto w-full justify-between text-center md:flex text-gray-300 dark:text-gray-200">
                <div>
                    <p>Lowest temperature: {weeklySummary.minTemperature} &deg;C</p>
                </div>
                <div>
                    <p>Highest temperature: {weeklySummary.maxTemperature} &deg;C</p>
                </div>
                <div>
                    <p>Average pressure: {weeklySummary.averagePressure.toFixed(2)} hPa</p>
                </div>
                <div>
                    <p>Average sunshine duration: {weeklySummary.averageSunshineDuration.toFixed(2)} s</p>
                </div>
            </div>
        </Footer>
    )
};

export default SummaryFooter;