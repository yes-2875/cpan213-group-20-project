import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function LocationCard({
    name,
    province,
    description,
    onPress,
}) {
    return (
        <Pressable style={styles.card} onPress={onPress}>
            <View style={styles.imagePlaceholder}>
                <Text style={styles.emoji}>🏕️</Text>
            </View>

            <View style={styles.details}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.province}>{province}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.link}>View destination →</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        marginRight: 14,
        width: 235,
        overflow: "hidden",
        elevation: 2,
    },
    imagePlaceholder: {
        height: 105,
        backgroundColor: "#DCE8D8",
        justifyContent: "center",
        alignItems: "center",
    },
    emoji: {
        fontSize: 45,
    },
    details: {
        padding: 14,
    },
    name: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#24352B",
    },
    province: {
        fontSize: 13,
        color: "#738174",
        marginTop: 4,
    },
    description: {
        fontSize: 13,
        color: "#68756B",
        marginTop: 8,
    },
    link: {
        color: "#285943",
        fontWeight: "bold",
        marginTop: 12,
    },
});