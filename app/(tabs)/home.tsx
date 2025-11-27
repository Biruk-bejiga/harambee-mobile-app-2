import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface MenuCard {
    id: string;
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    route: string;
    bgColor: string;
}

export default function HomeScreen() {
    const [userName, setUserName] = useState('John Doe');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.user_metadata?.full_name) {
            setUserName(user.user_metadata.full_name);
        }
    };

    const menuCards: MenuCard[] = [
        {
            id: '1',
            title: 'Profile',
            subtitle: 'View your profile',
            icon: 'person',
            route: '/(tabs)/profile',
            bgColor: 'bg-gray-50',
        },
        {
            id: '2',
            title: 'My Grades',
            subtitle: 'Manage your grades',
            icon: 'school',
            route: '/grades',
            bgColor: 'bg-gray-50',
        },
        {
            id: '3',
            title: 'Slips',
            subtitle: 'Manage slips',
            icon: 'document-text',
            route: '/slips',
            bgColor: 'bg-gray-50',
        },
        {
            id: '4',
            title: 'Payments',
            subtitle: 'Manage payments',
            icon: 'card',
            route: '/payments',
            bgColor: 'bg-gray-50',
        },
        {
            id: '5',
            title: 'Course Add',
            subtitle: 'Manage course add',
            icon: 'add-circle',
            route: '/course-add',
            bgColor: 'bg-gray-50',
        },
        {
            id: '6',
            title: 'Course Drop',
            subtitle: 'Manage course drop',
            icon: 'remove-circle',
            route: '/course-drop',
            bgColor: 'bg-gray-50',
        },
        {
            id: '7',
            title: 'Department',
            subtitle: 'Manage department',
            icon: 'business',
            route: '/department',
            bgColor: 'bg-gray-50',
        },
        {
            id: '8',
            title: 'Withdrawal',
            subtitle: 'Manage withdrawal',
            icon: 'exit',
            route: '/withdrawal',
            bgColor: 'bg-gray-50',
        },
    ];

    const handleCardPress = (route: string) => {
        if (route.startsWith('/(tabs)')) {
            router.push(route as any);
        } else {
            router.push(route as any);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="px-6 pt-4 pb-6">
                    <View className="flex-row justify-between items-start">
                        <View>
                            <Text className="text-base text-text-secondary">Welcome back,</Text>
                            <Text className="text-3xl font-bold text-text-primary mt-1">
                                {userName}
                            </Text>
                        </View>
                        <TouchableOpacity className="bg-gray-50 p-3 rounded-full relative">
                            <Ionicons name="notifications" size={24} color="#1F2937" />
                            <View className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Menu Grid */}
                <View className="px-6 pb-6">
                    <View className="flex-row flex-wrap justify-between">
                        {menuCards.map((card) => (
                            <TouchableOpacity
                                key={card.id}
                                onPress={() => handleCardPress(card.route)}
                                className={`w-[48%] ${card.bgColor} rounded-2xl p-5 mb-4 shadow-sm`}
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 8,
                                    elevation: 2,
                                }}
                            >
                                <View className="bg-white w-12 h-12 rounded-xl items-center justify-center mb-3">
                                    <Ionicons name={card.icon} size={24} color="#1F2937" />
                                </View>
                                <Text className="text-lg font-bold text-text-primary mb-1">
                                    {card.title}
                                </Text>
                                <Text className="text-sm text-text-secondary">
                                    {card.subtitle}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
