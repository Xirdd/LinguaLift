import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import styles from '../styles/SplashScreenStyles';

export default function SplashScreen({ navigation }) {
    const bounceAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Bounce animation
        Animated.spring(bounceAnim, {
            toValue: 1,
            friction: 4,
            tension: 100,
            useNativeDriver: true,
        }).start();

        // Fade-in for text
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        // Navigate after splash
        const timeout = setTimeout(() => {
            navigation.replace('GetStarted');
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/lingua.png')}
                style={[
                    styles.logo,
                    {
                        transform: [
                            {
                                scale: bounceAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.5, 1],
                                }),
                            },
                        ],
                    },
                ]}
                resizeMode="contain"
            />
            <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
                LinguaLift
            </Animated.Text>
        </View>
    );
}
