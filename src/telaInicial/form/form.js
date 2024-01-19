import { View, TouchableOpacity, Image, TextInput, Button } from 'react-native';

export default function Form (){
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
          <Button title='Deletar contatos' onPress={() => setRecipients([])} />
          
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
