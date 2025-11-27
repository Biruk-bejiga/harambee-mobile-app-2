import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

export default function WithdrawalScreen() {
    const [reason, setReason] = useState('');
    const [selectedReason, setSelectedReason] = useState('');

    const reasons = [
        'Financial difficulties',
        'Health issues',
        'Transfer to another institution',
        'Personal reasons',
        'Academic challenges',
        'Other',
    ];

    const handleSubmitWithdrawal = () => {
        if (!selectedReason && !reason) {
            Alert.alert('Error', 'Please select or enter a reason for withdrawal');
            return;
        }

        Alert.alert(
            'Confirm Withdrawal',
            'Are you sure you want to submit a withdrawal request? This action requires approval.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Submit',
                    style: 'destructive',
                    onPress: () => {
                        Alert.alert(
                            'Request Submitted',
                            'Your withdrawal request has been submitted for review.'
                        );
                        router.back();
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="px-6 pt-4 pb-6 flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <Ionicons name="chevron-back" size={28} color="#1F2937" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-text-primary">Withdrawal</Text>
                </View>

                {/* Warning Card */}
                <View className="mx-6 mb-6 bg-red-50 rounded-2xl p-5 border border-red-200">
                    <View className="flex-row items-start">
                        <Ionicons name="warning" size={24} color="#EF4444" />
                        <View className="flex-1 ml-3">
                            <Text className="text-base font-bold text-red-600 mb-2">
                                Important Notice
                            </Text>
                            <Text className="text-sm text-red-600 leading-5">
                                Withdrawing from the university is a serious decision. Please consult
                                with your academic advisor before proceeding.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Reason Selection */}
                <View className="px-6 mb-6">
                    <Text className="text-lg font-bold text-text-primary mb-4">
                        Reason for Withdrawal
                    </Text>

                    {reasons.map((reasonOption, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedReason(reasonOption)}
                            className={`flex-row items-center p-4 rounded-2xl mb-3 border ${selectedReason === reasonOption
                                    ? 'bg-primary/5 border-primary'
                                    : 'bg-gray-50 border-gray-200'
                                }`}
                        >
                            <View
                                className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${selectedReason === reasonOption
                                        ? 'border-primary bg-primary'
                                        : 'border-gray-300'
                                    }`}
                            >
                                {selectedReason === reasonOption && (
                                    <Ionicons name="checkmark" size={16} color="white" />
                                )}
                            </View>
                            <Text
                                className={`text-base ${selectedReason === reasonOption
                                        ? 'text-primary font-semibold'
                                        : 'text-text-primary'
                                    }`}
                            >
                                {reasonOption}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Additional Comments */}
                <View className="px-6 mb-6">
                    <Text className="text-lg font-bold text-text-primary mb-4">
                        Additional Comments (Optional)
                    </Text>
                    <TextInput
                        className="bg-gray-50 rounded-2xl p-4 text-base text-text-primary border border-gray-200"
                        placeholder="Please provide any additional details..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                        value={reason}
                        onChangeText={setReason}
                    />
                </View>

                {/* Submit Button */}
                <View className="px-6 mb-8">
                    <TouchableOpacity
                        onPress={handleSubmitWithdrawal}
                        className="bg-red-500 rounded-2xl py-4 flex-row items-center justify-center"
                    >
                        <Ionicons name="exit-outline" size={24} color="white" />
                        <Text className="text-white font-bold text-base ml-2">
                            Submit Withdrawal Request
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
