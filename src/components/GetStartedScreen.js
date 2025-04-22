    import React from 'react';
    import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
    import styles from '../styles/GetStartedScreenStyles';

    export default function GetStartedScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
            <Text style={styles.title}>LinguaLift</Text>

            {/* Logo */}
            <Image
            source={require('../../assets/lingua.png')}
            style={styles.logo}
            resizeMode="contain"
            />

            {/* Description */}
            <Text style={styles.description}>
            LinguaLift is your companion on the journey to languages which is English and Spanish. 
            We provide a platform to learn and practice languages in a fun and engaging way.
            </Text>

            {/* Button */}
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
            >
            <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text style={styles.footer}>Made by Chadrix Mendieta</Text>
        </View>
        </SafeAreaView>
    );
    }
