import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as SMS from  'app_expo_celke';

//expo install expo-sms


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
    const {result} = await SMS.sendSMSAsync(
     Recipients,
     mensagem
    );


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
      <TextInput value={phonenumber} placeholder="Número do celular" onChangeText={(value)=> setphonenumber(value)}/>
      <Button title='Adicionar contato' onPress={addNumber}/>
      <TextInput value={mensagem} placeholder="Mensagem" onChangeText={(value) => setmensagem(value)}/>
      <Text>Recipients:</Text>
      {showRecipients()}
      <Button title='Limpar campo de contato' onPress={() => setRecipients([])} />
      {isAvailable? <Button title="Send SMS" onPress={sendSms} /> : <Text>Nenhum SMS</Text>}
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


