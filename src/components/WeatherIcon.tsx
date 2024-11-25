import {
    faBan,
    faBoltLightning,
    faCloudRain,
    faCloudShowersHeavy,
    faSmog,
    faSnowflake,
    faSun
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface WeatherIconProps {
    weatherCode: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({weatherCode}) => {
    return <FontAwesomeIcon icon={determineIcon(weatherCode)}/>;
}

const determineIcon = (weatherCode: number) => {
    switch (weatherCode) {
        case 0:
        case 1:
        case 2:
        case 3:
            return faSun;

        case 45:
        case 48:
            return faSmog;

        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            return faCloudRain;

        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return faSnowflake;

        case 80:
        case 81:
        case 82:
            return faCloudShowersHeavy;

        case 95:
        case 96:
        case 99:
            return faBoltLightning;

        default:
            return faBan;
    }
}

export default WeatherIcon;