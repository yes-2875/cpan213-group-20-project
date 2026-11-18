import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from "react-native";

import Header from "../components/Header";

const initialItems = [
    { id: "1", name: "Tent", category: "Essentials", packed: true },
    { id: "2", name: "Sleeping bag", category: "Essentials", packed: false },
    { id: "3", name: "Flashlight", category: "Essentials", packed: false },
    { id: "4", name: "Hiking boots", category: "Clothing", packed: true },
    { id: "5", name: "Warm jacket", category: "Clothing", packed: false },
    { id: "6", name: "Water bottle", category: "Food & Drinks", packed: false },
    { id: "7", name: "Snacks", category: "Food & Drinks", packed: false },
];

const categories = ["Essentials", "Clothing", "Food & Drinks"];

export default function PackingScreen() {
    const [items, setItems] = useState(initialItems);
    const [newItem, setNewItem] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Essentials");

    const toggleItem = (id) => {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id
                    ? { ...item, packed: !item.packed }
                    : item
            )
        );
    };

    const addItem = () => {
        if (newItem.trim() === "") {
            Alert.alert("Missing item", "Please enter an item name.");
            return;
        }

        const item = {
            id: Date.now().toString(),
            name: newItem.trim(),
            category: selectedCategory,
            packed: false,
        };

        setItems((currentItems) => [...currentItems, item]);
        setNewItem("");
    };

    const deleteItem = (id) => {
        setItems((currentItems) =>
            currentItems.filter((item) => item.id !== id)
        );
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
        >
            <Header
                title="Packing Checklist"
                subtitle="Make sure you have everything for your trip."
            />

            <Text style={styles.sectionTitle}>Add a new item</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter item name..."
                value={newItem}
                onChangeText={setNewItem}
            />

            <Text style={styles.categoryLabel}>Category:</Text>

            <View style={styles.categorySelector}>
                {categories.map((category) => (
                    <Pressable
                        key={category}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text
                            style={[
                                styles.categoryOption,
                                selectedCategory === category &&
                                styles.selectedCategory,
                            ]}
                        >
                            {category}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Pressable style={styles.addButton} onPress={addItem}>
                <Text style={styles.addButtonText}>+ Add item</Text>
            </Pressable>

            <View style={styles.divider} />

            {categories.map((category) => {
                const categoryItems = items.filter(
                    (item) => item.category === category
                );

                return (
                    <View key={category} style={styles.categorySection}>
                        <Text style={styles.sectionTitle}>
                            {category}
                        </Text>

                        {categoryItems.length > 0 ? (
                            categoryItems.map((item) => (
                                <View key={item.id} style={styles.itemRow}>
                                    <Pressable
                                        style={styles.itemMain}
                                        onPress={() => toggleItem(item.id)}
                                    >
                                        <Text style={styles.checkbox}>
                                            {item.packed ? "☑" : "☐"}
                                        </Text>

                                        <Text
                                            style={[
                                                styles.itemName,
                                                item.packed && styles.packedItem,
                                            ]}
                                        >
                                            {item.name}
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => deleteItem(item.id)}
                                    >
                                        <Text style={styles.deleteText}>
                                            Delete
                                        </Text>
                                    </Pressable>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.emptyText}>
                                No items yet.
                            </Text>
                        )}
                    </View>
                );
            })}
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
        paddingBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#285943",
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#CCCCCC",
        padding: 11,
        borderRadius: 5,
        fontSize: 14,
    },
    categoryLabel: {
        fontSize: 14,
        color: "#555555",
        marginTop: 15,
        marginBottom: 8,
    },
    categorySelector: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    categoryOption: {
        color: "#666666",
        paddingVertical: 7,
        fontSize: 13,
    },
    selectedCategory: {
        color: "#285943",
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    addButton: {
        backgroundColor: "#285943",
        padding: 11,
        borderRadius: 5,
        alignItems: "center",
        alignSelf: "flex-start",
        marginTop: 15,
    },
    addButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#D5DAD2",
        marginVertical: 25,
    },
    categorySection: {
        marginBottom: 25,
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D5DAD2",
    },
    itemMain: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    checkbox: {
        fontSize: 22,
        color: "#285943",
        marginRight: 10,
    },
    itemName: {
        fontSize: 14,
        color: "#24352B",
    },
    packedItem: {
        textDecorationLine: "line-through",
        color: "#929C92",
    },
    deleteText: {
        color: "#A66B61",
        fontSize: 12,
        padding: 6,
    },
    emptyText: {
        fontSize: 13,
        color: "#777777",
        marginTop: 5,
    },
});