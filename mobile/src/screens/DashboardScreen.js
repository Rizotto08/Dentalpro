import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function DashboardScreen({ navigation }) {
  const [stats, setStats] = useState({ totalPatients: 0, upcomingVisitsToday: 0, revenueToday: 0 });
  const { logout } = useAuth();

  useEffect(() => {
    api.get('/dashboard').then(({ data }) => setStats(data)).catch(() => null);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.card}>Patients: {stats.totalPatients}</Text>
      <Text style={styles.card}>Visits Today: {stats.upcomingVisitsToday}</Text>
      <Text style={styles.card}>Revenue Today: ${stats.revenueToday}</Text>
      <Button title="Manage Patients" onPress={() => navigation.navigate('Patients')} />
      <Button title="Manage Visits" onPress={() => navigation.navigate('Visits')} />
      <Button title="Logout" onPress={logout} color="#b00020" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f9fc', gap: 10 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, fontSize: 18 },
});
