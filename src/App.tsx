import {DarkThemeToggle} from "flowbite-react";
import WeatherTable from "./components/WeatherTable.tsx";
import {useEffect, useState} from "react";
import {Location} from './types.ts'
import Map from "./components/Map.tsx";
import SummaryFooter from "./components/SummaryFooter.tsx";

function App() {

    const [location, setLocation] = useState<Location>({lat: 0, lon: 0});
    const [positionSuccess, setPositionSuccess] = useState<boolean>(false);

    useEffect(() => {
        async function getPosition(): Promise<void> {
            try {
                const position: GeolocationPosition = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                setLocation({lat: position.coords.latitude, lon: position.coords.longitude});
                console.log("Position success!");
                setPositionSuccess(true);
            } catch (error) {
                console.error(error);
                setPositionSuccess(false);
            }
        }

        getPosition();
    }, []);

    return (
        <>
            <div className="relative min-h-[100vh]">
                <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800 flex-col">
                    <DarkThemeToggle className="fixed right-2 top-2 z-10"/>
                    {positionSuccess ?
                        (<><WeatherTable location={location} setLocation={setLocation}/>
                            <Map location={location} setLocation={setLocation}/></>)
                        :
                        (<p className="text-gray-800 dark:text-gray-200 text-6xl">Failed to retrieve location</p>)
                    }
                </main>
                <SummaryFooter location={location} setLocation={setLocation}/>
            </div>
        </>
    );
}

export default App;
