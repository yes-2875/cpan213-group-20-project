import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TripCard({ title, location, date }) {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>⛺</Text>
            </View>

            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.location}>{location}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 14,
        marginBottom: 12,
        elevation: 2,
    },
    iconContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#E6EDDF",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        fontSize: 25,
    },
    details: {
        marginLeft: 14,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#24352B",
    },
    location: {
        fontSize: 13,
        color: "#68756B",
        marginTop: 4,
    },
    date: {
        fontSize: 12,
        color: "#8A968B",
        marginTop: 4,
    },
});