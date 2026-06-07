// screens/MealsScreen.js — Écran 2 : Liste des plats

import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet, ActivityIndicator, SafeAreaView
} from 'react-native';
import { getMealsByCategory } from '../api';

export default function MealsScreen({ route, navigation }) {
  const { category, meals: preloadedMeals, title } = route.params;
  const [meals, setMeals] = useState(preloadedMeals || []);
  const [loading, setLoading] = useState(!preloadedMeals);

  useEffect(() => {
    if (category) {
      loadMeals();
    }
    navigation.setOptions({ title: title || category || 'Plats' });
  }, []);

  async function loadMeals() {
    setLoading(true);
    const data = await getMealsByCategory(category);
    setMeals(data);
    setLoading(false);
  }

  function renderMeal({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
        <Text style={styles.cardName}>{item.strMeal}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#D85A30" style={{ marginTop: 40 }} />
      ) : meals.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Aucun plat trouvé.</Text>
        </View>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderMeal}
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
  list: {
    padding: 12,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    width: '48%',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1a1a1a',
    padding: 10,
    lineHeight: 18,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#aaa',
    fontSize: 15,
  },
});
