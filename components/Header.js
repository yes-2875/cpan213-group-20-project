import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title, subtitle }) {
    return (
        <View style={styles.container}>
            <Text style={styles.brand}>🌲 CampMate</Text>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? (
                <Text style={styles.subtitle}>{subtitle}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    brand: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#285943",
        marginBottom: 12,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#24352B",
    },
    subtitle: {
        fontSize: 15,
        color: "#68756B",
        marginTop: 6,
    },
});