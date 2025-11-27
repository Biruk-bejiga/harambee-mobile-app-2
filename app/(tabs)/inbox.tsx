import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Message {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'announcement' | 'grade' | 'payment' | 'general';
}

export default function InboxScreen() {
    const messages: Message[] = [
        {
            id: '1',
            title: 'Grade Posted',
            message: 'Your grade for Financial Modeling has been posted.',
            time: '2 hours ago',
            read: false,
            type: 'grade',
        },
        {
            id: '2',
            title: 'Payment Reminder',
            message: 'Your tuition payment is due in 5 days.',
            time: '1 day ago',
            read: false,
            type: 'payment',
        },
        {
            id: '3',
            title: 'Department Announcement',
            message: 'New course registration opens next week.',
            time: '2 days ago',
            read: true,
            type: 'announcement',
        },
    ];

    const getIconForType = (type: string) => {
        switch (type) {
            case 'grade':
                return 'school';
            case 'payment':
                return 'card';
            case 'announcement':
                return 'megaphone';
            default:
                return 'mail';
        }
    };

    const getColorForType = (type: string) => {
        switch (type) {
            case 'grade':
                return 'bg-blue-50';
            case 'payment':
                return 'bg-red-50';
            case 'announcement':
                return 'bg-yellow-50';
            default:
                return 'bg-gray-50';
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="px-6 pt-4 pb-6">
                    <Text className="text-3xl font-bold text-text-primary">Inbox</Text>
                </View>

                {/* Messages List */}
                <View className="px-6">
                    {messages.map((message) => (
                        <TouchableOpacity
                            key={message.id}
                            className={`rounded-2xl p-5 mb-3 border ${message.read
                                    ? 'bg-white border-gray-100'
                                    : 'bg-blue-50/30 border-primary/20'
                                }`}
                        >
                            <View className="flex-row items-start">
                                <View
                                    className={`w-12 h-12 ${getColorForType(
                                        message.type
                                    )} rounded-xl items-center justify-center mr-4`}
                                >
                                    <Ionicons
                                        name={getIconForType(message.type) as any}
                                        size={24}
                                        color="#1F2937"
                                    />
                                </View>
                                <View className="flex-1">
                                    <View className="flex-row items-start justify-between mb-2">
                                        <Text
                                            className={`text-base font-bold flex-1 ${message.read ? 'text-text-secondary' : 'text-text-primary'
                                                }`}
                                        >
                                            {message.title}
                                        </Text>
                                        {!message.read && (
                                            <View className="w-2 h-2 bg-primary rounded-full ml-2 mt-2" />
                                        )}
                                    </View>
                                    <Text className="text-sm text-text-secondary mb-2">
                                        {message.message}
                                    </Text>
                                    <Text className="text-xs text-text-light">{message.time}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
