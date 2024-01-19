import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity, Image, TextInput, Text } from 'react-native';
import { useEffect, useState } from 'react';
import * as SMS from  'expo-sms';
import {styles} from './styles';



export default function App() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [phonenumber, setphonenumber] = useState(undefined);
  const [Recipients, setRecipients] = useState([]);
  const [mensagem, setmensagem] = useState(undefined);


  useEffect(() => {
    async function checkAvailability() {
      const isSmsAvailable = await SMS.isAvailableAsync();
      setIsAvailable(isSmsAvailable);
    }
    checkAvailability();
  }, []);


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
      <StatusBar style="auto" />
    </View>
  );


}




