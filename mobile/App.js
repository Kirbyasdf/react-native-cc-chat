import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import io from 'socket.io-client';
const URL = process.env.REACT_APP_URL || 'http://localhost:3000';
const socket = io(URL);

const App = () => {
  const [message, setMessage] = useState('');
  const [chatlog, setChatlog] = useState([]);

  const sendMessage = () => {
    socket.emit('send-message', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('new-message', (msg) => {
      setChatlog([...chatlog, msg]);
      console.log(chatlog);
    });
  }, [chatlog]);

  const chatMessages = () =>
    chatlog.map((m) => <Text key={Math.random()}>{m}</Text>);

  return (
    <View style={styles.container}>
      {chatMessages()}
      <TextInput
        style={styles.chatInput}
        value={message}
        onSubmitEditing={() => sendMessage()}
        onChangeText={(text) => setMessage(text)}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 60,
  },
  chatInput: {
    height: 40,
    borderWidth: 2,
  },
});

export default App;
