import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface ScheduleItem {
    id: string;
    course: string;
    code: string;
    time: string;
    room: string;
    day: string;
    instructor: string;
}

export default function ScheduleScreen() {
    const schedule: ScheduleItem[] = [
        {
            id: '1',
            course: 'Financial Modeling',
            code: 'AcFn 3052',
            time: '8:00 AM - 10:00 AM',
            room: 'Room 301',
            day: 'Monday',
            instructor: 'Dr. Smith',
        },
        {
            id: '2',
            course: 'Operations Research',
            code: 'Mgmt 3050',
            time: '10:30 AM - 12:30 PM',
            room: 'Room 205',
            day: 'Monday',
            instructor: 'Prof. Johnson',
        },
        {
            id: '3',
            course: 'Advanced Accounting',
            code: 'AcFn 3061',
            time: '2:00 PM - 4:00 PM',
            room: 'Room 401',
            day: 'Tuesday',
            instructor: 'Dr. Williams',
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="px-6 pt-4 pb-6">
                    <Text className="text-3xl font-bold text-text-primary">Schedule</Text>
                </View>

                {/* Schedule List */}
                <View className="px-6">
                    {schedule.map((item) => (
                        <View
                            key={item.id}
                            className="bg-gray-50 rounded-2xl p-5 mb-4 border border-gray-100"
                        >
                            <View className="flex-row items-start mb-3">
                                <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center mr-4">
                                    <Ionicons name="book" size={24} color="white" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-lg font-bold text-text-primary mb-1">
                                        {item.course}
                                    </Text>
                                    <Text className="text-sm text-text-secondary">{item.code}</Text>
                                </View>
                            </View>

                            <View className="space-y-2">
                                <View className="flex-row items-center">
                                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                                    <Text className="text-sm text-text-secondary ml-2">
                                        {item.time}
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Ionicons name="location-outline" size={16} color="#6B7280" />
                                    <Text className="text-sm text-text-secondary ml-2">
                                        {item.room}
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Ionicons name="person-outline" size={16} color="#6B7280" />
                                    <Text className="text-sm text-text-secondary ml-2">
                                        {item.instructor}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
