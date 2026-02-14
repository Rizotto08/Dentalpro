import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const tabs = [
  { key: 'Dashboard', label: 'Главная', icon: '⌂' },
  { key: 'Patients', label: 'Пациенты', icon: '👥' },
  { key: 'Visits', label: 'Аналитика', icon: '▦' },
  { key: 'Profile', label: 'Профиль', icon: '👤' },
];

export default function BottomNav({ active, navigation }) {
  return (
    <View style={styles.wrapper}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <TouchableOpacity key={tab.key} style={styles.tab} onPress={() => navigation.navigate(tab.key)}>
            <Text style={[styles.icon, isActive && styles.active]}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.active]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#dce3ef',
    backgroundColor: '#fff',
  },
  tab: { alignItems: 'center', gap: 2 },
  icon: { color: '#7d8da8', fontSize: 16 },
  label: { color: '#7d8da8', fontSize: 12, fontWeight: '600' },
  active: { color: '#1764c0' },
});