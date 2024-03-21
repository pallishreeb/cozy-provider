import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
import Header from '../../components/header';
import {AppStackParamList} from '../../navigations/app-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Example messages data
const initialMessages = [
  {id: '1', text: 'Hello there!', isUser: false, time: '10:45 AM'},
  {
    id: '2',
    text: 'Hi! How can I help you today?',
    isUser: true,
    time: '10:46 AM',
  },
  // Add more messages here
];
type ChatScreenProps = NativeStackScreenProps<AppStackParamList, 'Chat'>;

const Chat = ({navigation}: ChatScreenProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (text.trim().length > 0) {
      const newMessage = {
        id: Date.now().toString(),
        text,
        isUser: true,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} isChatScreen={true} />
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageBubble,
              item.isUser ? styles.userMessage : styles.otherMessage,
            ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContentContainer}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContentContainer: {
    padding: wp(4),
  },
  messageBubble: {
    padding: hp(2),
    borderRadius: 20,
    marginBottom: hp(1),
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#FF3131',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: 'gray',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: 'white',
  },
  messageTime: {
    alignSelf: 'flex-end',
    fontSize: fp(1.5),
    color: '#E1E1E1',
    marginTop: hp(0.5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderWidth: 2,
    borderColor: '#E1E1E1',
    borderRadius: 20,
    paddingHorizontal: wp(4),
    marginRight: wp(2),
    height: hp(6),
  },
  sendButton: {
    backgroundColor: '#FF3131',
    borderRadius: 20,
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  sendButtonText: {
    color: 'white',
    fontSize: fp(2),
  },
});
