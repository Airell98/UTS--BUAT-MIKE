import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView, Alert } from "react-native";
import {useDispatch, useSelector} from "react-redux"
import {getListKuliah, getUserData} from "../store/actions"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default ({ navigation: { navigate } }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [kondisi, setKondisi] = useState(false);
  const [kondisiPass, setKondisiPass] = useState(false);
  const [difficult, setDifficult] = useState('')
  const token = useSelector((state)=>state.UserReducer.token)
  const user = useSelector((state)=>state.UserReducer.user)
  const listKuliah = useSelector((state)=>state.UserReducer.listKuliah)
  const kondisiLogin = useSelector((state) => state.UserReducer.kondisiLogin);
  const dispatch = useDispatch();
 
//  const getUserData = ()=>{
   
//  }

const getMatkul = ()=>{
    // console.log(token,"apakah tokennya ada")
 dispatch(getListKuliah(token))
}
useEffect(() => {
    console.log(listKuliah,"ini adalah listKuliah di halaman userData")
   if(listKuliah.length >0 ){
     navigate("List Kuliah")
   }
  }, [listKuliah]);

  useEffect(() => {
    dispatch(getUserData(token))
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
     <KeyboardAwareScrollView keyboardShouldPersistTaps='always'
            contentContainerStyle={{ flexGrow: 1,  }} showsVerticalScrollIndicator>
    
    <View style={styles.inputField}> 

    <View style={{backgroundColor:"white", padding:10, borderRadius:5}}>
        <View style={styles.dataWrapper}>
           <View > 
              <Text style={{fontWeight:"bold"}}>NIM</Text>
           </View>

           <View>
             <Text>{user.nim}</Text>
           </View>
     </View>

        <View style={styles.dataWrapper}>
           <View > 
             <Text style={{fontWeight:"bold"}}>Nama</Text>
            </View>
       <View>
  <Text>{user.name}</Text>
           </View>
           </View>

           <View style={styles.dataWrapper}>
      <View > 
       <Text style={{fontWeight:"bold"}}>Email</Text>
       </View>
       <View>
  <Text>{user.email}</Text>
           </View>
           </View>

           <View style={styles.dataWrapper}>
      <View > 
       <Text style={{fontWeight:"bold"}}>Alamat</Text>
       </View>
       <View>
  <Text>{user.alamat}</Text>
           </View>
           </View>
           <View style={styles.dataWrapper}>
      <View > 
       <Text style={{fontWeight:"bold"}}>Agama</Text>
       </View>
       <View>
  <Text>{user.agama}</Text>
           </View>
           </View>
           <Button title="cek mata kuliah" onPress={()=>getMatkul()}/>
           <View style={{paddingTop:10}}>

           <Button title="cek histori pembayaran"  onPress={()=>navigate("Histori Pembayaran")}/>
           </View>

               
           </View>
       <View>

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
   marginTop: "50%",
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
