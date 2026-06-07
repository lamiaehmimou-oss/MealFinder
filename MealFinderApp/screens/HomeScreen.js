// screens/HomeScreen.js — Écran 1 : Catégories

import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, TextInput, StyleSheet, ActivityIndicator, SafeAreaView
} from 'react-native';
import { getAllCategories, searchMealsByName } from '../api';

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setLoading(true);
    const data = await getAllCategories();
    setCategories(data);
    setLoading(false);
  }

  async function handleSearch() {
    if (!search.trim()) return;
    const results = await searchMealsByName(search.trim());
    navigation.navigate('Meals', {
      meals: results,
      title: `Résultats pour "${search}"`,
    });
  }

  function renderCategory({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Meals', { category: item.strCategory })}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.strCategoryThumb }} style={styles.cardImage} />
        <Text style={styles.cardName}>{item.strCategory}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un plat..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>PARCOURIR PAR CATÉGORIE</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#D85A30" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.idCategory}
          renderItem={renderCategory}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f0',
  },
  searchBar: {
    flexDirection: 'row',
    margin: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#1a1a1a',
  },
  searchBtn: {
    backgroundColor: '#D85A30',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnText: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#888',
    letterSpacing: 1,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
});
