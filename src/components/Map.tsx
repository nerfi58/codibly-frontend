import {useState} from "react";
import {Location} from "../types.ts";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {Button} from "flowbite-react";

interface MapProps {
    location: Location;
    setLocation: (location: Location) => void;
}

const Map: React.FC<MapProps> = ({location, setLocation}) => {
    const [marker, setMarker] = useState<Location>({lat: location.lat, lon: location.lon});

    L.Marker.prototype.options.icon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [24, 36],
        iconAnchor: [12, 36]
    });

    const LocationChanger: React.FC = () => {
        useMapEvents({
            click(event) {
                if (event.latlng.lng < -180) {
                    setMarker({lat: event.latlng.lat, lon: -180})
                } else if (event.latlng.lng > 180) {
                    setMarker({lat: event.latlng.lat, lon: 180})
                } else {
                    setMarker({lat: event.latlng.lat, lon: event.latlng.lng})
                }
            },
        });
        return null;
    };

    return (
        <div className="max-w-full w-[48rem] mx-auto min-h-[24rem]">
            <MapContainer center={[location.lat, location.lon]} zoom={7}
                          className="block w-screen max-w-full min-h-[24rem] m-auto mt-16">
                <LocationChanger/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    noWrap={true}/>
                <Marker position={[marker.lat, marker.lon]}>
                    <Popup>Latitude: {marker.lat} <br/> Longitude: {marker.lon}</Popup>
                </Marker>
            </MapContainer>
            <Button pill className={"mx-auto w-32 mt-12 mb-24"}
                    onClick={() => setLocation({lat: marker.lat, lon: marker.lon})}>Update</Button>
        </div>
    )
}

export default Map;