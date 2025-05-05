import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import styles from '../styles/ProfileScreenStyles';

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        Alert.alert('Logout Error', error.message);
      });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Profile</Text>

        <Image source={require('../../assets/Chad.jpg')} style={styles.avatar} />

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.info}>@Xird</Text>

          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.info}>Chadrix Melven A. Mendieta</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.info}>chadrixmendieta@gmail.com</Text>

          <Text style={styles.label}>Birthday</Text>
          <Text style={styles.info}>October 31, 2004</Text>

          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.info}>+639956408654</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
