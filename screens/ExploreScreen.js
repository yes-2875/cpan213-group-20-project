import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native";

const destinations = [
    {
        id: "1",
        name: "Algonquin Provincial Park",
        province: "Ontario, Canada",
        description: "Beautiful forests, lakes and wildlife.",
        emoji: "🌲",
        latitude: 45.8372,
        longitude: -78.3791,
        category: "Forest",
    },
    {
        id: "2",
        name: "Banff National Park",
        province: "Alberta, Canada",
        description: "Stunning mountains and turquoise lakes.",
        emoji: "🏔️",
        latitude: 51.4968,
        longitude: -115.9281,
        category: "Mountain",
    },
    {
        id: "3",
        name: "Bruce Peninsula National Park",
        province: "Ontario, Canada",
        description: "Clear water and beautiful hiking trails.",
        emoji: "🌊",
        latitude: 45.2245,
        longitude: -81.5269,
        category: "Water",
    },
    {
        id: "4",
        name: "Jasper National Park",
        province: "Alberta, Canada",
        description: "Explore wilderness and mountain scenery.",
        emoji: "⛺",
        latitude: 52.8734,
        longitude: -117.9543,
        category: "Mountain",
    },
];

export default function ExploreScreen({ navigation }) {
    const [search, setSearch] = useState("");

    const filteredDestinations = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(search.toLowerCase()) ||
        destination.province.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                {/* Introduction */}
                <Text style={styles.heading}>Find your next adventure</Text>

                <Text style={styles.subtitle}>
                    Discover beautiful places to camp and explore nature.
                </Text>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search locations or provinces..."
                        placeholderTextColor="#8A968B"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {/* Section heading */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Popular destinations</Text>
                    <Text style={styles.count}>
                        {filteredDestinations.length} places
                    </Text>
                </View>

                {/* Destination cards */}
                {filteredDestinations.length > 0 ? (
                    filteredDestinations.map((destination) => (
                        <Pressable
                            key={destination.id}
                            style={styles.card}
                            onPress={() =>
                                navigation.navigate("Weather", {
                                    locationName: destination.name,
                                    latitude: destination.latitude,
                                    longitude: destination.longitude,
                                })
                            }
                        >
                            <View style={styles.imagePlaceholder}>
                                <Text style={styles.destinationEmoji}>
                                    {destination.emoji}
                                </Text>
                                <Text style={styles.category}>
                                    {destination.category}
                                </Text>
                            </View>

                            <View style={styles.cardDetails}>
                                <Text style={styles.destinationName}>
                                    {destination.name}
                                </Text>

                                <Text style={styles.province}>
                                    📍 {destination.province}
                                </Text>

                                <Text style={styles.description}>
                                    {destination.description}
                                </Text>

                                <Text style={styles.viewDetails}>
                                    View destination and weather →
                                </Text>
                            </View>
                        </Pressable>
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyEmoji}>🔎</Text>
                        <Text style={styles.emptyTitle}>No destinations found</Text>
                        <Text style={styles.emptyText}>
                            Try searching for another location.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
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
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#24352B",
    },
    subtitle: {
        fontSize: 14,
        color: "#68756B",
        marginTop: 8,
        lineHeight: 21,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 14,
        marginTop: 22,
        marginBottom: 26,
        height: 52,
        elevation: 2,
    },
    searchIcon: {
        fontSize: 17,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: "#24352B",
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
    },
    count: {
        fontSize: 12,
        color: "#68756B",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 18,
        elevation: 2,
    },
    imagePlaceholder: {
        height: 125,
        backgroundColor: "#DCE8D8",
        justifyContent: "center",
        alignItems: "center",
    },
    destinationEmoji: {
        fontSize: 55,
    },
    category: {
        position: "absolute",
        bottom: 10,
        left: 12,
        backgroundColor: "#285943",
        color: "#FFFFFF",
        fontSize: 11,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        overflow: "hidden",
    },
    cardDetails: {
        padding: 15,
    },
    destinationName: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#24352B",
    },
    province: {
        fontSize: 13,
        color: "#68756B",
        marginTop: 7,
    },
    description: {
        fontSize: 13,
        color: "#68756B",
        marginTop: 9,
    },
    viewDetails: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#285943",
        marginTop: 14,
    },
    emptyContainer: {
        alignItems: "center",
        padding: 35,
    },
    emptyEmoji: {
        fontSize: 35,
    },
    emptyTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#24352B",
        marginTop: 12,
    },
    emptyText: {
        fontSize: 13,
        color: "#68756B",
        marginTop: 7,
        textAlign: "center",
    },
});