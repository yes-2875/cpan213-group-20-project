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
        emoji: "🌲",
    },
    {
        id: "2",
        title: "Mountain Adventure",
        location: "Banff National Park, Alberta",
        dates: "July 20 – July 25, 2027",
        status: "Upcoming",
        emoji: "🏔️",
    },
    {
        id: "3",
        title: "Summer Camping",
        location: "Bruce Peninsula, Ontario",
        dates: "August 5 – August 8, 2026",
        status: "Past",
        emoji: "🏕️",
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
            showsVerticalScrollIndicator={false}
        >
            <Header
                title="My Trips"
                subtitle="All your camping adventures in one place."
            />
            <View style={styles.summaryCard}>
                <Text style={styles.summaryNumber}>{trips.length}</Text>
                <Text style={styles.summaryLabel}>Total adventures planned</Text>
                <Text style={styles.summaryEmoji}>⛺</Text>
            </View>

            <View style={styles.tabContainer}>
                <Pressable
                    style={[
                        styles.tab,
                        selectedTab === "Upcoming" && styles.activeTab,
                    ]}
                    onPress={() => setSelectedTab("Upcoming")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            selectedTab === "Upcoming" && styles.activeTabText,
                        ]}
                    >
                        Upcoming
                    </Text>
                </Pressable>

                <Pressable
                    style={[
                        styles.tab,
                        selectedTab === "Past" && styles.activeTab,
                    ]}
                    onPress={() => setSelectedTab("Past")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            selectedTab === "Past" && styles.activeTabText,
                        ]}
                    >
                        Past trips
                    </Text>
                </Pressable>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    {selectedTab === "Upcoming"
                        ? "Your next adventures"
                        : "Your previous adventures"}
                </Text>
                <Text style={styles.tripCount}>
                    {filteredTrips.length} trips
                </Text>
            </View>

            {filteredTrips.length > 0 ? (
                filteredTrips.map((trip) => (
                    <View key={trip.id} style={styles.tripCard}>
                        <View style={styles.tripImage}>
                            <Text style={styles.tripEmoji}>{trip.emoji}</Text>
                        </View>

                        <View style={styles.tripDetails}>
                            <Text style={styles.tripTitle}>{trip.title}</Text>

                            <Text style={styles.tripLocation}>
                                📍 {trip.location}
                            </Text>

                            <Text style={styles.tripDate}>
                                📅 {trip.dates}
                            </Text>

                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>
                                    {trip.status}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyEmoji}>🏕️</Text>
                    <Text style={styles.emptyTitle}>No trips yet</Text>
                    <Text style={styles.emptyText}>
                        Your camping adventures will appear here.
                    </Text>
                </View>
            )}

            <Pressable
                style={styles.addButton}
                onPress={handleAddTrip}
            >
                <Text style={styles.addButtonText}>＋ Plan a Trip</Text>
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
        padding: 20,
        paddingBottom: 35,
    },
    summaryCard: {
        backgroundColor: "#285943",
        borderRadius: 18,
        padding: 20,
        marginBottom: 25,
    },
    summaryNumber: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    summaryLabel: {
        fontSize: 14,
        color: "#E4EDE4",
        marginTop: 4,
    },
    summaryEmoji: {
        position: "absolute",
        right: 20,
        top: 20,
        fontSize: 42,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#E8EDE5",
        borderRadius: 12,
        padding: 4,
        marginBottom: 25,
    },
    tab: {
        flex: 1,
        paddingVertical: 11,
        alignItems: "center",
        borderRadius: 9,
    },
    activeTab: {
        backgroundColor: "#FFFFFF",
        elevation: 2,
    },
    tabText: {
        color: "#68756B",
        fontWeight: "600",
    },
    activeTabText: {
        color: "#285943",
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#24352B",
        flex: 1,
    },
    tripCount: {
        color: "#68756B",
        fontSize: 13,
    },
    tripCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        marginBottom: 15,
        padding: 14,
        flexDirection: "row",
        elevation: 2,
    },
    tripImage: {
        width: 85,
        height: 105,
        backgroundColor: "#DCE8D8",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    tripEmoji: {
        fontSize: 38,
    },
    tripDetails: {
        flex: 1,
        marginLeft: 13,
    },
    tripTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#24352B",
        marginBottom: 7,
    },
    tripLocation: {
        fontSize: 12,
        color: "#68756B",
        marginBottom: 6,
    },
    tripDate: {
        fontSize: 12,
        color: "#68756B",
        marginBottom: 9,
    },
    statusBadge: {
        backgroundColor: "#E5EFE3",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    statusText: {
        color: "#285943",
        fontSize: 11,
        fontWeight: "bold",
    },
    emptyContainer: {
        alignItems: "center",
        padding: 35,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
    },
    emptyEmoji: {
        fontSize: 45,
        marginBottom: 12,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#24352B",
    },
    emptyText: {
        fontSize: 13,
        color: "#68756B",
        marginTop: 7,
        textAlign: "center",
    },
    addButton: {
        backgroundColor: "#285943",
        padding: 16,
        borderRadius: 13,
        alignItems: "center",
        marginTop: 15,
    },
    addButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});