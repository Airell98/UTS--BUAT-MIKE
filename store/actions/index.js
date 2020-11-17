
let baseUrl = "http://escplorecloth.com/api/auth/"

export function login(value) {
  console.log(value)
  return (dispatch) => {
    
console.log(baseUrl)
    fetch(`${baseUrl}login`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json", 
        
        },
    })
      .then((response) => response.json())
      .then((data) => {
       
       if(data !== undefined){

         dispatch({
           type:"USER_TOKEN",
           payload:data
         })
       }else{
        dispatch({
          type:"LOGIN_ERROR",
          
        })
       }
      })
      .catch(err=>{
        console.log("masuk login errror")
        dispatch({
          type:"LOGIN_ERROR",
          
        })
      });
  };
}


export function getUserData(value){
 console.log(value, "ini tokennya dari getUserData")
  return (dispatch) => {
    fetch(`${baseUrl}user`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer "+ value, 
        
        },
    })
      .then((res) => res.json())
      .then((data) => {
       
        dispatch({
          type: "INPUT_USER_DATA",
          payload: data.data[0],
        });
      })
      .catch((err) => {
        console.log(err, "error dari get user data");
      });
  };
}


export function getListKuliah(value){
 
  return (dispatch) => {
    fetch(`${baseUrl}matkul`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer "+ value, 
        
        },
    })
      .then((res) => res.json())
      .then((data) => {
     
        dispatch({
          type: "INPUT_LIST_KULIAH",
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err, "error dari get list kuliah");
      });
  };
}


export function getHistoryPembayaran(value){
 console.log(value, "ini valuenya sobattt")
  return (dispatch) => {
    fetch(`${baseUrl}histori`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer "+ value, 
        
        },
    })
      .then((res) => res.json())
      .then((data) => {
       console.log(data, "ini history pembayaran")
        dispatch({
          type: "INPUT_HISTORY",
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err, "error dari get history pembayaran");
      });
  };
}


