import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import Header from "../components/Header";
import LocationCard from "../components/LocationCard";
import TripCard from "../components/TripCard";

export default function HomeScreen({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Header
                    title="Welcome to CampMate!"
                    subtitle="Plan your next camping adventure."
                />

                <Text style={styles.welcomeTitle}>Explore Nature</Text>
                <Text style={styles.welcomeText}>
                    Find camping locations and prepare for your next trip.
                </Text>

                <Pressable
                    onPress={() => navigation.navigate("Explore")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Explore Locations</Text>
                </Pressable>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured Locations</Text>
                    <Pressable onPress={() => navigation.navigate("Explore")}>
                        <Text style={styles.seeAll}>See all</Text>
                    </Pressable>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <LocationCard
                        name="Algonquin Park"
                        province="Ontario, Canada"
                        description="Beautiful forests and lakes."
                        onPress={() =>
                            navigation.navigate("Weather", {
                                locationName: "Algonquin Provincial Park",
                            })
                        }
                    />

                    <LocationCard
                        name="Banff National Park"
                        province="Alberta, Canada"
                        description="Enjoy mountain views."
                        onPress={() =>
                            navigation.navigate("Weather", {
                                locationName: "Banff National Park",
                            })
                        }
                    />
                </ScrollView>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Upcoming Trips</Text>
                    <Pressable onPress={() => navigation.navigate("My Trips")}>
                        <Text style={styles.seeAll}>See all</Text>
                    </Pressable>
                </View>

                <TripCard
                    title="Weekend Camping"
                    location="Algonquin Park"
                    date="Plan your next trip"
                />

                <TripCard
                    title="Mountain Adventure"
                    location="Banff National Park"
                    date="Start planning"
                />

                <Text style={styles.bottomText}>
                    🌿 Enjoy your next adventure with CampMate!
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7F2",
    },
    content: {
        padding: 16,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#285943",
        marginTop: 10,
    },
    welcomeText: {
        fontSize: 14,
        color: "#555555",
        marginTop: 6,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#285943",
        padding: 10,
        borderRadius: 5,
        alignSelf: "flex-start",
        marginBottom: 25,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#24352B",
    },
    seeAll: {
        color: "#285943",
        fontSize: 13,
    },
    bottomText: {
        textAlign: "center",
        color: "#68756B",
        fontSize: 13,
        marginTop: 20,
        marginBottom: 15,
    },
});