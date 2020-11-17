import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView, Alert } from "react-native";
import {useDispatch, useSelector} from "react-redux"
import {getUserData} from "../store/actions"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default ({ navigation: { navigate } }) => {
  const [desc, setDesc] = useState("");
  const [harga, setHarga] = useState("");
  const [sisa, setSisa] = useState("")
  const [kondisiHarga, setKondisiHarga] = useState(false);
  const [kondisiDesc, setKondisiDesc] = useState(false);
  const [kondisiSisa, setKondisiSisa] = useState(false)
  const token = useSelector((state)=>state.UserReducer.token)
  const listKuliah = useSelector((state)=>state.UserReducer.listKuliah)
  const user = useSelector((state)=>state.UserReducer.user)
  const baseUrl = useSelector((state)=>state.UserReducer.baseUrl)

  const dispatch = useDispatch();
 
//  const getUserData = ()=>{
   
//  }

  const daftarKuliah=()=>{
    if (desc == "") {
        
        setKondisiDesc(true);
        setTimeout(() => {
            setKondisiDesc(false);
          }, 2000);
      } else if(harga == ""){
        setKondisiHarga(true)
        setTimeout(() => {
            setKondisiHarga(false);
          }, 2000);
      }else if(sisa == ""){
        setKondisiSisa(true)
        setTimeout(() => {
            setKondisiSisa(false);
          }, 2000);
      }else{
          let data = {
              nim: user.nim,
              nama:user.name,
              nominal:harga,
              deskripsi:desc,
              sisa_pembayaran:sisa,
              status:"",

          }
        fetch(`${baseUrl}bayar`, {
            method: "POST",
            body:JSON.stringify(data),
            headers: {
              "Authorization": "Bearer "+ token, 
              "Content-Type": "application/json", 
              
              },
          })
            .then((res) => res.json())
            .then((response)=>{
                navigate("Histori Pembayaran")
            }).catch(err=>{
                console.log(err,"errror dari function pembayaran")
            })
      }
  }

//   useEffect(() => {
//     dispatch(getUserData(token))
//   }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
     <KeyboardAwareScrollView keyboardShouldPersistTaps='always'
            contentContainerStyle={{ flexGrow: 1,backgroundColor:"lightblue"  }} showsVerticalScrollIndicator>
    
    <View style={styles.inputField}> 
    <View style={styles.inputContainer}>
        <Text style={{alignSelf:"flex-start", fontWeight:"bold"}}>Nim</Text>
        <TextInput 
        // placeholder="Enter Your Description"
        defaultValue={user.nim}
        editable={false}
        style={styles.inputStyle}
       
      />
       {/* {kondisiHarga && <Text style={{ color: "red"}}>Description required</Text>} */}
      </View>

      <View style={styles.inputContainer}>
        <Text style={{alignSelf:"flex-start", fontWeight:"bold"}}>Nama</Text>
        <TextInput 
        // placeholder="Enter Your Description"
        defaultValue={user.name}
        editable={false}
        style={styles.inputStyle}
       
      />
       {/* {kondisiHarga && <Text style={{ color: "red"}}>Description required</Text>} */}
      </View>

   
      

    <View style={styles.inputContainer}>
    <Text style={{alignSelf:"flex-start", fontWeight:"bold"}}>Nominal Pembayaran</Text>
        <TextInput 
        // placeholder="Enter "
        defaultValue={""}
        onChangeText={(text) => setHarga(text)}
        style={styles.inputStyle}
        keyboardType={"numeric"}
        
      />
       {kondisiHarga && <Text style={{ color: "red"}}>Nominal Pembayaran required</Text>}
      </View>

      <View style={styles.inputContainer}>
    <Text style={{alignSelf:"flex-start", fontWeight:"bold"}}>Sisa Pembayaran</Text>
        <TextInput 
        // placeholder="Enter "
        defaultValue={""}
        onChangeText={(text) => setSisa(text)}
        style={styles.inputStyle}
        keyboardType={"numeric"}
        
      />
       {kondisiSisa && <Text style={{ color: "red"}}>Sisa Pembayaran required</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text style={{alignSelf:"flex-start", fontWeight:"bold"}}>Deskripsi</Text>
        <TextInput 
        // placeholder="Enter Your Description"
        defaultValue={""}
        onChangeText={(text) => setDesc(text)}
        style={styles.descInputStyle}
        multiline={true}
      />
       {kondisiDesc && <Text style={{ color: "red"}}>Description required</Text>}
      </View>
   <Button title="Daftar" onPress={()=>daftarKuliah()}/>

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
  descInputStyle:{
    height: 75,
    width: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    textAlign: "center",
    
  },
  inputField:{
   flex: 1,
   marginTop: "15%",
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
   
  },
  dataWrapper:{
      paddingBottom:10
  }
});
