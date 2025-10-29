import {
  Bell,
  ChevronRight,
  Edit,
  HelpCircle,
  Lock,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  return (
    <View className="flex-1 bg-black">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* HEADER */}
        <View className="h-56 bg-accentText rounded-b-3xl items-center justify-center shadow-lg">
          <User size={48} color="white" />
          <Text className="text-white text-3xl font-extrabold mt-2">
            My Profile
          </Text>
        </View>

        {/* PROFILE CARD */}
        <View className="items-center -mt-16">
          <Image
            source={{
              uri: "",
            }}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <Text className="text-white text-2xl font-bold mt-4">
            Harsh Suthar
          </Text>
          <Text className="text-gray-400 w-full text-center text-sm">
            sutharharsh108@gmail.com
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            className="mt-4 flex-row items-center bg-zinc-800 px-4 py-2 rounded-full"
          >
            <Edit size={18} color="#fff" />
            <Text className="text-white ml-2 font-medium">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* QUICK STATS */}
        <View className="flex-row justify-around mt-10 px-6">
          {[
            { label: "Watchlist", value: 25 },
            { label: "Favorites", value: 14 },
            { label: "Reviews", value: 9 },
          ].map((item, index) => (
            <View key={index} className="items-center">
              <Text className="text-white text-2xl font-bold">
                {item.value}
              </Text>
              <Text className="text-gray-400 text-sm mt-1">{item.label}</Text>
            </View>
          ))}
        </View>

        {/* SETTINGS SECTION */}
        <View className="mt-10 px-6">
          <Text className="text-gray-400 text-sm mb-3">Account Settings</Text>

          {[
            { title: "Change Password", icon: <Lock color="#fff" size={20} /> },
            { title: "Notifications", icon: <Bell color="#fff" size={20} /> },
            { title: "Privacy & Security", icon: <Shield color="#fff" size={20} /> },
            { title: "Help & Support", icon: <HelpCircle color="#fff" size={20} /> },
            { title: "App Preferences", icon: <Settings color="#fff" size={20} /> },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              className="bg-zinc-900 rounded-2xl p-4 mb-3 flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <View className="mr-3">{item.icon}</View>
                <Text className="text-white text-base font-medium">
                  {item.title}
                </Text>
              </View>
              <ChevronRight color="#a1a1aa" size={20} />
            </TouchableOpacity>
          ))}
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          activeOpacity={0.9}
          className="mt-5 mb-10 mx-6 bg-accentText py-4 rounded-2xl flex-row items-center justify-center"
        >
          <LogOut color="#fff" size={20} />
          <Text className="text-white font-semibold text-base ml-2">
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;
