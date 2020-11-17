import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";


import {login} from "../store/actions"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default ({ navigation}) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [kondisi, setKondisi] = useState(false);
  const [kondisiPass, setKondisiPass] = useState(false);
  const [difficult, setDifficult] = useState('')
  const kondisiLogin = useSelector((state) => state.UserReducer.kondisiLogin);
  const loginError = useSelector((state)=>state.UserReducer.loginError)
  const dispatch = useDispatch()
  const submit = (level) => {
    if (name == "") {
        
      setKondisi(true);
    } else if(pass == ""){
      setKondisiPass(true)
    }else{
      let data = {
        email:name.toLowerCase(), password:pass
      }
      dispatch(login(data))
      
      
    }
  };

  useEffect(()=>{
    if(loginError == true){
     Alert.alert("Invalid username/password")
     
    }
   }, [loginError])

  useEffect(()=>{
   if(kondisiLogin == true){
     navigation.navigate("Home")
     setName("");
      setPass("");
   }
  }, [kondisiLogin])

  useEffect(() => {
    setTimeout(() => {
      setKondisi(false);
    }, 2000);
  }, [kondisi]);
  useEffect(() => {
    setTimeout(() => {
      setKondisiPass(false);
    }, 2000);
  }, [kondisiPass]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("masuk home page focus event")
      setName("");
      setPass("");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
     <KeyboardAwareScrollView keyboardShouldPersistTaps='always'
            contentContainerStyle={{ flexGrow: 1,  }} showsVerticalScrollIndicator>
      <View style={styles.inputField}>  
      <View style={{paddingBottom:20}}>
        <Text style={{fontSize:40}}>Login</Text>
      </View>
        {/* {kondisi && <Text style={{ color: "red"}}>Name required</Text>} */}
       <View style={styles.inputContainer}>
      <TextInput 
        placeholder="Enter Your Username"
        defaultValue={""}
        onChangeText={(text) => setName(text)}
        style={styles.inputStyle}
      />
         {kondisi && <Text style={{ color: "red"}}>Username required</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
        placeholder="Enter Your Password"
        defaultValue={""}
        onChangeText={(text) => setPass(text)}
        style={styles.inputStyle}
        secureTextEntry={true}
      />
       {kondisiPass && <Text style={{ color: "red"}}>Password required</Text>}
      </View>
      <View style={styles.button}>
      <Button title="Submit" onPress={() => submit()} />
      
      
      </View>

      <View style={{paddingTop: 30}}>
        <Text>Don't have account?</Text>
        
      </View>

      <View style={styles.button}>
      <Button title="register" onPress={() => navigate("Register")} />
      
      
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
    alignItems: "center",
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
  inputField:{
   flex: 1,
   marginTop: "60%",
   alignItems: "center",
  //  justifyContent: "center",
   
  },
  inputContainer:{
    marginBottom:10,
    alignItems:"center",
  },
  button:{
    // flex:1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    paddingTop:10
   
  }
});
