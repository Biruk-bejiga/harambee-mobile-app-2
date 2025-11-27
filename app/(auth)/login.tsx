import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password,
            });

            if (error) {
                Alert.alert('Login Failed', error.message);
            } else {
                router.replace('/(tabs)/home');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <LinearGradient
                colors={['#DBEAFE', '#EFF6FF', '#FFFFFF']}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 px-6 pt-20">
                        {/* Logo and Title */}
                        <View className="items-center mb-12">
                            <View className="bg-primary w-24 h-24 rounded-3xl items-center justify-center mb-6 shadow-lg">
                                <Ionicons name="school" size={48} color="white" />
                            </View>
                            <Text className="text-3xl font-bold text-primary mb-2">
                                Student Portal
                            </Text>
                        </View>

                        {/* Welcome Text */}
                        <View className="mb-8">
                            <Text className="text-2xl font-semibold text-text-primary text-center">
                                Welcome Back.
                            </Text>
                            <Text className="text-base text-text-secondary text-center mt-2">
                                Log in to your student account.
                            </Text>
                        </View>

                        {/* Email Input */}
                        <View className="mb-4">
                            <View className="flex-row items-center bg-white rounded-full px-6 py-4 border-2 border-primary/20">
                                <Ionicons name="mail-outline" size={24} color="#9CA3AF" />
                                <TextInput
                                    className="flex-1 ml-3 text-base text-text-primary"
                                    placeholder="Email or Student ID"
                                    placeholderTextColor="#9CA3AF"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View className="mb-2">
                            <View className="flex-row items-center bg-white rounded-full px-6 py-4 border-2 border-primary/20">
                                <Ionicons name="lock-closed-outline" size={24} color="#9CA3AF" />
                                <TextInput
                                    className="flex-1 ml-3 text-base text-text-primary"
                                    placeholder="Password"
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons
                                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                        size={24}
                                        color="#9CA3AF"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Forgot Password */}
                        <TouchableOpacity className="self-end mb-8">
                            <Text className="text-primary font-semibold">Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <TouchableOpacity
                            onPress={handleLogin}
                            disabled={loading}
                            className="mb-8"
                        >
                            <LinearGradient
                                colors={['#2563EB', '#1E40AF']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className="rounded-full py-4 shadow-lg"
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    {loading ? 'Logging in...' : 'Log In'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Create Account */}
                        <View className="flex-row justify-center items-center mt-auto mb-8">
                            <Text className="text-text-secondary">Don't have an account? </Text>
                            <TouchableOpacity>
                                <Text className="text-primary font-semibold">Create an Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}
