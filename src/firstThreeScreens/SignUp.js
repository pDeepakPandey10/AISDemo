import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    TextInput,
    ScrollView,
    Alert
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../components/context';

const SignUpScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        name: '',
        email: '',
        birthDate: null,
        password: '',
        confirm_password: '',
        show_date: false,
        check_nameInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidEmail: false,
        check_textInputChange: true,
        date_selected: false
    })
    const textInputChange = (val) => {
        if (val.length != 0) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(val) === false) {
                console.log("Email is Not Valid");
                setData({
                    ...data,
                    email: val, // array Destructuring 
                    isValidEmail: false,
                    check_textChange: false
                });
            } else {
                setData({
                    ...data, // array Destructuring 
                    email: val,
                    isValidEmail: true,
                    check_textChange: true
                });
            }
        } else {
            setData({
                ...data, // array Destructuring 
                email: val,
                isValidEmail: false,
                check_textInputChange: true,
            });
        }

    }
    const nameInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data, // array Destructuring 
                name: val,
                check_nameInputChange: true

            });
        } else {
            setData({
                ...data, // array Destructuring 
                name: val,
                check_nameInputChange: false
            });
        }

    }
    const showDatePicker = () => {
        setData({
            ...data,
            show_date: true
        });
    }
    const dateChangeValue = (event, date) => {
        setData({
            ...data,
            birthDate: date.toLocaleString('default',{month : 'short'}),
            show_date: false,
            date_selected: true
        });
    }
    const handlePasswordChange = (val) => {
        setData({
            ...data, // array Destructuring 
            password: val,
        });
    }
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data, // array Destructuring 
            confirm_password: val,
        });
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }
    const { signUp } = React.useContext(AuthContext);
    const handleUserSignUp = (name, email, birthDate, password1, password2) => {
        console.log('birthDate0 ' + birthDate.toLocaleString('default',{month : 'short'}));
        if (name == '' || email == '' || password1 == '' || password2 == '') {
            Alert.alert('Enter all fields');
        } else if (password1 != password2) {
            Alert.alert('Passwords do not match');
        } else {
            const dataBanner = {
                username: email,
                password: password1,
                name: name,
                dob: birthDate
            };

            signUp(dataBanner);

            setData({
                ...data,
                name: '',
                email: '',
                birthDate: null,
                password: '',
                confirm_password: '',
                show_date: false,
                check_nameInputChange: false,
                secureTextEntry: true,
                confirm_secureTextEntry: true,
                isValidEmail: false,
                check_textInputChange: true,
                date_selected: false
            })
            Alert.alert('User Created Succeessfully, Please Login');
            navigation.navigate('SignInScreen');
        }
    }
    return (
        <View style={styles.container}>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.text_footer}>Name</Text>
                    <View style={styles.action}>
                        <Feather name="user" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Your Name"
                            style={styles.textInput}
                            value={data.name}
                            onChangeText={(val) => nameInputChange(val)}
                        />
                        {data.check_nameInputChange ?
                            <Feather name="check-circle" color="green" size={20} />
                            : null}
                    </View>
                    <Text style={styles.text_footer}>Date of Birth</Text>
                    <View style={styles.action}>
                        <Feather name="calendar" color="#05375a" size={20} />
                        <TouchableOpacity onPress={showDatePicker}>
                            {
                                data.date_selected ?
                                    (<Text style={[styles.text_footer, { marginHorizontal: 20 }]}>
                                        {data.birthDate}</Text>) :
                                    (<Text style={[styles.text_footer, { marginHorizontal: 20 }]}>
                                        Select Date</Text>)
                            }
                        </TouchableOpacity>
                        {data.show_date && (
                            <DateTimePicker
                                value={new Date()}
                                mode="date"
                                onChange={dateChangeValue} />
                        )}
                    </View>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <Feather name="user" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Enter Email Address"
                            style={styles.textInput}
                            value={data.email}
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {data.isValidEmail ?
                            <Feather name="check-circle" color="green" size={20} /> : null}
                    </View>
                    {
                        data.check_textInputChange ? null :
                            <Text style={{ color: 'red' }}>Username must be a valid Email Address</Text>
                    }
                    <Text style={[styles.text_footer, { marginTop: 40 }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather name="lock" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Create Password"
                            style={styles.textInput}
                            value={data.password}
                            secureTextEntry={data.secureTextEntry ? true : false}
                            onChangeText={(val) => handlePasswordChange(val)} />
                        <TouchableOpacity onPress={updateSecureTextEntry}>
                            {data.secureTextEntry ?
                                <Feather name="eye-off" color="green" size={20} />
                                : <Feather name="eye" color="green" size={20} />}
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.text_footer, { marginTop: 40 }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather name="lock" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Confirm Your Password"
                            style={styles.textInput}
                            value={data.confirm_password}
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            onChangeText={(val) => handleConfirmPasswordChange(val)} />
                        <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                            {data.confirm_secureTextEntry ?
                                <Feather name="eye-off" color="green" size={20} />
                                : <Feather name="eye" color="green" size={20} />}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.signIn}
                            onPress={() => { handleUserSignUp(data.name, data.email, data.birthDate, data.password, data.confirm_password) }}>
                            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                                <Text style={[styles.textSign, { color: '#fff' }]}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderRadius: 1,
                                marginTop: 10
                            }]}
                        >
                            <Text style={styles.textSign}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    date_picker: {
        marginLeft: 10,
        width: "100%"
    },
    gender_picker: {
        marginLeft: 10,
        width: "100%"
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 10
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