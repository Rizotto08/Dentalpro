import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import api from '../api/client';

export default function PatientDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [patient, setPatient] = useState(null);

  useEffect(() => { api.get(`/patients/${id}`).then(({ data }) => setPatient(data)); }, [id]);

  const remove = async () => {
    await api.delete(`/patients/${id}`);
    Alert.alert('Deleted');
    navigation.goBack();
  };

  if (!patient) return <View style={styles.container}><Text>Loading...</Text></View>;

  return <View style={styles.container}><Text style={styles.title}>{patient.firstName} {patient.lastName}</Text><Text>{patient.email || 'No email'}</Text><Button title="Edit" onPress={() => navigation.navigate('PatientForm', { patient })} /><Button title="Delete" onPress={remove} color="#b00020" /></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, gap: 12 }, title: { fontSize: 24, fontWeight: '700' } });
