import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView, Alert } from "react-native";
import {useDispatch, useSelector} from "react-redux"
import {getUserData, getHistoryPembayaran} from "../store/actions"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default ({ navigation: { navigate } }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [kondisi, setKondisi] = useState(false);
  const [kondisiPass, setKondisiPass] = useState(false);
  const [difficult, setDifficult] = useState('')
  const token = useSelector((state)=>state.UserReducer.token)
  const history = useSelector((state)=>state.UserReducer.history)
  const user = useSelector((state)=>state.UserReducer.user)

  const dispatch = useDispatch();
 
//  const getUserData = ()=>{
   
//  }

 

  useEffect(() => {
    dispatch(getHistoryPembayaran(token))
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
     <KeyboardAwareScrollView keyboardShouldPersistTaps='always'
            contentContainerStyle={{ flexGrow: 1,  }} showsVerticalScrollIndicator>
    
    <View style={styles.inputField}> 

  {  history.length >0 && history.map((el, idx)=>{
     return (
     <View style={{backgroundColor:"white", padding:10, borderRadius:5, width:"80%",marginBottom:10}} key={idx}>
         <View>

           <Text style={{fontWeight:"bold"}}>Nama</Text>
           <Text>{el.nama}</Text>
           </View>
            <View>

           <Text style={{fontWeight:"bold"}}>Nominal</Text>
           <Text>{el.nominal}</Text>
           </View>
           <View>

<Text style={{fontWeight:"bold"}}>Sisa Pembayaran</Text>
<Text>{el.sisa_pembayaran}</Text>
</View>
<View>

   <Text style={{fontWeight:"bold"}}>Deskripsi</Text>
      <Text>{el.deskripsi}</Text>
   </View>
       </View>)
  }) }
       <View>

       </View>
       <View style={{paddingBottom:10}}>
<Button title="Kembali" onPress={()=>navigate("Home")}/>
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
