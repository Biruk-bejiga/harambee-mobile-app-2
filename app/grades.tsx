import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Course {
    id: string;
    code: string;
    name: string;
    credits: number;
    grade: string;
}

interface UserProfile {
    full_name: string;
    student_id: string;
    department: string;
    year: number;
    semester: number;
}

export default function GradesScreen() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [selectedYear, setSelectedYear] = useState(3);
    const [selectedSemester, setSelectedSemester] = useState(3);
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);

    const years = [1, 2, 3, 4, 5];
    const semesters = [1, 2, 3];

    useEffect(() => {
        fetchUserData();
        fetchCourses();
    }, [selectedYear, selectedSemester]);

    const fetchUserData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    setUserProfile(profile);
                    setSelectedYear(profile.year || 3);
                    setSelectedSemester(profile.semester || 3);
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: studentCourses } = await supabase
                    .from('student_courses')
                    .select(`
            id,
            grade,
            courses (
              id,
              code,
              name,
              credits
            )
          `)
                    .eq('student_id', user.id)
                    .eq('status', 'active');

                if (studentCourses) {
                    const formattedCourses = studentCourses.map((sc: any) => ({
                        id: sc.courses.id,
                        code: sc.courses.code,
                        name: sc.courses.name,
                        credits: sc.courses.credits,
                        grade: sc.grade || 'N/A',
                    }));
                    setCourses(formattedCourses);
                }
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateGPA = () => {
        const gradePoints: { [key: string]: number } = {
            'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D': 1.0, 'F': 0.0
        };

        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach(course => {
            const points = gradePoints[course.grade] || 0;
            totalPoints += points * course.credits;
            totalCredits += course.credits;
        });

        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    };

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('A')) return 'text-green-600';
        if (grade.startsWith('B')) return 'text-orange-500';
        if (grade.startsWith('C')) return 'text-pink-500';
        if (grade.startsWith('D')) return 'text-yellow-600';
        return 'text-red-500';
    };

    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="bg-[#F59E0B] px-6 py-4 flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-white">Grade Report</Text>
                </View>

                {/* University Header */}
                <View className="px-6 py-6 bg-gray-50 flex-row items-center">
                    <Image
                        source={require('../assets/university-logo.png')}
                        style={{ width: 80, height: 80 }}
                        resizeMode="contain"
                        className="mr-4"
                    />
                    <View className="flex-1">
                        <Text className="text-xs text-gray-600 font-semibold">YUNIVARSIITII HARRAAMBEE</Text>
                        <Text className="text-xs text-gray-600">ዩኒቨርሲቲ ሀራምቤ</Text>
                        <Text className="text-sm font-bold text-gray-800 mt-1">HARAMBEE UNIVERSITY</Text>
                        <Text className="text-xs text-gray-600">OFFICE OF REGISTRAR</Text>
                    </View>
                </View>

                {/* Student Information */}
                <View className="px-6 py-4 bg-white">
                    <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
                        <Text className="text-sm text-gray-600">Name</Text>
                        <Text className="text-sm font-bold text-gray-800">
                            {userProfile?.full_name || 'STUDENT NAME'}
                        </Text>
                    </View>
                    <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
                        <Text className="text-sm text-gray-600">Department</Text>
                        <Text className="text-sm font-bold text-gray-800">
                            {userProfile?.department || 'Department'}
                        </Text>
                    </View>
                    <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
                        <Text className="text-sm text-gray-600">Admission</Text>
                        <Text className="text-sm font-bold text-gray-800">Ext</Text>
                    </View>
                    <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
                        <Text className="text-sm text-gray-600">Year</Text>
                        <Text className="text-sm font-bold text-gray-800">{userProfile?.year || 3}</Text>
                    </View>
                    <View className="flex-row justify-between items-center py-3">
                        <Text className="text-sm text-gray-600">Semester</Text>
                        <Text className="text-sm font-bold text-gray-800">{userProfile?.semester || 3}</Text>
                    </View>
                </View>

                {/* Filter Dropdowns */}
                <View className="px-6 py-4 flex-row justify-between">
                    {/* Year Dropdown */}
                    <View className="w-[48%]">
                        <TouchableOpacity
                            onPress={() => {
                                setShowYearDropdown(!showYearDropdown);
                                setShowSemesterDropdown(false);
                            }}
                            className="bg-gray-100 rounded-xl px-4 py-3 flex-row justify-between items-center"
                        >
                            <Text className="text-gray-700 font-semibold">Year {selectedYear}</Text>
                            <Ionicons name="chevron-down" size={20} color="#6B7280" />
                        </TouchableOpacity>
                        {showYearDropdown && (
                            <View className="absolute top-14 left-0 right-0 bg-white rounded-xl shadow-lg z-10 border border-gray-200">
                                {years.map((year) => (
                                    <TouchableOpacity
                                        key={year}
                                        onPress={() => {
                                            setSelectedYear(year);
                                            setShowYearDropdown(false);
                                        }}
                                        className="px-4 py-3 border-b border-gray-100"
                                    >
                                        <Text className={`${selectedYear === year ? 'font-bold text-primary' : 'text-gray-700'}`}>
                                            Year {year}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Semester Dropdown */}
                    <View className="w-[48%]">
                        <TouchableOpacity
                            onPress={() => {
                                setShowSemesterDropdown(!showSemesterDropdown);
                                setShowYearDropdown(false);
                            }}
                            className="bg-gray-100 rounded-xl px-4 py-3 flex-row justify-between items-center"
                        >
                            <Text className="text-gray-700 font-semibold">Semester {selectedSemester}</Text>
                            <Ionicons name="chevron-down" size={20} color="#6B7280" />
                        </TouchableOpacity>
                        {showSemesterDropdown && (
                            <View className="absolute top-14 left-0 right-0 bg-white rounded-xl shadow-lg z-10 border border-gray-200">
                                {semesters.map((semester) => (
                                    <TouchableOpacity
                                        key={semester}
                                        onPress={() => {
                                            setSelectedSemester(semester);
                                            setShowSemesterDropdown(false);
                                        }}
                                        className="px-4 py-3 border-b border-gray-100"
                                    >
                                        <Text className={`${selectedSemester === semester ? 'font-bold text-primary' : 'text-gray-700'}`}>
                                            Semester {semester}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>

                {/* Course List Header */}
                <View className="px-6 py-3 flex-row justify-between items-center bg-gray-50">
                    <Text className="text-xs font-bold text-gray-600 flex-1">COURSE NAME</Text>
                    <Text className="text-xs font-bold text-gray-600 w-12 text-center">C.H</Text>
                    <Text className="text-xs font-bold text-gray-600 w-16 text-center">GRADE</Text>
                </View>

                {/* Course List */}
                <View className="px-6">
                    {courses.map((course, index) => (
                        <View
                            key={course.id}
                            className="py-4 flex-row justify-between items-center border-b border-gray-100"
                        >
                            <Text className="text-sm text-gray-800 flex-1">{course.name}</Text>
                            <Text className="text-sm text-gray-800 w-12 text-center">{course.credits}</Text>
                            <Text className={`text-base font-bold w-16 text-center ${getGradeColor(course.grade)}`}>
                                {course.grade}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Summary */}
                <View className="px-6 py-6 mt-4">
                    <Text className="text-xs font-bold text-gray-600 mb-4">SUMMARY</Text>
                    <View className="flex-row justify-between">
                        <View className="flex-1">
                            <Text className="text-xs text-gray-600 mb-1">TOTAL CREDIT</Text>
                            <Text className="text-2xl font-bold text-gray-800">{totalCredits}</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-xs text-gray-600 mb-1">TOTAL POINT</Text>
                            <Text className="text-2xl font-bold text-gray-800">{calculateGPA()}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
