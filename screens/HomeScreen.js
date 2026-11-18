import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import Header from "../components/Header";
import LocationCard from "../components/LocationCard";
import TripCard from "../components/TripCard";

export default function HomeScreen({ navigation }) {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <Header
                title="Your next adventure awaits!"
                subtitle="Plan your escape into nature."
            />

            {/* Welcome section */}
            <View style={styles.welcomeCard}>
                <Text style={styles.welcomeTitle}>Explore the outdoors 🌲</Text>
                <Text style={styles.welcomeText}>
                    Find beautiful camping destinations and prepare
                    for your next adventure.
                </Text>

                <Pressable
                    style={styles.exploreButton}
                    onPress={() => navigation.navigate("Explore")}
                >
                    <Text style={styles.buttonText}>Explore locations</Text>
                </Pressable>
            </View>
            {/* Featured destinations */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    Featured destinations
                </Text>

                <Pressable onPress={() => navigation.navigate("Explore")}>
                    <Text style={styles.seeAll}>See all</Text>
                </Pressable>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
            >
                <LocationCard
                    name="Algonquin Park"
                    province="Ontario, Canada"
                    description="Explore beautiful forests and lakes."
                    onPress={() =>
                        navigation.navigate("Weather", {
                            locationName: "Algonquin Provincial Park",
                        })
                    }
                />

                <LocationCard
                    name="Banff National Park"
                    province="Alberta, Canada"
                    description="Enjoy incredible mountain views."
                    onPress={() =>
                        navigation.navigate("Weather", {
                            locationName: "Banff National Park",
                        })
                    }
                />
            </ScrollView>

            {/* Upcoming trips */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming trips</Text>

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

            <View style={styles.bottomMessage}>
                <Text style={styles.bottomText}>
                    🌿 Adventure starts with CampMate.
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
        padding: 20,
        paddingBottom: 30,
    },
    welcomeCard: {
        backgroundColor: "#285943",
        padding: 22,
        borderRadius: 18,
        marginBottom: 28,
    },
    welcomeTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    welcomeText: {
        fontSize: 14,
        color: "#E5EEE6",
        lineHeight: 21,
        marginTop: 10,
    },
    exploreButton: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 10,
        alignSelf: "flex-start",
        marginTop: 18,
    },
    buttonText: {
        color: "#285943",
        fontWeight: "bold",
        fontSize: 14,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#24352B",
    },
    seeAll: {
        color: "#285943",
        fontWeight: "bold",
        fontSize: 13,
    },
    horizontalList: {
        marginBottom: 28,
    },
    bottomMessage: {
        alignItems: "center",
        marginTop: 15,
    },
    bottomText: {
        color: "#68756B",
        fontSize: 13,
    },
});