import { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Pressable,
    RefreshControl,
} from "react-native";
import { fetchWeatherForecast } from "../services/weatherApi";

import CurrentWeatherCard from "../components/CurrentWeatherCard";
import ForecastRow from "../components/ForecastRow";

export default function WeatherScreen({ route }) {
    const locationName = route.params?.locationName || "Selected Location";
    const province = route.params?.province;
    const latitude = route.params?.latitude;
    const longitude = route.params?.longitude;

    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const loadWeather = useCallback(async () => {
        setErrorMessage("");

        try {
            const result = await fetchWeatherForecast(latitude, longitude);
            setWeather(result);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }, [latitude, longitude]);

    useEffect(() => {
        let isActive = true;

        async function loadInitialWeather() {
            setIsLoading(true);
            await loadWeather();
            if (isActive) {
                setIsLoading(false);
            }
        }

        loadInitialWeather();

        return () => {
            isActive = false;
        };
    }, [loadWeather]);

    const handleRefresh = async() => {
        setIsRefreshing(true);
        await loadWeather();
        setIsRefreshing(false);
    }

    const handleRetry = async() => {
        setIsLoading(true);
        await loadWeather();
        setIsLoading(false);
    }

    // Loading state
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#285943" />
                <Text style={styles.statusText}>Loading weather for {locationName}...</Text>
            </View>
        );
    }

    // Error state (only when there is nothing to show yet)
    if (errorMessage && !weather) {
        return (
            <View style={styles.centered}>
                <Text style={styles.statusIcon}>⚠️</Text>
                <Text style={styles.statusTitle}>Couldn't load the weather</Text>
                <Text style={styles.statusText}>{errorMessage}</Text>
                <Pressable style={styles.retryButton} onPress={handleRetry}>
                    <Text style={styles.retryText}>Try again</Text>
                </Pressable>
            </View>
        );
    }

    const header = (
        <View>
            <Text style={styles.locationName}>{locationName}</Text>
            {province ? <Text style={styles.province}>{province}</Text> : null}

            {errorMessage ? (
                <View style={styles.inlineError}>
                    <Text style={styles.inlineErrorText}>
                        {errorMessage} Showing the last loaded forecast.
                    </Text>
                </View>
            ) : null}

            <CurrentWeatherCard
                current={weather.current}
                units={weather.units}
                timezone={weather.timezone}
            />

            <Text style={styles.sectionTitle}>{weather.daily.length}-Day Forecast</Text>
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.content}
            data={weather.daily}
            keyExtractor={(day) => day.date}
            renderItem={({ item, index }) => (
                <ForecastRow day={item} isToday={index === 0} units={weather.units} />
            )}
            ListHeaderComponent={header}
            // Empty state
            ListEmptyComponent={
                <Text style={styles.emptyText}>
                    No forecast is available for this location right now.
                </Text>
            }
            ListFooterComponent={
                <Text style={styles.footerText}>
                    Weather data by Open-Meteo.com · Pull down to refresh
                </Text>
            }
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    colors={["#285943"]}
                    tintColor="#285943"
                />
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7F2",
    },
    content: {
        padding: 16,
        paddingBottom: 30,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F7F2",
        padding: 24,
    },
    statusIcon: {
        fontSize: 40,
        marginBottom: 10,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#24352B",
        marginBottom: 6,
    },
    statusText: {
        fontSize: 14,
        color: "#666666",
        marginTop: 10,
        textAlign: "center",
    },
    retryButton: {
        backgroundColor: "#285943",
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 8,
        marginTop: 20,
    },
    retryText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold",
    },
    locationName: {
        fontSize: 23,
        fontWeight: "bold",
        color: "#285943",
    },
    province: {
        fontSize: 14,
        color: "#666666",
        marginTop: 4,
    },
    inlineError: {
        backgroundColor: "#FBEAEA",
        borderRadius: 8,
        padding: 12,
        marginTop: 14,
    },
    inlineErrorText: {
        color: "#8A1C1C",
        fontSize: 13,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#24352B",
        marginBottom: 6,
    },
    
    emptyText: {
        fontSize: 14,
        color: "#666666",
        marginTop: 15,
        textAlign: "center",
    },
    footerText: {
        fontSize: 12,
        color: "#888888",
        textAlign: "center",
        marginTop: 20,
    },
});
