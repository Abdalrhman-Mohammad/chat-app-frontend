import React from 'react';
import NavigationContainerComponent from './navigation/NavigationContainerComponent';
import UserInfoState from './contexts/UserInfo';
import ChatInfoState from './contexts/ChatInfo';
import MessagesInfoState from './contexts/MessagesInfo';

function App(): React.JSX.Element {
  return (
    <UserInfoState>
      <ChatInfoState>
        <MessagesInfoState>
          <NavigationContainerComponent />
        </MessagesInfoState>
      </ChatInfoState>
    </UserInfoState>
  );
}

export default App;
