import react, { useState } from 'react';
import {View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

export default function Onboarding  ({handleOnboardingCompleted})  {

    const [name, setName ]= useState('');
    const [email, setEmail] = useState('');
    //error initial 
    const [nameError, setNameError ]= useState(null)
    const [emailError, setEmailError ]= useState(null)
    // name error functions 
    const validateName = () => {
        if (name === '') {
          setNameError('Please enter your name');
        } else if (!/^[a-zA-Z]+$/.test(name)) {
          setNameError('Name should contain only string characters');
        } else {
          setNameError(null);
        }
      };
    //email error func 
    const validateEmail = () => {
        if (email === '') {
          setEmailError('Please enter your email');
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ) {
          setEmailError('Please enter a valid email address');
        } else {
          setEmailError(null);
        }
      };
    //button on press 
    const handleCompleteOnboarding = () => { 
        if (name === '') {
          setNameError('Please enter your name');
        } else if (!/^[a-zA-Z]+$/.test(name)) {
          setNameError('Name should contain only string characters');
        } else if (email === '') {
          setEmailError('Please enter your email');
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ) {
          setEmailError('Please enter a valid email address');
        } else {
          handleOnboardingCompleted({name, email});
          setEmailError(null);
          setNameError(null);
        } 
    }    
    const isDisabled = nameError !== null || emailError !== null;
    return(
        <View style={styles.Maincontainer}>
            <View style={styles.header}>
                <Image source={require('../assets/Logo.png')} style={styles.logo} />
            </View>
            <View style={styles.CenterContainer}>
                <Text style={styles.HeaderText}>Lets us get to know you </Text>
                <View style={styles.InfoContainer}>
                    <Text style={styles.HeaderText}>First Name</Text>
                    <TextInput
                        style={styles.InputStyle}
                        placeholder='name'
                        value={name}
                        onChangeText={(text) => setName(text)}
                        onBlur={validateName}
                    />
                    {nameError && <Text tyle={styles.error}>{nameError}</Text>}
                    <Text style={styles.HeaderText}>Email </Text>
                    <TextInput
                        style={styles.InputStyle}
                        placeholder='email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onBlur={validateEmail}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        keyboardType="email-address"
                        />
                    {emailError && <Text tyle={styles.error}>{emailError}</Text>}
                </View>
                <View style={styles.ButtonViewStyle}>
                    <Button 
                        title='Next'
                        onPress={handleCompleteOnboarding}
                        disabled={isDisabled}
                        color="black"
                        style={styles.ButtoneStyle}
                        titleStyle={{ fontSize: 18, color: 'Red' }}
                        />
                </View> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Maincontainer: {
      width: '100%',
      height: '100%'
    },
    header: {
      alignItems: 'center',
      backgroundColor: '#AAC3F8',
      height: '7%',
      width: '100%'
    },
    logo: {
      marginTop: 5 ,
      width: '60%', 
      height: '80%', 
      resizeMode: 'contain'
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
    CenterContainer: { 
        backgroundColor: "#EDEFEE",
        height: "100%"
    },
    InfoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%'
    },
    HeaderText: {
        fontSize: 24,
        fontWeight: 'reqular',
        textAlign: 'center',
        paddingTop: 20
    },
    InputStyle: {
        borderWidth: 3, 
        borderColor: 'black', 
        width: 250, 
        height: 40, 
        borderRadius: 15,
        paddingLeft: 10,
        margin: 15
    },
    ButtonViewStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    ButtoneStyle:{
        height: 40, 
        width: 80, 
        borderColor: 'black', 
        borderWidth: 4, 
        backgroundColor: '#AAC3F8', 
        borderRadius: 5
    }
  });
  