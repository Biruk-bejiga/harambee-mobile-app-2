import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Payment {
    id: string;
    description: string;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
}

export default function PaymentsScreen() {
    const payments: Payment[] = [
        {
            id: '1',
            description: 'Tuition Fee - Semester 3',
            amount: 15000,
            dueDate: '2025-12-15',
            status: 'pending',
        },
        {
            id: '2',
            description: 'Library Fee',
            amount: 500,
            dueDate: '2025-11-30',
            status: 'paid',
        },
        {
            id: '3',
            description: 'Lab Fee',
            amount: 1200,
            dueDate: '2025-12-01',
            status: 'paid',
        },
    ];

    const totalPending = payments
        .filter((p) => p.status === 'pending')
        .reduce((sum, p) => sum + p.amount, 0);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-50 text-green-600';
            case 'pending':
                return 'bg-yellow-50 text-yellow-600';
            case 'overdue':
                return 'bg-red-50 text-red-600';
            default:
                return 'bg-gray-50 text-gray-600';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
                return 'checkmark-circle';
            case 'pending':
                return 'time';
            case 'overdue':
                return 'alert-circle';
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
                    <Text className="text-2xl font-bold text-text-primary">Payments</Text>
                </View>

                {/* Balance Card */}
                <View className="mx-6 mb-6">
                    <View className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6">
                        <Text className="text-sm text-blue-100 mb-2">Total Pending</Text>
                        <Text className="text-4xl font-bold text-white mb-4">
                            ${totalPending.toLocaleString()}
                        </Text>
                        <TouchableOpacity className="bg-white rounded-full py-3 px-6 self-start">
                            <Text className="text-primary font-bold">Make Payment</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Payment History */}
                <View className="px-6 mb-4">
                    <Text className="text-lg font-bold text-text-primary mb-4">
                        Payment History
                    </Text>

                    {payments.map((payment) => (
                        <TouchableOpacity
                            key={payment.id}
                            className="bg-gray-50 rounded-2xl p-5 mb-3 border border-gray-100"
                        >
                            <View className="flex-row items-start justify-between mb-3">
                                <View className="flex-1">
                                    <Text className="text-base font-bold text-text-primary mb-1">
                                        {payment.description}
                                    </Text>
                                    <Text className="text-sm text-text-secondary">
                                        Due: {new Date(payment.dueDate).toLocaleDateString()}
                                    </Text>
                                </View>
                                <View
                                    className={`px-3 py-1 rounded-full flex-row items-center ${getStatusColor(
                                        payment.status
                                    )}`}
                                >
                                    <Ionicons
                                        name={getStatusIcon(payment.status) as any}
                                        size={16}
                                        color={
                                            payment.status === 'paid'
                                                ? '#10B981'
                                                : payment.status === 'pending'
                                                    ? '#F59E0B'
                                                    : '#EF4444'
                                        }
                                    />
                                    <Text
                                        className={`ml-1 font-semibold text-xs capitalize ${payment.status === 'paid'
                                                ? 'text-green-600'
                                                : payment.status === 'pending'
                                                    ? 'text-yellow-600'
                                                    : 'text-red-600'
                                            }`}
                                    >
                                        {payment.status}
                                    </Text>
                                </View>
                            </View>
                            <Text className="text-2xl font-bold text-primary">
                                ${payment.amount.toLocaleString()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
