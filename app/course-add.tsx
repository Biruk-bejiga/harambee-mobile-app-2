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
    instructor: string;
    schedule: string;
    available: boolean;
}

export default function CourseAddScreen() {
    const [availableCourses, setAvailableCourses] = useState<Course[]>([
        {
            id: '1',
            name: 'Business Analytics',
            code: 'Mgmt 3070',
            credits: 3,
            instructor: 'Dr. Anderson',
            schedule: 'Mon, Wed 10:00 AM',
            available: true,
        },
        {
            id: '2',
            name: 'Corporate Finance',
            code: 'AcFn 3065',
            credits: 3,
            instructor: 'Prof. Martinez',
            schedule: 'Tue, Thu 2:00 PM',
            available: true,
        },
        {
            id: '3',
            name: 'Marketing Strategy',
            code: 'Mktg 3040',
            credits: 3,
            instructor: 'Dr. Taylor',
            schedule: 'Wed, Fri 8:00 AM',
            available: false,
        },
    ]);

    const handleAddCourse = (courseId: string) => {
        Alert.alert(
            'Add Course',
            'Are you sure you want to add this course?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Add',
                    onPress: () => {
                        Alert.alert('Success', 'Course added successfully!');
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
                    <Text className="text-2xl font-bold text-text-primary">Course Add</Text>
                </View>

                {/* Description */}
                <View className="px-6 mb-6">
                    <Text className="text-sm text-text-secondary leading-5">
                        Browse and add courses to your current registration.
                    </Text>
                </View>

                {/* Available Courses */}
                <View className="px-6">
                    <Text className="text-lg font-bold text-text-primary mb-4">
                        Available Courses
                    </Text>

                    {availableCourses.map((course) => (
                        <View
                            key={course.id}
                            className={`mb-4 p-5 rounded-2xl border ${course.available
                                    ? 'bg-white border-gray-200'
                                    : 'bg-gray-50 border-gray-200'
                                }`}
                        >
                            <View className="flex-row items-start justify-between mb-3">
                                <View className="flex-1">
                                    <Text
                                        className={`text-lg font-bold mb-1 ${course.available ? 'text-text-primary' : 'text-gray-400'
                                            }`}
                                    >
                                        {course.name}
                                    </Text>
                                    <Text
                                        className={`text-sm mb-2 ${course.available ? 'text-text-secondary' : 'text-gray-400'
                                            }`}
                                    >
                                        {course.code} • {course.credits} Credit Hours
                                    </Text>
                                </View>
                            </View>

                            <View className="mb-3">
                                <View className="flex-row items-center mb-2">
                                    <Ionicons
                                        name="person-outline"
                                        size={16}
                                        color={course.available ? '#6B7280' : '#D1D5DB'}
                                    />
                                    <Text
                                        className={`text-sm ml-2 ${course.available ? 'text-text-secondary' : 'text-gray-400'
                                            }`}
                                    >
                                        {course.instructor}
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Ionicons
                                        name="time-outline"
                                        size={16}
                                        color={course.available ? '#6B7280' : '#D1D5DB'}
                                    />
                                    <Text
                                        className={`text-sm ml-2 ${course.available ? 'text-text-secondary' : 'text-gray-400'
                                            }`}
                                    >
                                        {course.schedule}
                                    </Text>
                                </View>
                            </View>

                            {course.available ? (
                                <TouchableOpacity
                                    onPress={() => handleAddCourse(course.id)}
                                    className="bg-primary rounded-full py-3 flex-row items-center justify-center"
                                >
                                    <Ionicons name="add-circle-outline" size={20} color="white" />
                                    <Text className="text-white font-bold ml-2">Add Course</Text>
                                </TouchableOpacity>
                            ) : (
                                <View className="bg-gray-200 rounded-full py-3 flex-row items-center justify-center">
                                    <Ionicons name="close-circle-outline" size={20} color="#9CA3AF" />
                                    <Text className="text-gray-500 font-bold ml-2">
                                        Not Available
                                    </Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
