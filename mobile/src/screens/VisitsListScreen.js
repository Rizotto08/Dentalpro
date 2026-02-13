import React, { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api/client';

export default function VisitsListScreen({ navigation }) {
  const [visits, setVisits] = useState([]);

  useFocusEffect(useCallback(() => {
    api.get('/visits').then(({ data }) => setVisits(data));
  }, []));

  return <View style={styles.container}><Button title="Add Visit" onPress={() => navigation.navigate('VisitForm')} /><FlatList data={visits} keyExtractor={(item) => item.id} renderItem={({ item }) => <Text style={styles.item}>{new Date(item.visitDate).toLocaleString()} - {item.treatment}</Text>} /></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, item: { padding: 12, backgroundColor: '#fff', borderRadius: 8, marginTop: 10 } });
