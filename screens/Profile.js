import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {

  //header section
  const header = <View style={styles.header}>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="arrow-back" size={24} color="white"   />
      </TouchableOpacity>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <Image source={require('../assets/Profile.png')}  style={styles.image} />
    </View>
  //handling the buttons 
  const handleTitleChange = () => {
    // Logic for changing the title
  }

  const handleRemove = () => {
    // Logic for removing the component
  }
  //Personal info section
  const personalInf0 = <View style={styles.personalInf0Style}>
      <Text style={styles.HeaderText}>Personal information</Text>
      <Text style={styles.TitleStyle}>Avatar </Text>
      <View style={styles.AvactarSectionStyle}>
        <Image source={require('../assets/Profile.png')}  style={styles.imageAvatar} />
        <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: 'grey'}]}>
            <Text>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: 'white'}]}>
            <Text>Remove</Text>
          </TouchableOpacity>
      </View>
      <Text style={styles.TitleStyle}>First name </Text>
      <View style={styles.userInfoStyle}> 
        <Text style={styles.TitleHolderStyle}> Mero </Text>
      </View>
      <Text style={styles.TitleStyle}>Last name </Text>
      <View style={styles.userInfoStyle}> 
        <Text style={styles.TitleHolderStyle}> Mo </Text>
      </View>
      <Text style={styles.TitleStyle}>Email </Text>
      <View style={styles.userInfoStyle}> 
        <Text style={styles.TitleHolderStyle}> ad@gmail.ca </Text>
      </View>
      <Text style={styles.TitleStyle}>Phone number  </Text>
      <View style={styles.userInfoStyle}> 
        <Text style={styles.TitleHolderStyle}> 709-21199-122 </Text>
      </View>
  </View>

  //notification section
  const EmailNotificationInfo = <View>
      <Text style={styles.HeaderText}>Email notification</Text>
  </View>
  
  //main view container  section
  const infoSection = <View style={styles.infoSectionContainer}>
      {personalInf0}
      {EmailNotificationInfo}
      <View style={{marginTop: 100}}>
        <TouchableOpacity style={[styles.LogoutStyle, {backgroundColor: 'yellow'}]}>
          <Text>Log out</Text>
        </TouchableOpacity>
        <View style={styles.ChangeStyleSection}>
          <TouchableOpacity style={[styles.ChangeStyle, {backgroundColor: 'white'}]}>
              <Text>Discard Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.ChangeStyle, {backgroundColor: 'grey'}]}>
              <Text>Remove</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>

  return (
    <View style={styles.Maincontainer}>
      {header}
      {infoSection}
    </View>
  );
}

const styles = StyleSheet.create({
  Maincontainer: {
    width: '100%',
    height: '100%'
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  header: {
    alignItems: 'center',
    height: '12%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10
  },
  logo: {
      marginTop: 30,
      width: 200, 
      height: 75, 
      resizeMode: 'contain',
  },
  image: { 
    marginTop: 30,
    width: 90, 
    height: 50, 
    resizeMode: 'contain',
  },
  infoSectionContainer: {
    borderRadius:20,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    height: '85%',
    margin: 5,
  },
  HeaderText: {
    fontSize: 22,
    fontWeight: 'reqular',
    textAlign: 'left',
    paddingTop: 15,
  }, 
  AvactarSectionStyle: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  imageAvatar: { 
    // marginTop: 30,
    width: 90, 
    height: 50, 
    resizeMode: 'contain',
  },
  TitleStyle: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'left',
    paddingTop: 15,
    color: "#333333"
  },
  TitleHolderStyle: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'left',
    padding: 10,
    color: "#333333", 
  },
  personalInf0Style: {
    width: '100%',
  },
  userInfoStyle : {
    borderRadius: 15,
    width: '90%',
    borderWidth: 1,
    borderColor: 'grey',
    height: 40, 
    marginTop: 5
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center' ,
    borderRadius: 10,
    width: 100,
    borderWidth: 1,
    borderColor: 'grey',
  },
  LogoutStyle: {
    justifyContent: 'center',
    alignItems: 'center' ,
    borderRadius: 10,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'red',
  },
  ChangeStyle: {
    justifyContent: 'center',
    alignItems: 'center' ,
    borderRadius: 10,
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
  } ,
  ChangeStyleSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
});
