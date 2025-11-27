import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

export default function ProfileScreen() {
    const [userName, setUserName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@student.edu');
    const [studentId, setStudentId] = useState('STU-2021-001');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setEmail(user.email || '');
            if (user.user_metadata?.full_name) {
                setUserName(user.user_metadata.full_name);
            }
            if (user.user_metadata?.student_id) {
                setStudentId(user.user_metadata.student_id);
            }
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await supabase.auth.signOut();
                        router.replace('/(auth)/login');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="px-6 pt-4 pb-6">
                    <Text className="text-3xl font-bold text-text-primary">Profile</Text>
                </View>

                {/* Profile Card */}
                <View className="px-6 mb-6">
                    <View className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6">
                        <View className="items-center">
                            <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4">
                                <Ionicons name="person" size={48} color="#2563EB" />
                            </View>
                            <Text className="text-2xl font-bold text-white mb-1">
                                {userName}
                            </Text>
                            <Text className="text-sm text-blue-100 mb-1">{email}</Text>
                            <Text className="text-sm text-blue-100">{studentId}</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Items */}
                <View className="px-6 mb-6">
                    <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 rounded-2xl p-5 mb-3">
                        <View className="flex-row items-center flex-1">
                            <View className="w-12 h-12 bg-white rounded-xl items-center justify-center mr-4">
                                <Ionicons name="person-outline" size={24} color="#1F2937" />
                            </View>
                            <Text className="text-base font-semibold text-text-primary">
                                Edit Profile
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 rounded-2xl p-5 mb-3">
                        <View className="flex-row items-center flex-1">
                            <View className="w-12 h-12 bg-white rounded-xl items-center justify-center mr-4">
                                <Ionicons name="settings-outline" size={24} color="#1F2937" />
                            </View>
                            <Text className="text-base font-semibold text-text-primary">
                                Settings
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 rounded-2xl p-5 mb-3">
                        <View className="flex-row items-center flex-1">
                            <View className="w-12 h-12 bg-white rounded-xl items-center justify-center mr-4">
                                <Ionicons name="help-circle-outline" size={24} color="#1F2937" />
                            </View>
                            <Text className="text-base font-semibold text-text-primary">
                                Help & Support
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleLogout}
                        className="flex-row items-center justify-between bg-red-50 rounded-2xl p-5"
                    >
                        <View className="flex-row items-center flex-1">
                            <View className="w-12 h-12 bg-white rounded-xl items-center justify-center mr-4">
                                <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                            </View>
                            <Text className="text-base font-semibold text-red-500">Logout</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#EF4444" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
