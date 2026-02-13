import React, { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api/client';

export default function PatientsListScreen({ navigation }) {
  const [patients, setPatients] = useState([]);

  const load = async () => {
    const { data } = await api.get('/patients');
    setPatients(data);
  };

  useFocusEffect(useCallback(() => { load(); }, []));

  return (
    <View style={styles.container}>
      <Button title="Add Patient" onPress={() => navigation.navigate('PatientForm')} />
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PatientDetail', { id: item.id })}>
            <Text>{item.firstName} {item.lastName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, item: { backgroundColor: '#fff', padding: 14, marginTop: 10, borderRadius: 10 } });
