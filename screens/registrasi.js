import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView, Alert, Picker } from "react-native";
import DatePicker from "react-native-datepicker"
import { useSelector, useDispatch } from "react-redux";


import {login} from "../store/actions"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default ({ navigation: { navigate } }) => {
    const baseUrl = useSelector((state)=>state.UserReducer.baseUrl)
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("")
  const [user, setUser] = useState({
    no_ktp:"",
      name:"",
      password:"",
      password_confirmation:"",
      email:"",
      agama:"",
      motivasi:"",
      alamat:"",
      gender:"",
      tempat_lahir:"",
      tanggal_lahir:"",
      nama:"",
      nim:""



  })
  const [kondisi, setKondisi] = useState(false);
  const [kondisiPass, setKondisiPass] = useState(false);
  const [difficult, setDifficult] = useState('')
  const [genderList, setGenderList] = useState( [
    {label:"Laki-laki",value:"Laki-laki"},
    {label:"Perempuan", value:"Perempuan"},
    
   ]);
  const kondisiLogin = useSelector((state) => state.UserReducer.kondisiLogin);
  const dispatch = useDispatch()
  const submit = (level) => {
    if (user.name == "") {
        
        Alert.alert('Nama harus diisi');
    } else if(user.password == ""){
        Alert.alert('Password harus diisi');
    }else if(user.email == ""){
        Alert.alert('Email harus diisi');

    } else if(user.nim == ""){
        Alert.alert('Jenis kelamin harus diisi');
    }else if(user.no_ktp == ""){
        Alert.alert('no KTP harus diisi');
    
    }else if(user.gender == ""){
        Alert.alert('Jenis kelamin harus diisi');
    }
    else if(user.alamat == ""){
        Alert.alert('Alamat harus diisi');
    }else if(user.tempat_lahir == ""){
        Alert.alert('Tempat lahir harus diisi');
    }else if(user.tanggal_lahir == ""){
        Alert.alert('Tanggal lahir harus diisi');
    }else if(user.agama == ""){
        Alert.alert('Agama harus diisi');
    }else if(user.motivasi == ""){
        Alert.alert('motivasi harus diisi');
    }else{
        fetch(`${baseUrl}signup`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json", 
              
              },
          }) .then((response) => response.json())
          .then((result)=>{
              if(result.message == "Successfully created user!"){

                   navigate("Login")
                   setUser({  no_ktp:"",
                   name:"",
                   password:"",
                   password_confirmation:"",
                   email:"",
                   agama:"",
                   motivasi:"",
                   alamat:"",
                   gender:"",
                   tempat_lahir:"",
                   tanggal_lahir:"",
                   nama:"",
                   nim:""})
              }else{
                Alert.alert('Network error!');
              }
            console.log(result)
          }).catch(err=>{
              console.log(err, "dari register create")
          })
        console.log(user, "ini usernya yang sudah di ketik di input")
    }
  };

 

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
     <KeyboardAwareScrollView keyboardShouldPersistTaps='always'
            contentContainerStyle={{ flexGrow: 1,  }} showsVerticalScrollIndicator>
      <View style={styles.inputField}>  
      <View style={{paddingBottom:20}}>
        <Text style={{fontSize:40}}>Register</Text>
      </View>
       
       <View style={styles.inputContainer}>
           <Text style={styles.textStyle}>Nama</Text>
      <TextInput 
      
        defaultValue={""}
        onChangeText={(text) => setUser({...user, name:text, nama:text})}
        style={styles.inputStyle}
      />
        
      </View>
      <View style={styles.inputContainer}>
      <Text style={styles.textStyle}>Password</Text>
        <TextInput 
       
        defaultValue={""}
        onChangeText={(text) => setUser({...user, password:text, password_confirmation:text})}
        style={styles.inputStyle}
        secureTextEntry={true}
      />
       
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textStyle}>Email</Text>
        <TextInput 
       
        defaultValue={""}
        onChangeText={(text) => setUser({...user, email:text.toLowerCase()})}
        style={styles.inputStyle}
        
      />
       
      </View>
      <View style={styles.inputContainer}>
      <Text style={styles.textStyle}>Nim</Text>
        <TextInput 
        placeholder=""
        defaultValue={""}
        onChangeText={(text) => setUser({...user, nim:text})}
        style={styles.inputStyle}
        keyboardType={"numeric"}
      />
      
      </View>
      <View style={styles.inputContainer}>
      <Text style={styles.textStyle}>No KTP</Text>
        <TextInput 
        placeholder=""
        defaultValue={""}
        onChangeText={(text) => setUser({...user, no_ktp:text})}
        style={styles.inputStyle}
        keyboardType={"numeric"}
      />
      
      </View>
      <View>
      <Text style={styles.textStyle}>Jenis Kelamin</Text>
      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={user.gender}
        style={styles.inputStyle}
        onValueChange={(itemValue, itemIndex) => setUser({...user, gender:itemValue})}
      >
      <Picker.Item label={""} value={""} />
      {genderList.map((value, idx)=>{
          return  (
         <Picker.Item label={value.label} value={value.value} key={idx} />
          )
      })}
          </Picker>
      
      </View>
      </View>

      <View style={styles.inputContainer}>
           <Text style={styles.textStyle}>Alamat</Text>
      <TextInput 
      
        defaultValue={""}
        onChangeText={(text) => setUser({...user, alamat:text})}
        style={styles.inputStyle}
      />
        
      </View>


      <View style={styles.inputContainer}>
           <Text style={styles.textStyle}>Tempat Lahir</Text>
      <TextInput 
      
        defaultValue={""}
        onChangeText={(text) => setUser({...user, tempat_lahir:text})}
        style={styles.inputStyle}
      />
        
      </View>

      <View style={styles.inputContainer}>
           <Text style={styles.textStyle}>Tanggal Lahir</Text>
           <View style={styles.pickerContainer}>
           <DatePicker
        style={{width: 200}}
        date={user.tanggal_lahir}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        // minDate="2016-05-01"
        // maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {setUser({...user, tanggal_lahir:date})}}
      />
      </View>
        
      </View>

      <View style={styles.inputContainer}>
           <Text style={styles.textStyle}>Agama</Text>
      <TextInput 
      
        defaultValue={""}
        onChangeText={(text) => setUser({...user, agama:text})}
        style={styles.inputStyle}
      />
        
      </View>

      <View style={styles.inputContainer}>
           <Text style={styles.textStyle}>Motivasi</Text>
      <TextInput 
      multiline={true}
        defaultValue={""}
        onChangeText={(text) => setUser({...user, motivasi:text})}
        style={styles.motivasiStyle}
      />
        
      </View>
      <View style={styles.button}>
      <Button title="Submit" onPress={() => submit()} />
      
      
      </View>

      {/* <View style={{paddingTop: 30}}>
        <Text>Already have your account?</Text>
        
      </View> */}

      <View style={styles.button}>
      <Button title="back" onPress={() => navigate("Login")} />
      
      
      </View>
      </View>
    
      </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    // alignItems: "center",
    justifyContent: "center",
    }, 
  inputStyle:{
    height: 45,
    width: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    textAlign: "center",
    
  },
  motivasiStyle:{
    height: 65,
    width: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    textAlign: "center",
  },
  inputField:{
   flex: 1,
   marginTop: "30%",
   alignItems: "center",
  //  justifyContent: "center",
   
  },
  inputContainer:{
    marginBottom:10,
    alignItems:"center",
  },
  pickerContainer:{
    marginBottom:10,
    alignItems:"center",
    backgroundColor:"white",
    borderRadius:4,
    borderWidth:1
  },
  button:{
    // flex:1,
    
 
    // paddingTop:,
    paddingBottom:20
   
  },
  textStyle:{
  fontWeight:"bold",
  alignSelf:"flex-start"
  }
});
