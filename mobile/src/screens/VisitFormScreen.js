import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import FormInput from '../components/FormInput';
import api from '../api/client';
import { required } from '../utils/validation';

export default function VisitFormScreen({ route, navigation }) {
  const editing = route.params?.visit;
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState(editing?.patientId || '');
  const [visitDate, setVisitDate] = useState(editing?.visitDate || new Date().toISOString());
  const [treatment, setTreatment] = useState(editing?.treatment || '');
  const [amount, setAmount] = useState(editing?.amount ? String(editing.amount) : '');
  const [errors, setErrors] = useState({});

  useEffect(() => { api.get('/patients').then(({ data }) => { setPatients(data); if (!patientId && data[0]) setPatientId(data[0].id); }); }, [patientId]);

  const submit = async () => {
    const nextErrors = { treatment: required(treatment, 'Treatment'), amount: required(amount, 'Amount') };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean) || !patientId) return;

    const payload = { patientId, visitDate, treatment, amount };
    if (editing) await api.put(`/visits/${editing.id}`, payload);
    else await api.post('/visits', payload);
    navigation.goBack();
  };

  return <View style={styles.container}><FormInput label={`Patient ID (${patients.length} loaded)`} value={patientId} onChangeText={setPatientId} /><FormInput label="Visit Date (ISO)" value={visitDate} onChangeText={setVisitDate} /><FormInput label="Treatment" value={treatment} onChangeText={setTreatment} error={errors.treatment} /><FormInput label="Amount" value={amount} onChangeText={setAmount} error={errors.amount} /><Button title={editing ? 'Update Visit' : 'Create Visit'} onPress={submit} /></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });
