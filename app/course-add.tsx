import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
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
    instructor: string;
    schedule: string;
    available: boolean;
}

export default function CourseAddScreen() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAvailableCourses();
    }, []);

    useEffect(() => {
        filterCourses();
    }, [searchQuery, courses]);

    const fetchAvailableCourses = async () => {
        try {
            setLoading(true);
            const { data: allCourses } = await supabase
                .from('courses')
                .select('*');

            if (allCourses) {
                const formattedCourses = allCourses.map((course: any) => ({
                    id: course.id,
                    code: course.code,
                    name: course.name,
                    credits: course.credits,
                    instructor: course.instructor || 'TBA',
                    schedule: course.schedule || 'TBA',
                    available: true,
                }));
                setCourses(formattedCourses);
                setFilteredCourses(formattedCourses);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterCourses = () => {
        if (!searchQuery.trim()) {
            setFilteredCourses(courses);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = courses.filter(
            (course) =>
                course.name.toLowerCase().includes(query) ||
                course.code.toLowerCase().includes(query) ||
                course.instructor.toLowerCase().includes(query)
        );
        setFilteredCourses(filtered);
    };

    const handleAddCourse = async (courseId: string, courseName: string) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                Alert.alert('Error', 'Please login to add courses');
                return;
            }

            // Check if already enrolled
            const { data: existing } = await supabase
                .from('student_courses')
                .select('id')
                .eq('student_id', user.id)
                .eq('course_id', courseId)
                .single();

            if (existing) {
                Alert.alert('Already Enrolled', 'You are already enrolled in this course');
                return;
            }

            // Add course
            const { error } = await supabase
                .from('student_courses')
                .insert({
                    student_id: user.id,
                    course_id: courseId,
                    status: 'active',
                });

            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Success', `${courseName} has been added to your courses`);
                fetchAvailableCourses();
            }
        } catch (error: any) {
            Alert.alert('Error', 'Failed to add course');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-6 py-4 border-b border-gray-200">
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <Ionicons name="arrow-back" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-text-primary">Add Courses</Text>
                </View>

                {/* Search Bar */}
                <View className="flex-row items-center bg-gray-50 rounded-full px-4 py-3 border border-gray-200">
                    <Ionicons name="search" size={20} color="#9CA3AF" />
                    <TextInput
                        className="flex-1 ml-3 text-base text-text-primary"
                        placeholder="Search by course name, code, or instructor..."
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCapitalize="none"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Search Results Count */}
                {searchQuery.length > 0 && (
                    <Text className="text-sm text-gray-600 mt-2">
                        Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                    </Text>
                )}
            </View>

            <ScrollView className="flex-1 px-6 py-4">
                {loading ? (
                    <View className="flex-1 items-center justify-center py-20">
                        <Text className="text-gray-500">Loading courses...</Text>
                    </View>
                ) : filteredCourses.length === 0 ? (
                    <View className="flex-1 items-center justify-center py-20">
                        <Ionicons name="search" size={48} color="#D1D5DB" />
                        <Text className="text-gray-500 mt-4 text-center">
                            {searchQuery ? 'No courses found matching your search' : 'No courses available'}
                        </Text>
                    </View>
                ) : (
                    filteredCourses.map((course) => (
                        <View
                            key={course.id}
                            className="bg-gray-50 rounded-2xl p-5 mb-4"
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.05,
                                shadowRadius: 4,
                                elevation: 2,
                            }}
                        >
                            <View className="flex-row justify-between items-start mb-3">
                                <View className="flex-1">
                                    <Text className="text-lg font-bold text-text-primary mb-1">
                                        {course.name}
                                    </Text>
                                    <Text className="text-sm text-text-secondary mb-1">
                                        {course.code} • {course.credits} Credits
                                    </Text>
                                </View>
                                {course.available && (
                                    <View className="bg-green-100 px-3 py-1 rounded-full">
                                        <Text className="text-xs font-semibold text-green-700">Available</Text>
                                    </View>
                                )}
                            </View>

                            <View className="mb-3">
                                <View className="flex-row items-center mb-2">
                                    <Ionicons name="person-outline" size={16} color="#6B7280" />
                                    <Text className="text-sm text-text-secondary ml-2">
                                        Instructor: {course.instructor}
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                                    <Text className="text-sm text-text-secondary ml-2">
                                        Schedule: {course.schedule}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => handleAddCourse(course.id, course.name)}
                                className="bg-primary rounded-xl py-3"
                                style={{
                                    shadowColor: '#2563EB',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 4,
                                    elevation: 3,
                                }}
                            >
                                <View className="flex-row items-center justify-center">
                                    <Ionicons name="add-circle-outline" size={20} color="white" />
                                    <Text className="text-white font-bold ml-2">Add Course</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
