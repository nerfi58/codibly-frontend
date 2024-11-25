import {FC, useEffect, useState} from "react";
import {Table} from "flowbite-react";
import {Location, Weather} from "../types.ts";
import WeatherIcon from "./WeatherIcon.tsx";

interface WeatherTableProps {
    location: Location;
    setLocation: (location: Location) => void;
}

const WeatherTable: FC<WeatherTableProps> = ({location}) => {
    const [weather, setWeather] = useState<Weather[]>([{
        date: new Date(),
        weatherCode: 0,
        minTemperature: 0,
        maxTemperature: 0,
        energy: 0,
    }]);

    useEffect(() => {
        fetch(`https://codibly-backend.onrender.com/weather?lat=${location.lat}&lon=${location.lon}`)
            .then(response => response.json())
            .then(json => setWeather(json))
    }, [location]);

    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day >= 10 ? day : `0${day}`}/${month >= 10 ? month : `0${month}`}/${date.getFullYear()}`;
    }

    const tableData = weather.map((item: Weather, index: number) => (
        <Table.Row key={index} className={"dark:text-gray-300"}>
            <Table.Cell>{formatDate(new Date(item.date))}</Table.Cell>
            <Table.Cell><WeatherIcon weatherCode={item.weatherCode}/></Table.Cell>
            <Table.Cell>{item.minTemperature} &deg;C</Table.Cell>
            <Table.Cell>{item.maxTemperature} &deg;C</Table.Cell>
            <Table.Cell>{item.energy.toFixed(2) + " kWh"}</Table.Cell>
        </Table.Row>
    ));

    return (
        <div className={"w-4/6 overflow-auto mt-6"}>
            <Table striped className={"text-base"}>
                <Table.Head className={"text-base"}>
                    <Table.HeadCell className={"dark:text-gray-200"}>Date</Table.HeadCell>
                    <Table.HeadCell className={"dark:text-gray-200"}>Weather</Table.HeadCell>
                    <Table.HeadCell className={"dark:text-gray-200"}>Lowest temperature</Table.HeadCell>
                    <Table.HeadCell className={"dark:text-gray-200"}>Highest temperature</Table.HeadCell>
                    <Table.HeadCell className={"dark:text-gray-200"}>Estimated energy</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tableData}
                </Table.Body>
            </Table>
        </div>
    )
}

export default WeatherTable;