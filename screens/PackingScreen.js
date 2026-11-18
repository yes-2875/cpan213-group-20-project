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

    const packedCount = items.filter((item) => item.packed).length;
    const progress =
        items.length === 0 ? 0 : packedCount / items.length;

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
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Header
                title="Packing Checklist"
                subtitle="Everything you need for your next adventure."
            />

            <View style={styles.progressCard}>
                <View style={styles.progressHeader}>
                    <View>
                        <Text style={styles.progressTitle}>Your progress</Text>
                        <Text style={styles.progressSubtitle}>
                            {packedCount} of {items.length} items packed
                        </Text>
                    </View>

                    <Text style={styles.progressPercentage}>
                        {Math.round(progress * 100)}%
                    </Text>
                </View>

                <View style={styles.progressBackground}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${progress * 100}%` },
                        ]}
                    />
                </View>

                <Text style={styles.progressMessage}>
                    {progress === 1
                        ? "You're all packed. Ready to go! 🎉"
                        : "Keep going! You're getting ready for your trip."}
                </Text>
            </View>

            <Text style={styles.sectionTitle}>Add a new item</Text>

            <View style={styles.addCard}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter item name..."
                    placeholderTextColor="#929C92"
                    value={newItem}
                    onChangeText={setNewItem}
                />

                <Text style={styles.categoryLabel}>Choose a category</Text>

                <View style={styles.categorySelector}>
                    {categories.map((category) => (
                        <Pressable
                            key={category}
                            style={[
                                styles.categoryOption,
                                selectedCategory === category &&
                                styles.selectedCategory,
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text
                                style={[
                                    styles.categoryOptionText,
                                    selectedCategory === category &&
                                    styles.selectedCategoryText,
                                ]}
                            >
                                {category}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <Pressable style={styles.addButton} onPress={addItem}>
                    <Text style={styles.addButtonText}>＋ Add item</Text>
                </Pressable>
            </View>

            {categories.map((category) => {
                const categoryItems = items.filter(
                    (item) => item.category === category
                );

                return (
                    <View key={category} style={styles.categorySection}>
                        <View style={styles.categoryHeader}>
                            <Text style={styles.sectionTitle}>{category}</Text>
                            <Text style={styles.itemCount}>
                                {categoryItems.filter((item) => item.packed).length}/
                                {categoryItems.length} packed
                            </Text>
                        </View>

                        <View style={styles.listCard}>
                            {categoryItems.length > 0 ? (
                                categoryItems.map((item) => (
                                    <View key={item.id} style={styles.itemRow}>
                                        <Pressable
                                            style={styles.itemMain}
                                            onPress={() => toggleItem(item.id)}
                                        >
                                            <View
                                                style={[
                                                    styles.checkbox,
                                                    item.packed && styles.checkedBox,
                                                ]}
                                            >
                                                {item.packed && (
                                                    <Text style={styles.checkmark}>✓</Text>
                                                )}
                                            </View>

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
                                            style={styles.deleteButton}
                                        >
                                            <Text style={styles.deleteText}>✕</Text>
                                        </Pressable>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.emptyText}>
                                    No items in this category yet.
                                </Text>
                            )}
                        </View>
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
        padding: 20,
        paddingBottom: 35,
    },
    progressCard: {
        backgroundColor: "#285943",
        borderRadius: 18,
        padding: 20,
        marginBottom: 25,
    },
    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    progressTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    progressSubtitle: {
        fontSize: 13,
        color: "#E4EDE4",
        marginTop: 5,
    },
    progressPercentage: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    progressBackground: {
        height: 9,
        backgroundColor: "#547765",
        borderRadius: 10,
        marginTop: 18,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#C5D8A4",
        borderRadius: 10,
    },
    progressMessage: {
        color: "#E4EDE4",
        fontSize: 12,
        marginTop: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#24352B",
    },
    addCard: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 16,
        marginTop: 12,
        marginBottom: 25,
        elevation: 2,
    },
    input: {
        backgroundColor: "#F5F7F2",
        borderRadius: 10,
        padding: 13,
        fontSize: 14,
        color: "#24352B",
    },
    categoryLabel: {
        color: "#68756B",
        fontSize: 13,
        marginTop: 15,
        marginBottom: 10,
    },
    categorySelector: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    categoryOption: {
        paddingHorizontal: 11,
        paddingVertical: 9,
        borderRadius: 9,
        backgroundColor: "#F0F3ED",
    },
    selectedCategory: {
        backgroundColor: "#DCE8D8",
        borderWidth: 1,
        borderColor: "#285943",
    },
    categoryOptionText: {
        fontSize: 12,
        color: "#68756B",
    },
    selectedCategoryText: {
        color: "#285943",
        fontWeight: "bold",
    },
    addButton: {
        backgroundColor: "#285943",
        padding: 13,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 15,
    },
    addButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 14,
    },
    categorySection: {
        marginBottom: 23,
    },
    categoryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    itemCount: {
        fontSize: 12,
        color: "#68756B",
    },
    listCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        paddingHorizontal: 15,
        elevation: 2,
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#EEF0EB",
    },
    itemMain: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 1.5,
        borderColor: "#A3B18A",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    checkedBox: {
        backgroundColor: "#285943",
        borderColor: "#285943",
    },
    checkmark: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
    },
    itemName: {
        fontSize: 14,
        color: "#24352B",
    },
    packedItem: {
        textDecorationLine: "line-through",
        color: "#929C92",
    },
    deleteButton: {
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    deleteText: {
        color: "#A66B61",
        fontSize: 15,
    },
    emptyText: {
        color: "#929C92",
        fontSize: 13,
        paddingVertical: 18,
        textAlign: "center",
    },
});