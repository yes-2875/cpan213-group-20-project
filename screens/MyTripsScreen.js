import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MyTripsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Trips</Text>
            <Text style={styles.subtitle}>
                View and manage your camping trips.
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
    subtitle: {
        fontSize: 16,
        marginTop: 10,
        color: "#24352B",
    },
});