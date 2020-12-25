import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    TextInput,
    StatusBar,
    Alert
} from 'react-native';

import { AuthContext } from '../components/context';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const SignInScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        secureTextEntry: true,
        isValidUser: false,
        check_textChange : true
    })
    const textInputChange = (val) => {
        if (val.length != 0) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(val) === false) {
                console.log("Email is Not Valid");
                setData({
                    ...data, // array Destructuring 
                    isValidUser: false,
                    check_textChange:false
                });
                return false;
            } else {
                setData({
                    ...data, // array Destructuring 
                    email: val,
                    isValidUser: true,
                    check_textChange : true
                });
            }
        } else {
            setData({
                ...data, // array Destructuring 
                email: val,
                isValidUser : false,
                check_textChange : true
            });
        }

    }
    const handlePasswordChange = (val) => {
        setData({
            ...data, // array Destructuring 
            password: val,
        });
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    const { signIn } = React.useContext(AuthContext);
    const loginHandle = (username, password) => {
        if (data.isValidUser != true) {
            Alert.alert("Email is Not Valid");
        } else {
            signIn(username, password);
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action}>
                    <Feather name="user" color="#05375a" size={20} />
                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.isValidUser ?
                        <Feather name="check-circle" color="green" size={20} />
                        : null}
                </View>
                {
                    data.check_textChange ?  null :
                        <Text style={{ color: 'red' }}>Username must be a valid Email Address</Text>
                }
                <Text style={[styles.text_footer, { marginTop: 40 }]}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" color="#05375a" size={20} />
                    <TextInput
                        placeholder="Create Password"
                        style={styles.textInput}
                        secureTextEntry={data.secureTextEntry ? true : false}
                        onChangeText={(val) => handlePasswordChange(val)} />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                            <Feather name="eye-off" color="green" size={20} />
                            : <Feather name="eye" color="green" size={20} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn}
                        onPress={() => { loginHandle(data.email, data.password) }}
                    >
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                            <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderRadius: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={styles.textSign}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    touch_opacity: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    text_header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    textInput: {
        flex: 1,
        marginTop: Platform == 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a'
    },
    textSign: {
        color: '#05375a',
        fontSize: 20,
        fontWeight: 'bold'
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})