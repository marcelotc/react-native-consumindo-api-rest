import React from 'react';
import {StyleSheet,Button, View, AsyncStorage} from 'react-native';

import api from './services/api'

const App = () => {

    state = {
      errorMessage: null,
    }
  
  signIn = async () => {
  
    try{
    const response =  await api.post('auth/authenticate', {
      email: 'marcelo@gmail.com',
      senha: '123'
    });
    
    const { user, token } = response.data;

    await AsyncStorage.multiSet([
      ['@CodeApi:token', token],
      ['@CodeApi:user', JSON.stringify(user)],
    ]);
  } catch(err) {
    this.setState({ errorMessage: response.data.error })
  }
      
  }; 
    
  return (
    <View style={styles.container}>
      { this.state.errorMessage && <Text>{this.state.errorMessage}</Text> }
      <Button onPress={this.signIn} title='Entrar'></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  }
});

export default App;   
      