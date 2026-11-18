import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";

import Header from "../components/Header";

const trips = [
    {
        id: "1",
        title: "Weekend in Algonquin",
        location: "Algonquin Provincial Park, Ontario",
        dates: "June 12 – June 14, 2027",
        status: "Upcoming",
    },
    {
        id: "2",
        title: "Mountain Adventure",
        location: "Banff National Park, Alberta",
        dates: "July 20 – July 25, 2027",
        status: "Upcoming",
    },
    {
        id: "3",
        title: "Summer Camping",
        location: "Bruce Peninsula, Ontario",
        dates: "August 5 – August 8, 2026",
        status: "Past",
    },
];

export default function MyTripsScreen() {
    const [selectedTab, setSelectedTab] = useState("Upcoming");

    const filteredTrips = trips.filter(
        (trip) => trip.status === selectedTab
    );

    const handleAddTrip = () => {
        Alert.alert(
            "Plan a Trip",
            "The trip creation feature will be added soon!"
        );
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <Header
                title="My Trips"
                subtitle="All your camping adventures in one place."
            />

            <Text style={styles.totalText}>
                Total trips: {trips.length}
            </Text>

            <View style={styles.tabs}>
                <Pressable
                    onPress={() => setSelectedTab("Upcoming")}
                    style={styles.tab}
                >
                    <Text
                        style={[
                            styles.tabText,
                            selectedTab === "Upcoming" && styles.activeTab,
                        ]}
                    >
                        Upcoming
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => setSelectedTab("Past")}
                    style={styles.tab}
                >
                    <Text
                        style={[
                            styles.tabText,
                            selectedTab === "Past" && styles.activeTab,
                        ]}
                    >
                        Past trips
                    </Text>
                </Pressable>
            </View>

            <Text style={styles.sectionTitle}>
                {selectedTab === "Upcoming"
                    ? "Your next adventures"
                    : "Your previous adventures"}
            </Text>

            <Text style={styles.tripCount}>
                {filteredTrips.length} trips
            </Text>

            {filteredTrips.length > 0 ? (
                filteredTrips.map((trip) => (
                    <View key={trip.id} style={styles.trip}>
                        <View style={styles.tripDetails}>
                            <Text style={styles.tripTitle}>
                                {trip.title}
                            </Text>

                            <Text style={styles.tripInfo}>
                                {trip.location}
                            </Text>

                            <Text style={styles.tripInfo}>
                                {trip.dates}
                            </Text>

                            <Text style={styles.status}>
                                Status: {trip.status}
                            </Text>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.emptyText}>
                    No trips yet. Your camping adventures will appear here.
                </Text>
            )}

            <Pressable
                style={styles.addButton}
                onPress={handleAddTrip}
            >
                <Text style={styles.addButtonText}>
                    + Plan a Trip
                </Text>
            </Pressable>
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
    totalText: {
        fontSize: 15,
        color: "#285943",
        marginBottom: 20,
    },
    tabs: {
        flexDirection: "row",
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#CCCCCC",
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
    },
    tabText: {
        fontSize: 15,
        color: "#666666",
    },
    activeTab: {
        color: "#285943",
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#24352B",
    },
    tripCount: {
        fontSize: 13,
        color: "#666666",
        marginTop: 5,
        marginBottom: 10,
    },
    trip: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#D5DAD2",
    },
    tripDetails: {
        flex: 1,
    },
    tripTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#285943",
        marginBottom: 7,
    },
    tripInfo: {
        fontSize: 13,
        color: "#555555",
        marginBottom: 5,
    },
    status: {
        fontSize: 13,
        color: "#285943",
        marginTop: 3,
    },
    emptyText: {
        fontSize: 14,
        color: "#666666",
        marginTop: 15,
    },
    addButton: {
        backgroundColor: "#285943",
        padding: 12,
        alignItems: "center",
        borderRadius: 5,
        marginTop: 25,
        alignSelf: "flex-start",
    },
    addButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
    },
});