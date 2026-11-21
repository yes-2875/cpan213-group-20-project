// Weather service for CampMate.
// All calls to the Open-Meteo API live here so the screens only deal with
// clean, ready-to-display data. Open-Meteo is free and needs no API key.
// Docs: https://open-meteo.com/en/docs

const BASE_URL = "https://api.open-meteo.com/v1/forecast";
const REQUEST_TIMEOUT_MS = 10000;

const CURRENT_FIELDS = [
    "temperature_2m",
    "apparent_temperature",
    "relative_humidity_2m",
    "precipitation",
    "weather_code",
    "wind_speed_10m",
    "is_day",
].join(",");

const DAILY_FIELDS = [
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
    "precipitation_probability_max",
    "wind_speed_10m_max",
].join(",");

// WMO weather interpretation codes used by Open-Meteo.
const WEATHER_CODES = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mainly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁️" },
    45: { label: "Fog", icon: "🌫️" },
    48: { label: "Rime fog", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    53: { label: "Drizzle", icon: "🌦️" },
    55: { label: "Dense drizzle", icon: "🌧️" },
    56: { label: "Freezing drizzle", icon: "🌧️" },
    57: { label: "Freezing drizzle", icon: "🌧️" },
    61: { label: "Light rain", icon: "🌦️" },
    63: { label: "Rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "🌧️" },
    66: { label: "Freezing rain", icon: "🌧️" },
    67: { label: "Heavy freezing rain", icon: "🌧️" },
    71: { label: "Light snow", icon: "🌨️" },
    73: { label: "Snow", icon: "🌨️" },
    75: { label: "Heavy snow", icon: "❄️" },
    77: { label: "Snow grains", icon: "🌨️" },
    80: { label: "Rain showers", icon: "🌦️" },
    81: { label: "Rain showers", icon: "🌧️" },
    82: { label: "Violent rain showers", icon: "⛈️" },
    85: { label: "Snow showers", icon: "🌨️" },
    86: { label: "Heavy snow showers", icon: "❄️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
    96: { label: "Thunderstorm with hail", icon: "⛈️" },
    97: { label: "Heavy thunderstorm", icon: "⛈️" },
    99: { label: "Thunderstorm with hail", icon: "⛈️" },
};

export function describeWeatherCode(code, isDay = true) {
    const match = WEATHER_CODES[code] || { label: "Unknown", icon: "🌡️" };

    // Show a moon instead of a sun for clear nights.
    if (!isDay && (code === 0 || code === 1)) {
        return { ...match, icon: "🌙" };
    }

    return match;
}

function isValidCoordinate(latitude, longitude) {
    return (
        typeof latitude === "number" &&
        typeof longitude === "number" &&
        latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180
    );
}

// Wraps fetch() with a timeout and turns every failure into an Error
// with a message that is safe to show to the user.
async function requestJson(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response;

    try {
        response = await fetch(url, { signal: controller.signal });
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("The weather service took too long to respond.");
        }
        throw new Error("Unable to reach the weather service. Check your internet connection.");
    } finally {
        clearTimeout(timeoutId);
    }

    let data;

    try {
        data = await response.json();
    } catch (error) {
        throw new Error("The weather service sent an unexpected response.");
    }

    // Open-Meteo returns { error: true, reason: "..." } with HTTP 400 on bad requests.
    if (!response.ok || data?.error) {
        console.warn("Open-Meteo error:", data?.reason || response.status);
        throw new Error("Weather data is unavailable right now. Please try again.");
    }

    return data;
}

// Current conditions + daily forecast for one location (WeatherScreen).
export async function fetchWeatherForecast(latitude, longitude, days = 7) {
    if (!isValidCoordinate(latitude, longitude)) {
        throw new Error("This destination has no valid coordinates.");
    }

    const url =
        `${BASE_URL}?latitude=${latitude}&longitude=${longitude}` +
        `&current=${CURRENT_FIELDS}` +
        `&daily=${DAILY_FIELDS}` +
        `&forecast_days=${days}` +
        `&timezone=auto`;

    const data = await requestJson(url);

    if (!data.current || !data.daily || !Array.isArray(data.daily.time)) {
        throw new Error("Weather data for this location is incomplete.");
    }

    const current = {
        temperature: data.current.temperature_2m,
        feelsLike: data.current.apparent_temperature,
        humidity: data.current.relative_humidity_2m,
        precipitation: data.current.precipitation,
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
        isDay: data.current.is_day === 1,
        time: data.current.time,
    };

    // Open-Meteo returns daily values as parallel arrays; turn them
    // into one object per day so they are easy to render in a list.
    const daily = data.daily.time.map((date, index) => ({
        date,
        weatherCode: data.daily.weather_code[index],
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
        precipitation: data.daily.precipitation_sum[index],
        precipitationChance: data.daily.precipitation_probability_max[index],
        maxWindSpeed: data.daily.wind_speed_10m_max[index],
    }));

    return {
        current,
        daily,
        timezone: data.timezone_abbreviation || data.timezone,
        units: {
            temperature: data.current_units?.temperature_2m || "°C",
            windSpeed: data.current_units?.wind_speed_10m || "km/h",
            precipitation: data.current_units?.precipitation || "mm",
        },
    };
}

// Current temperature + condition for several locations in ONE request
// (ExploreScreen). Returns an object keyed by each location's id.
export async function fetchCurrentWeatherForLocations(locations) {
    const validLocations = locations.filter((location) =>
        isValidCoordinate(location.latitude, location.longitude)
    );

    if (validLocations.length === 0) {
        return {};
    }

    const latitudes = validLocations.map((location) => location.latitude).join(",");
    const longitudes = validLocations.map((location) => location.longitude).join(",");

    const url =
        `${BASE_URL}?latitude=${latitudes}&longitude=${longitudes}` +
        `&current=temperature_2m,weather_code,is_day` +
        `&timezone=auto`;

    const data = await requestJson(url);

    // One location returns an object, several return an array.
    const results = Array.isArray(data) ? data : [data];
    const weatherById = {};

    validLocations.forEach((location, index) => {
        const current = results[index]?.current;

        if (current) {
            weatherById[location.id] = {
                temperature: current.temperature_2m,
                weatherCode: current.weather_code,
                isDay: current.is_day === 1,
            };
        }
    });

    return weatherById;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-11-20" -> { weekday: "Fri", shortDate: "Nov 20" }. Parsed as a local
// date so it does not shift a day because of timezone conversion.
export function formatForecastDate(isoDate) {
    const [year, month, day] = isoDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return {
        weekday: WEEKDAYS[date.getDay()],
        shortDate: `${MONTHS[date.getMonth()]} ${date.getDate()}`,
    };
}
