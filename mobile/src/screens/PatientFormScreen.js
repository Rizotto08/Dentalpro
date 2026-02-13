import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import FormInput from '../components/FormInput';
import api from '../api/client';
import { required } from '../utils/validation';

export default function PatientFormScreen({ route, navigation }) {
  const editing = route.params?.patient;
  const [firstName, setFirstName] = useState(editing?.firstName || '');
  const [lastName, setLastName] = useState(editing?.lastName || '');
  const [dateOfBirth, setDateOfBirth] = useState(editing?.dateOfBirth?.slice(0, 10) || '');
  const [phone, setPhone] = useState(editing?.phone || '');
  const [errors, setErrors] = useState({});

  const submit = async () => {
    const nextErrors = { firstName: required(firstName, 'First name'), lastName: required(lastName, 'Last name'), dateOfBirth: required(dateOfBirth, 'Date of birth') };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const payload = { firstName, lastName, dateOfBirth, phone };
    if (editing) await api.put(`/patients/${editing.id}`, payload);
    else await api.post('/patients', payload);
    navigation.goBack();
  };

  return <View style={styles.container}><FormInput label="First Name" value={firstName} onChangeText={setFirstName} error={errors.firstName} /><FormInput label="Last Name" value={lastName} onChangeText={setLastName} error={errors.lastName} /><FormInput label="Date of Birth (YYYY-MM-DD)" value={dateOfBirth} onChangeText={setDateOfBirth} error={errors.dateOfBirth} /><FormInput label="Phone" value={phone} onChangeText={setPhone} /><Button title={editing ? 'Update Patient' : 'Create Patient'} onPress={submit} /></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });
