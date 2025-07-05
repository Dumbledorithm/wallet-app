import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { SignOutButton } from '@/components/SignOutButton.jsx'
import { useTransactions } from '../../hooks/useTransactions'
import { useEffect } from 'react'
import PageLoader from "@/components/PageLoader.jsx";
import {Image} from "expo-image";
import { styles } from '@/assets/styles/home.styles.js';
export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { transactions,summary,isLoading,loadData,deleteTransaction} = useTransactions(user.id);
  useEffect(() => {
    loadData()
  },[loadData]);

  if(isLoading) return <PageLoader/>;

  return (
    <View style= {styles.container}>
      <View style={styles.content}>
        {/*HEADER*/}
        <View style={styles.header}>
          {/*LEFT*/}
          <View style={styles.headerLeft}>
            <Image 
              source={require("@/assets/images/logo.png")}
              style={styles.headerLogo}
              contentFit="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          {/*RIGHT*/ }
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton/>
          </View>
        </View>
      </View>
      
    </View>
  )
}