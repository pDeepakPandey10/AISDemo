import React, {useEffect } from 'react';
import { View, ActivityIndicator, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerContent } from './src/screens/DrawerContent';
import RootStackScreen from './src/firstThreeScreens/stackNavigation';
import { AuthContext } from './src/components/context';
import HomeScreen from './src/Home';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileScreen from './src/screens/profilePage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN': return {
        ...prevState,
        userName : action.id,
        userToken: action.token,
        isLoading: false
      };
      case 'LOGIN': return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false
      };
      case 'LOGOUT': return {
        ...prevState,
        userName: null,
        userToken: null,
        isLoading: false
      };
      case 'REGISTER': return {
        ...prevState,
        userName: action.id,
        isLoading: false
      };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (userName, password) => {
      let userToken,_data_user;
      userToken = null;
      _data_user = JSON.parse(await AsyncStorage.getItem('userData'));
      console.log("_data_user "+JSON.stringify(_data_user));
      if (userName == _data_user.username && password == _data_user.password) {
        try{
          userToken = 'cvac';
          await AsyncStorage.setItem('userToken',userToken)

        }catch(e){
          console.log(e);
        }
      }else{
        Alert.alert('Invalid Credentials');
      }
      dispatch({ type: 'LOGIN', id: _data_user, token: userToken });
    },
    signOut: async () => {
      try{
        await AsyncStorage.removeItem('userToken');
      }catch(e){
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp:async (_dataBanner) => {
      const json_data = JSON.stringify(_dataBanner);
      console.log(_dataBanner.name);
      try {
        await AsyncStorage.setItem("userData",json_data);
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: 'REGISTER',id:_dataBanner.username });
    }
  }), []);

  createHomeStack = ({ navigation }) => {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#009387'
        },
        headerTintColor: '#fff'
      }}>
        <Stack.Screen name="Home"
          options={{
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() =>
                navigation.openDrawer()} />
            )
          }}
          component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    )
  }
  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      let userName;
      userToken = null;
      userName = null;
      try{
        userToken = await AsyncStorage.getItem('userToken');
        userName = await AsyncStorage.getItem('userData');
        console.log("aayehaye "+userToken);
      }catch(e){
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken,id:userName });
    }, 1000);
  }, [])
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#0000ff" size="large" />
      </View>
    )
  }
  const passProps = loginState.userName;
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          console.log(passProps)
        }
        {
          (loginState.userToken !== null) ? (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} {...passProps} />}>
              <Drawer.Screen name="Home" children={createHomeStack} />
            </Drawer.Navigator>
          ) : <RootStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
export default App;