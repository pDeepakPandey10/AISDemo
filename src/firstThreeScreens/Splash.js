import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const SplashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assests/tempLogo.jpg')}
                    style={styles.logo}
                    resizeMode='stretch'
                />
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.title}>Some Catchy Welcome Note </Text>
                <Text style={styles.text}>Join the community</Text>
                <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity style={styles.touch_opacity}
                        onPress={() => navigation.navigate('SignInScreen')}>
                        <LinearGradient colors={['#08d4c4','#01ab9d']} style={styles.signIn}>
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={30}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default SplashScreen;

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
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        height: height_logo,
        width: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: '#777',
        marginTop: 5
    },
    textSign: {
        color: '#05375a',
        fontSize: 18,
        color:'#fff'
    },
    signIn:{
        width:150,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        flexDirection:'row'
    }
})