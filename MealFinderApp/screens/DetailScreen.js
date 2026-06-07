// screens/DetailScreen.js — Écran 3 : Détail d'un plat

import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator, Linking, SafeAreaView
} from 'react-native';
import { getMealById } from '../api';

export default function DetailScreen({ route }) {
  const { mealId } = route.params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeal();
  }, []);

  async function loadMeal() {
    const data = await getMealById(mealId);
    setMeal(data);
    setLoading(false);
  }

  function getIngredients() {
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredients.push(`${meas ? meas.trim() + ' ' : ''}${ing.trim()}`);
      }
    }
    return ingredients;
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#D85A30" />
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Recette introuvable.</Text>
      </View>
    );
  }

  const ingredients = getIngredients();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image principale */}
        <Image source={{ uri: meal.strMealThumb }} style={styles.hero} />

        <View style={styles.content}>
          {/* Titre */}
          <Text style={styles.title}>{meal.strMeal}</Text>

          {/* Badges */}
          <View style={styles.badges}>
            {meal.strCategory && (
              <View style={[styles.badge, styles.badgeGreen]}>
                <Text style={styles.badgeGreenText}>{meal.strCategory}</Text>
              </View>
            )}
            {meal.strArea && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{meal.strArea}</Text>
              </View>
            )}
          </View>

          {/* Bouton YouTube */}
          {meal.strYoutube ? (
            <TouchableOpacity
              style={styles.ytBtn}
              onPress={() => Linking.openURL(meal.strYoutube)}
            >
              <Text style={styles.ytBtnText}>▶  Voir sur YouTube</Text>
            </TouchableOpacity>
          ) : null}

          {/* Ingrédients */}
          <Text style={styles.sectionTitle}>INGRÉDIENTS ({ingredients.length})</Text>
          <View style={styles.ingredientsGrid}>
            {ingredients.map((ing, index) => (
              <View key={index} style={styles.ingItem}>
                <View style={styles.ingDot} />
                <Text style={styles.ingText}>{ing}</Text>
              </View>
            ))}
          </View>

          {/* Instructions */}
          <Text style={styles.sectionTitle}>INSTRUCTIONS</Text>
          <View style={styles.instructionsBox}>
            <Text style={styles.instructions}>
              {meal.strInstructions?.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f0',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f0',
  },
  hero: {
    width: '100%',
    height: 260,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#FAECE7',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#F0997B',
  },
  badgeText: {
    fontSize: 12,
    color: '#993C1D',
    fontWeight: '500',
  },
  badgeGreen: {
    backgroundColor: '#EAF3DE',
    borderColor: '#97C459',
  },
  badgeGreenText: {
    fontSize: 12,
    color: '#3B6D11',
    fontWeight: '500',
  },
  ytBtn: {
    backgroundColor: '#cc0000',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  ytBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#888',
    letterSpacing: 1,
    marginBottom: 12,
  },
  ingredientsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  ingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 6,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  ingDot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: '#D85A30',
  },
  ingText: {
    fontSize: 13,
    color: '#1a1a1a',
  },
  instructionsBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 30,
  },
  instructions: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  emptyText: {
    color: '#aaa',
    fontSize: 15,
  },
});
