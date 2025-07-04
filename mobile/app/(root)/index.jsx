import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { SignOutButton } from '@/components/SignOutButton.jsx'
import { useTransactions } from '../../hooks/useTransactions'
import { useEffect } from 'react'
import PageLoader from "@/components/PageLoader.jsx";
import {Image} from "expo-image";
import { styles } from '@/assets/styles/home.styles.js';
import { BalanceCard } from '../../components/BalanceCard';
import {TransactionItem}  from '../../components/TransactionItem';
import { Alert } from 'react-native';
export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { transactions,summary,isLoading,loadData,deleteTransaction} = useTransactions(user.id);
  useEffect(() => {
    loadData()
  },[loadData]);


  const handleDelete = (id) => {
    Alert.alert("Delete Transaction","Are you sure you want to delete this transaction?",[
      {text : "Cancel",style:"cancel"},
      {text:"Delete",style:"destructive",onPress: () => deleteTransaction(id)},
    ]);
  }

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
        <BalanceCard summary={summary}/>

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>
      
      <FlatList 
      style={styles.transactionsList}
      contentContainerStyle={styles.transactionsListContent}
      data={transactions}
      renderItem={({item}) => (
        <TransactionItem item={item} onDelete={handleDelete} />
      )}/>
    </View>
  )
}