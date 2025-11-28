import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

interface UserProfile {
    full_name: string;
    student_id: string;
    department: string;
    year: number;
    semester: number;
}

export default function ProfileScreen() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                setEmail(user.email || '');

                // Fetch profile from profiles table
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.error('Error fetching profile:', error);
                } else if (profile) {
                    setUserProfile(profile);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        console.log('Logout button pressed');

        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        console.log('Logout confirmed');
                        try {
                            const { error } = await supabase.auth.signOut();
                            if (error) {
                                console.error('Logout error:', error);
                                Alert.alert('Error', error.message);
                            } else {
                                console.log('Logout successful');
                                router.replace('/(auth)/login');
                            }
                        } catch (error: any) {
                            console.error('Logout exception:', error);
                            Alert.alert('Error', 'Failed to logout');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#2563EB" />
                    <Text className="mt-4 text-text-secondary">Loading profile...</Text>
                </View>
            </SafeAreaView>
        );
    }

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
                                {userProfile?.full_name || 'Student'}
                            </Text>
                            <Text className="text-sm text-blue-100 mb-1">{email}</Text>
                            <Text className="text-sm text-blue-100">
                                {userProfile?.student_id || 'N/A'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Student Information */}
                {userProfile && (
                    <View className="px-6 mb-6">
                        <Text className="text-lg font-bold text-text-primary mb-4">
                            Student Information
                        </Text>
                        <View className="bg-gray-50 rounded-2xl p-5">
                            <View className="flex-row justify-between items-center mb-3 pb-3 border-b border-gray-200">
                                <Text className="text-sm text-text-secondary">Department</Text>
                                <Text className="text-base font-semibold text-text-primary">
                                    {userProfile.department || 'N/A'}
                                </Text>
                            </View>
                            <View className="flex-row justify-between items-center mb-3 pb-3 border-b border-gray-200">
                                <Text className="text-sm text-text-secondary">Year</Text>
                                <Text className="text-base font-semibold text-text-primary">
                                    Year {userProfile.year || 'N/A'}
                                </Text>
                            </View>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-sm text-text-secondary">Semester</Text>
                                <Text className="text-base font-semibold text-text-primary">
                                    Semester {userProfile.semester || 'N/A'}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

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
                        activeOpacity={0.7}
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
