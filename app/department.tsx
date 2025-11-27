import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function DepartmentScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="px-6 pt-4 pb-6 flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <Ionicons name="chevron-back" size={28} color="#1F2937" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-text-primary">Department</Text>
                </View>

                {/* Department Header */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center mb-4">
                        <View className="w-16 h-16 bg-gray-100 rounded-xl items-center justify-center mr-4">
                            <Ionicons name="business" size={32} color="#6B7280" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm text-text-secondary mb-1">
                                Department of
                            </Text>
                            <Text className="text-xl font-bold text-text-primary">
                                Accounting & Finance
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Information Card */}
                <View className="mx-6 mb-6 bg-white rounded-2xl border border-gray-200 p-5">
                    <Text className="text-lg font-bold text-text-primary mb-4">
                        Information
                    </Text>

                    {/* Program */}
                    <View className="flex-row items-center mb-4">
                        <View className="w-12 h-12 bg-yellow-50 rounded-xl items-center justify-center mr-4">
                            <Ionicons name="school-outline" size={24} color="#F59E0B" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm text-text-secondary mb-1">Program</Text>
                            <Text className="text-base font-semibold text-text-primary">
                                Undergraduate
                            </Text>
                        </View>
                    </View>

                    {/* Year */}
                    <View className="flex-row items-center mb-4">
                        <View className="w-12 h-12 bg-yellow-50 rounded-xl items-center justify-center mr-4">
                            <Ionicons name="calendar-outline" size={24} color="#F59E0B" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm text-text-secondary mb-1">Year</Text>
                            <Text className="text-base font-semibold text-text-primary">3</Text>
                        </View>
                    </View>

                    {/* Semester */}
                    <View className="flex-row items-center">
                        <View className="w-12 h-12 bg-yellow-50 rounded-xl items-center justify-center mr-4">
                            <Ionicons name="time-outline" size={24} color="#F59E0B" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm text-text-secondary mb-1">Semester</Text>
                            <Text className="text-base font-semibold text-text-primary">3</Text>
                        </View>
                    </View>
                </View>

                {/* Quick Links */}
                <View className="mx-6 mb-6">
                    <TouchableOpacity className="bg-white rounded-2xl border border-gray-200 p-5 mb-3 flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                            <View className="w-12 h-12 bg-yellow-50 rounded-xl items-center justify-center mr-4">
                                <Ionicons name="document-text-outline" size={24} color="#F59E0B" />
                            </View>
                            <Text className="text-base font-semibold text-text-primary">
                                Courses
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-white rounded-2xl border border-gray-200 p-5 flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                            <View className="w-12 h-12 bg-yellow-50 rounded-xl items-center justify-center mr-4">
                                <Ionicons name="calendar" size={24} color="#F59E0B" />
                            </View>
                            <Text className="text-base font-semibold text-text-primary">
                                Schedule
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View className="flex-row border-t border-gray-200 bg-white">
                <TouchableOpacity className="flex-1 py-4 items-center">
                    <Ionicons name="home-outline" size={24} color="#6B7280" />
                    <Text className="mt-1 text-sm text-gray-500">Home</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 py-4 items-center bg-yellow-50">
                    <Ionicons name="school" size={24} color="#F59E0B" />
                    <Text className="mt-1 text-sm text-yellow-600 font-semibold">
                        Department
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 py-4 items-center">
                    <Ionicons name="person-outline" size={24} color="#6B7280" />
                    <Text className="mt-1 text-sm text-gray-500">Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
