import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

interface Course {
    id: string;
    name: string;
    code: string;
    credits: number;
    status: 'active' | 'dropped';
}

export default function CourseDropScreen() {
    const [courses, setCourses] = useState<Course[]>([
        {
            id: '1',
            name: 'Financial Modeling',
            code: 'AcFn 3052',
            credits: 2,
            status: 'active',
        },
        {
            id: '2',
            name: 'Operations Research',
            code: 'Mgmt 3050',
            credits: 3,
            status: 'active',
        },
        {
            id: '3',
            name: 'Advanced Accounting',
            code: 'AcFn 3061',
            credits: 3,
            status: 'dropped',
        },
    ]);

    const [activeTab, setActiveTab] = useState<'drop' | 'status'>('drop');

    const handleDropCourse = (courseId: string) => {
        Alert.alert(
            'Drop Course',
            'Are you sure you want to drop this course?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Drop',
                    style: 'destructive',
                    onPress: () => {
                        setCourses((prev) =>
                            prev.map((course) =>
                                course.id === courseId
                                    ? { ...course, status: 'dropped' }
                                    : course
                            )
                        );
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                {/* Header */}
                <View className="px-6 pt-4 pb-6 flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <Ionicons name="chevron-back" size={28} color="#1F2937" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-text-primary">Course Drop</Text>
                </View>

                {/* Description */}
                <View className="px-6 mb-6">
                    <Text className="text-sm text-text-secondary leading-5">
                        Select the courses you wish to drop from your current registration.
                    </Text>
                </View>

                {/* Courses List */}
                <ScrollView className="flex-1 px-6">
                    {courses.map((course) => (
                        <View
                            key={course.id}
                            className={`mb-4 p-5 rounded-2xl border ${course.status === 'dropped'
                                    ? 'bg-gray-50 border-gray-200'
                                    : 'bg-white border-gray-200'
                                }`}
                        >
                            <View className="flex-row justify-between items-start">
                                <View className="flex-1">
                                    <Text
                                        className={`text-lg font-bold mb-1 ${course.status === 'dropped'
                                                ? 'text-gray-400 line-through'
                                                : 'text-text-primary'
                                            }`}
                                    >
                                        {course.name}
                                    </Text>
                                    <Text
                                        className={`text-sm ${course.status === 'dropped'
                                                ? 'text-gray-400'
                                                : 'text-text-secondary'
                                            }`}
                                    >
                                        {course.code} • {course.credits} Credit Hours
                                    </Text>
                                </View>
                                {course.status === 'active' ? (
                                    <TouchableOpacity
                                        onPress={() => handleDropCourse(course.id)}
                                        className="bg-red-50 px-4 py-2 rounded-full flex-row items-center"
                                    >
                                        <Ionicons name="trash-outline" size={16} color="#EF4444" />
                                        <Text className="text-red-500 font-semibold ml-2">Drop</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <View className="bg-green-50 px-4 py-2 rounded-full flex-row items-center">
                                        <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                                        <Text className="text-green-600 font-semibold ml-2">
                                            Dropped
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Bottom Tabs */}
                <View className="flex-row border-t border-gray-200 bg-white">
                    <TouchableOpacity
                        onPress={() => setActiveTab('drop')}
                        className={`flex-1 py-4 items-center ${activeTab === 'drop' ? 'bg-primary/5' : ''
                            }`}
                    >
                        <Ionicons
                            name="remove-circle"
                            size={24}
                            color={activeTab === 'drop' ? '#2563EB' : '#6B7280'}
                        />
                        <Text
                            className={`mt-1 font-semibold ${activeTab === 'drop' ? 'text-primary' : 'text-gray-500'
                                }`}
                        >
                            Drop Courses
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActiveTab('status')}
                        className={`flex-1 py-4 items-center ${activeTab === 'status' ? 'bg-primary/5' : ''
                            }`}
                    >
                        <Ionicons
                            name="time-outline"
                            size={24}
                            color={activeTab === 'status' ? '#2563EB' : '#6B7280'}
                        />
                        <Text
                            className={`mt-1 font-semibold ${activeTab === 'status' ? 'text-primary' : 'text-gray-500'
                                }`}
                        >
                            Drop Status
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
