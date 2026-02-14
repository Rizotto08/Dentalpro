import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomNav from '../components/BottomNav';

export default function DashboardScreen({ navigation }) {
  const [stats, setStats] = useState({ totalPatients: 0, upcomingVisitsToday: 0, revenueToday: 0 });
  const { logout } = useAuth();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}><Text style={styles.headerTitle}>DentalPro</Text><Text style={styles.search}>⌕</Text></View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Сегодняшние приемы</Text>
        {[{ name: 'Анна К.', time: '10:00', procedure: 'Гигиена' }, { name: 'Дмитрий Р.', time: '11:30', procedure: 'Имплантация' }].map((item) => (
          <View key={item.name} style={styles.appointmentCard}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardSub}>{item.time} · {item.procedure}</Text>
            </View>
          </View>
        ))}

  useEffect(() => {
    api.get('/dashboard').then(({ data }) => setStats(data)).catch(() => null);
  }, []);
        <Text style={styles.sectionTitle}>Задачи на сегодня</Text>
        <View style={styles.taskCard}><Text style={styles.cardSub}>Контроль после протезирования</Text></View>

  return (
    <View style={styles.container}>
      <Text style={styles.card}>Patients: {stats.totalPatients}</Text>
      <Text style={styles.card}>Visits Today: {stats.upcomingVisitsToday}</Text>
      <Text style={styles.card}>Revenue Today: ${stats.revenueToday}</Text>
      <Button title="Manage Patients" onPress={() => navigation.navigate('Patients')} />
      <Button title="Manage Visits" onPress={() => navigation.navigate('Visits')} />
      <Button title="Logout" onPress={logout} color="#b00020" />
    </View>
        <Text style={styles.sectionTitle}>Доход за неделю</Text>
        <View style={styles.revenueCard}><Text style={styles.revenue}>52 300 ₽</Text><Text style={styles.cardSub}>Предстоящие записи</Text></View>

        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('PatientForm')}><Text style={styles.actionText}>+ Новый пациент</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.secondary]} onPress={() => navigation.navigate('Patients')}><Text style={styles.secondaryText}>Планы лечения</Text></TouchableOpacity>
      </ScrollView>
      <BottomNav active="Dashboard" navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f9fc', gap: 10 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, fontSize: 18 },
  safe: { flex: 1, backgroundColor: '#eef2f7' },
  header: { backgroundColor: '#1563bd', paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 21, fontWeight: '700' },
  search: { color: '#fff', fontSize: 20 },
  container: { padding: 12, gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#23354d', marginTop: 6 },
  appointmentCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#d2dbe8' },
  cardName: { fontSize: 16, fontWeight: '700', color: '#1e324b' },
  cardSub: { color: '#64748b', marginTop: 2 },
  taskCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14 },
  revenueCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, alignItems: 'center' },
  revenue: { fontSize: 32, fontWeight: '800', color: '#0f365d' },
  actionBtn: { backgroundColor: '#1563bd', borderRadius: 12, padding: 13, alignItems: 'center' },
  secondary: { backgroundColor: '#e8f0ff', borderWidth: 1, borderColor: '#bdd3fa' },
  actionText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  secondaryText: { color: '#1459ac', fontWeight: '700', fontSize: 16 },
});