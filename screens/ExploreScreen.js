import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native";

const destinations = [
    {
        id: "1",
        name: "Algonquin Provincial Park",
        province: "Ontario, Canada",
        description: "Beautiful forests, lakes and wildlife.",
        latitude: 45.8372,
        longitude: -78.3791,
        category: "Forest",
    },
    {
        id: "2",
        name: "Banff National Park",
        province: "Alberta, Canada",
        description: "Stunning mountains and turquoise lakes.",
        latitude: 51.4968,
        longitude: -115.9281,
        category: "Mountain",
    },
    {
        id: "3",
        name: "Bruce Peninsula National Park",
        province: "Ontario, Canada",
        description: "Clear water and beautiful hiking trails.",
        latitude: 45.2245,
        longitude: -81.5269,
        category: "Water",
    },
    {
        id: "4",
        name: "Jasper National Park",
        province: "Alberta, Canada",
        description: "Explore wilderness and mountain scenery.",
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
                <Text style={styles.heading}>Explore Locations</Text>

                <Text style={styles.subtitle}>
                    Find a place for your next camping trip.
                </Text>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name or province..."
                    value={search}
                    onChangeText={setSearch}
                />

                <Text style={styles.sectionTitle}>
                    Popular Destinations ({filteredDestinations.length})
                </Text>

                {filteredDestinations.length > 0 ? (
                    filteredDestinations.map((destination) => (
                        <Pressable
                            key={destination.id}
                            style={styles.destination}
                            onPress={() =>
                                navigation.navigate("Weather", {
                                    locationName: destination.name,
                                    latitude: destination.latitude,
                                    longitude: destination.longitude,
                                })
                            }
                        >
                            <View style={styles.destinationInfo}>
                                <Text style={styles.destinationName}>
                                    {destination.name}
                                </Text>

                                <Text style={styles.province}>
                                    {destination.province}
                                </Text>

                                <Text style={styles.description}>
                                    {destination.description}
                                </Text>

                                <Text style={styles.viewDetails}>
                                    View weather →
                                </Text>
                            </View>
                        </Pressable>
                    ))
                ) : (
                    <Text style={styles.emptyText}>
                        No destinations found. Try another search.
                    </Text>
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
        padding: 16,
        paddingBottom: 25,
    },
    heading: {
        fontSize: 23,
        fontWeight: "bold",
        color: "#285943",
    },
    subtitle: {
        fontSize: 14,
        color: "#666666",
        marginTop: 6,
        marginBottom: 20,
    },
    searchInput: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 5,
        padding: 12,
        fontSize: 14,
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#24352B",
        marginBottom: 10,
    },
    destination: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#D5DAD2",
    },
    destinationInfo: {
        flex: 1,
    },
    destinationName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#285943",
    },
    province: {
        fontSize: 13,
        color: "#666666",
        marginTop: 4,
    },
    description: {
        fontSize: 13,
        color: "#444444",
        marginTop: 6,
    },
    viewDetails: {
        fontSize: 13,
        color: "#285943",
        marginTop: 8,
    },
    emptyText: {
        fontSize: 14,
        color: "#666666",
        marginTop: 15,
    },
});