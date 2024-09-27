import {Chat} from './Chat';

export interface User {
  // id: string;
  name: string;
  chats: Chat[];
}

export type statusAndChatsType = {
  status: boolean;
  chats: Chat[];
};
