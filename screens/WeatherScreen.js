import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WeatherScreen({ route }) {
    const locationName = route.params?.locationName || "Selected Location";

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weather Details</Text>
            <Text style={styles.location}>{locationName}</Text>
            <Text style={styles.subtitle}>
                Weather forecast will appear here.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F7F2",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#285943",
    },
    location: {
        fontSize: 20,
        marginTop: 15,
        color: "#24352B",
    },
    subtitle: {
        fontSize: 16,
        marginTop: 10,
        color: "#666666",
    },
});