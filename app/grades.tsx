import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Course {
    id: string;
    name: string;
    code: string;
    credits: number;
    grade: string;
}

export default function GradesScreen() {
    const [courses, setCourses] = useState<Course[]>([
        {
            id: '1',
            name: 'Financial Modeling',
            code: 'AcFn 3052',
            credits: 2,
            grade: 'A',
        },
        {
            id: '2',
            name: 'Operations Research',
            code: 'Mgmt 3050',
            credits: 3,
            grade: 'B-',
        },
        {
            id: '3',
            name: 'Advanced Accounting',
            code: 'AcFn 3061',
            credits: 3,
            grade: 'A-',
        },
        {
            id: '4',
            name: 'Risk Management',
            code: 'AcFn 3055',
            credits: 3,
            grade: 'C+',
        },
    ]);

    const [semesterGPA, setSemesterGPA] = useState(2.87);
    const [cumulativeGPA, setCumulativeGPA] = useState(2.93);
    const [studentName, setStudentName] = useState('Biruk Bejiga');
    const [department, setDepartment] = useState('Accounting & Finance');
    const [year, setYear] = useState(3);
    const [semester, setSemester] = useState(3);

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('A')) return 'text-red-500';
        if (grade.startsWith('B')) return 'text-orange-500';
        if (grade.startsWith('C')) return 'text-pink-500';
        return 'text-gray-500';
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="px-6 pt-4 pb-6 flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <Ionicons name="chevron-back" size={28} color="#1F2937" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-text-primary">Grades</Text>
                </View>

                {/* Student Info */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center">
                        <View className="w-16 h-16 rounded-full bg-accent-gold items-center justify-center mr-4">
                            <Ionicons name="person" size={32} color="white" />
                        </View>
                        <View>
                            <Text className="text-xl font-bold text-text-primary">
                                {studentName}
                            </Text>
                            <Text className="text-sm text-text-secondary">{department}</Text>
                        </View>
                    </View>
                </View>

                {/* Year and Semester */}
                <View className="px-6 mb-6">
                    <Text className="text-lg font-bold text-text-primary">
                        Year {year}, Semester {semester}
                    </Text>
                </View>

                {/* Courses List */}
                <View className="px-6 mb-6">
                    {courses.map((course) => (
                        <View
                            key={course.id}
                            className="flex-row justify-between items-center py-4 border-b border-gray-100"
                        >
                            <View className="flex-1">
                                <Text className="text-base font-semibold text-text-primary mb-1">
                                    {course.name}
                                </Text>
                                <Text className="text-sm text-text-secondary">
                                    {course.code} • {course.credits} CH
                                </Text>
                            </View>
                            <Text className={`text-2xl font-bold ${getGradeColor(course.grade)}`}>
                                {course.grade}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Summary */}
                <View className="px-6 mb-8">
                    <Text className="text-lg font-bold text-text-primary mb-4">
                        Summary
                    </Text>
                    <View className="bg-gray-50 rounded-2xl p-5">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-base text-text-secondary">Semester GPA</Text>
                            <Text className="text-2xl font-bold text-red-500">
                                {semesterGPA.toFixed(2)}
                            </Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-base text-text-secondary">Cumulative GPA</Text>
                            <Text className="text-2xl font-bold text-red-500">
                                {cumulativeGPA.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
