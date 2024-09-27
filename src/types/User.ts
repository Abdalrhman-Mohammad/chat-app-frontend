import {Chat} from './Chat';

export interface User {
  // id: string;
  name: string;
  chatsID: string[];
}

export type statusAndChatsType = {
  status: boolean;
  chats: Chat[];
};
