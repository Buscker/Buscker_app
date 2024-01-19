import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity, Image, TextInput, Text } from 'react-native';
import { useEffect, useState,useRef } from 'react';
import * as SMS from  'expo-sms';
import {styles} from './styles';
import MapView, { Marker } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location'
//expo install expo-sms


export default function App() {

  const [isAvailable, setIsAvailable] = useState(false);
  const [phonenumber, setphonenumber] = useState(undefined);
  const [Recipients, setRecipients] = useState([]);
  const [mensagem, setmensagem] = useState(undefined);

  const [location,setLocation] = useState(LocationObject);
  const mapRef = useRef(MapView);

  async function requestlocationPermissions(){
    const {granted} = await requestForegroundPermissionsAsync();
    const currentposition = await getCurrentPositionAsync();
    setLocation(currentposition)

    if( granted) {
      console.log("Localização atual: ",currentposition);
    }
    
  }


    // renderizar interface
  useEffect(() => {
    requestlocationPermissions();
    async function checkAvailability() {
      const isSmsAvailable = await SMS.isAvailableAsync();
      setIsAvailable(isSmsAvailable);
    }
    checkAvailability();
  }, []);

  useEffect(() =>{
    watchPositionAsync({
      accuracy:LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      //console.log("Nova localização!", response);
      setLocation(response);
      
      //mapRef.current?.animateCamera({
        
        //center: response.coords
      //})
    })
  },[]);


  const sendSms = async () => {
    const {result} = await SMS.sendSMSAsync(Recipients,"Seja bem vind@ ao Buscker!");

    if (result === "sent"){
      alert("mensagem enviada com successo")
    }
    console.log(result);
  };


  const addNumber = () => {
    let newRecipients = [... Recipients];
    newRecipients.push(phonenumber);
    setRecipients(newRecipients);
    setphonenumber(undefined);
  };
  const showRecipients = () => {
    if (Recipients.length === 0) {
      return <Text>Nenhum contato adicionado!</Text>
    }
    return Recipients.map((Recipient, index) => {
      return <Text key={index}>{Recipient}</Text>;
    });
  };


  return (
    <View style={styles.container}>
    
      
      <Image
        source={require('./assets/buttons/buscker.png')}
      />

      <TextInput value={phonenumber} placeholder="Número do celular" onChangeText={(value)=> setphonenumber(value)}/>
        <TouchableOpacity
        onPress={addNumber}
            activeOpacity={0.5}>
            <Image
              source={require('./assets/buttons/addcontact.png')}
            />
          </TouchableOpacity>


      <TextInput value={mensagem} placeholder="Mensagem" onChangeText={(value) => setmensagem(value)}/>
      <Text>Recipients:</Text>
      {showRecipients()}


      <TouchableOpacity
         onPress={() => setRecipients([])}
            activeOpacity={0.5}>
            <Image
              source={require('./assets/buttons/deletebutton.png')}
            />
          </TouchableOpacity>


      
      <TouchableOpacity
         onPress={sendSms}
            activeOpacity={0.5}>
            <Image
              source={require('./assets/buttons/sendmessage.png')}
            />
          </TouchableOpacity>

          {
        location &&
        <MapView 
       
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
      
        >
          <Marker coordinate={{
            latitude:location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}/>


        </MapView>
      }
      <StatusBar style="auto" />
    </View>
  );


}




