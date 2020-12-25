import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Avatar, Caption, Text } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

const ProfileScreen = (props) => {
  const [editable, setEditable] = useState(false);
  const [textColor, setTextColor] = useState("red");
  const [data, setData] = useState([]);
  const getUserData = async()=>{
    const userData = await AsyncStorage.getItem('userData');
    setData(userData);
  };
  useEffect(() =>{
    getUserData();
  },[])
  console.log("data "+data);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingLeft: 20 }}>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Avatar.Image
            source={{
              uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
            }}
            size={50}
          />
          <View style={{ marginLeft: 15, flexDirection: 'column', width: "70%" }}>
            <Text style={styles.title}>{data.name}</Text>
            <Caption style={styles.caption}>{data.username}</Caption>
          </View>
          <TouchableOpacity onPress={() => setEditable(!editable)}>
            <Feather name="edit" color="#05375a" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.action}>
        <Feather name="user" color="#05375a" size={20} />
        <TextInput
          style={[styles.textInput,{color:textColor}]}
          editable={editable}
          value={data.username}
        />
      </View>
      <View style={styles.action}>
        <Feather name="user" color="#05375a" size={20} />
        <TextInput
          sstyle={[styles.textInput,{color:textColor}]}
          editable={editable}
          value={data.name}
        />
      </View>
      <View style={styles.action}>
        <Feather name="lock" color="#05375a" size={20} />
        <TextInput
          style={[styles.textInput,{color:textColor}]}
          editable={editable}
          value={data.password}
        />
      </View>
    </View>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform == 'ios' ? 0 : -12,
    paddingLeft: 10
  },
});