import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function ExploreScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore Camping Locations</Text>

            <Text style={styles.subtitle}>
                Discover places for your next camping trip.
            </Text>

            <Button
                title="View Weather Details"
                color="#285943"
                onPress={() =>
                    navigation.navigate("Weather", {
                        locationName: "Algonquin Provincial Park",
                    })
                }
            />
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
        fontSize: 22,
        fontWeight: "bold",
        color: "#285943",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        marginVertical: 20,
        color: "#24352B",
        textAlign: "center",
    },
});