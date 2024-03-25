import React, {useEffect, useState} from 'react';
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
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import Header from '../../components/header';
import {AppStackParamList} from '../../navigations/app-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {db} from '../../firebase';

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
  FirestoreError,
} from 'firebase/firestore';
import Loader from '../../components/loader';

type ChatScreenProps = NativeStackScreenProps<AppStackParamList, 'Chat'>;
interface Message extends DocumentData {
  id: string;
  createdAt: {
    toDate(): Date;
  };
}
const Chat = ({navigation, route}: ChatScreenProps) => {
  const {user, provider, serviceId} = route.params;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  let userId = user?.id && user?.name + user?.id;
  let providerId = provider?.id && provider?.name + provider?.id;
  // let serviceId = provider?.service_id;
  const chatId =
    userId && providerId
      ? [userId, providerId, serviceId].sort().join('-')
      : null;

  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(db, 'Chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const msgs = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as Message[];
        setMessages(msgs);
        setLoading(false);
      },
      (error: FirestoreError) => {
        setError(error.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (text.trim().length === 0 || !chatId) return;

    const time = new Date();
    const userMsg = {
      text: text,
      sentBy: `provider_${provider?.id}`,
      sentTo: `user_${user?.id}`,
      createdAt: time,
    };
    try {
      const docRef = collection(db, 'Chats', chatId, 'messages');
      await addDoc(docRef, userMsg);
      setText('');
    } catch (error: any) {
      console.error('Error sending message: ', error);
      setError(error?.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onBackPress={() => navigation.goBack()}
        isChatScreen={true}
        user={user}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <View style={styles.errorText}>
          <Text>Error loading messages: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={[
                styles.messageBubble,
                item?.sentBy === `provider_${provider?.id}`
                  ? styles.userMessage
                  : styles.otherMessage,
              ]}>
              <Text style={styles.messageText}>{item.text}</Text>

              <Text style={styles.messageTime}>
                {item.createdAt?.toDate().toLocaleTimeString()}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.flatListContentContainer}
        />
      )}

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

// Your existing styles remain unchanged.

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContentContainer: {
    padding: rw(4),
  },
  messageBubble: {
    padding: rh(2),
    borderRadius: 20,
    marginBottom: rh(1),
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
    fontSize: rf(1.5),
    color: '#E1E1E1',
    marginTop: rh(0.5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rw(4),
    paddingVertical: rh(2),
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderWidth: 2,
    borderColor: '#E1E1E1',
    borderRadius: 20,
    paddingHorizontal: rw(4),
    marginRight: rw(2),
    height: rh(6),
  },
  sendButton: {
    backgroundColor: '#FF3131',
    borderRadius: 20,
    height: rh(6),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rw(4),
  },
  sendButtonText: {
    color: 'white',
    fontSize: rf(2),
  },
  errorText: {
    fontSize: rf(2),
    color: 'red',
    textAlign: 'center',
    marginTop: rh(20),
  },
});
