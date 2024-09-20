import {createContext, useState} from 'react';
import {Message} from '../types/Message';
import {socket} from '../utils';
export const MessagesInfoContext = createContext<any>(null);

export default function MessagesInfoState({children}: any) {
  const [messagesInfo, setMessagesInfo] = useState<Message[]>([]);

  const addMessage = (title: string, message: string, user: string): string => {
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    };
    socket.emit('newMessage', {
      title: title,
      text: message,
      from: user,
      time: timeData,
    });
    setMessagesInfo([
      {text: message, from: user, time: timeData as {hr: string; mins: string}},
      ...messagesInfo,
    ]);
    console.log('data', messagesInfo, '    dddddaaaaaaaaaaa');
    return '';
  };
  return (
    <MessagesInfoContext.Provider
      value={{messagesInfo, setMessagesInfo, addMessage}}>
      {children}
    </MessagesInfoContext.Provider>
  );
}
