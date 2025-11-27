import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Slip {
    id: string;
    type: string;
    date: string;
    status: 'approved' | 'pending' | 'rejected';
    description: string;
}

export default function SlipsScreen() {
    const slips: Slip[] = [
        {
            id: '1',
            type: 'Course Registration Slip',
            date: '2025-11-20',
            status: 'approved',
            description: 'Semester 3 course registration',
        },
        {
            id: '2',
            type: 'Exam Permit',
            date: '2025-11-25',
            status: 'pending',
            description: 'Final exam permit request',
        },
        {
            id: '3',
            type: 'ID Card Request',
            date: '2025-11-15',
            status: 'approved',
            description: 'Student ID card renewal',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-50 text-green-600';
            case 'pending':
                return 'bg-yellow-50 text-yellow-600';
            case 'rejected':
                return 'bg-red-50 text-red-600';
            default:
                return 'bg-gray-50 text-gray-600';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return 'checkmark-circle';
            case 'pending':
                return 'time';
            case 'rejected':
                return 'close-circle';
            default:
                return 'help-circle';
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="px-6 pt-4 pb-6 flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <Ionicons name="chevron-back" size={28} color="#1F2937" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-text-primary">Slips</Text>
                </View>

                {/* Request New Slip Button */}
                <View className="px-6 mb-6">
                    <TouchableOpacity className="bg-primary rounded-2xl py-4 flex-row items-center justify-center">
                        <Ionicons name="add-circle-outline" size={24} color="white" />
                        <Text className="text-white font-bold text-base ml-2">
                            Request New Slip
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Slips List */}
                <View className="px-6">
                    <Text className="text-lg font-bold text-text-primary mb-4">
                        Your Slips
                    </Text>

                    {slips.map((slip) => (
                        <TouchableOpacity
                            key={slip.id}
                            className="bg-gray-50 rounded-2xl p-5 mb-3 border border-gray-100"
                        >
                            <View className="flex-row items-start justify-between mb-3">
                                <View className="flex-1">
                                    <Text className="text-base font-bold text-text-primary mb-1">
                                        {slip.type}
                                    </Text>
                                    <Text className="text-sm text-text-secondary mb-2">
                                        {slip.description}
                                    </Text>
                                    <Text className="text-xs text-text-light">
                                        {new Date(slip.date).toLocaleDateString()}
                                    </Text>
                                </View>
                                <View
                                    className={`px-3 py-1 rounded-full flex-row items-center ${getStatusColor(
                                        slip.status
                                    )}`}
                                >
                                    <Ionicons
                                        name={getStatusIcon(slip.status) as any}
                                        size={16}
                                        color={
                                            slip.status === 'approved'
                                                ? '#10B981'
                                                : slip.status === 'pending'
                                                    ? '#F59E0B'
                                                    : '#EF4444'
                                        }
                                    />
                                    <Text
                                        className={`ml-1 font-semibold text-xs capitalize ${slip.status === 'approved'
                                                ? 'text-green-600'
                                                : slip.status === 'pending'
                                                    ? 'text-yellow-600'
                                                    : 'text-red-600'
                                            }`}
                                    >
                                        {slip.status}
                                    </Text>
                                </View>
                            </View>

                            {slip.status === 'approved' && (
                                <TouchableOpacity className="bg-white rounded-full py-2 px-4 flex-row items-center justify-center border border-primary">
                                    <Ionicons name="download-outline" size={18} color="#2563EB" />
                                    <Text className="text-primary font-semibold ml-2">Download</Text>
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
