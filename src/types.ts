export interface Location {
    lat: number;
    lon: number;
}

export interface Weather {
    date: Date;
    weatherCode: number;
    minTemperature: number;
    maxTemperature: number;
    energy: number;
}

export interface WeeklySummary {
    averagePressure: number;
    averageSunshineDuration: number;
    minTemperature: number;
    maxTemperature: number;
    weatherSummary: string;
}