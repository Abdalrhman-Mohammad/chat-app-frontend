import {Chat} from './Chat';

export interface User {
  // id: string;
  name: string;
  chats: Chat[];
  notificationToken:string|undefined;
}

export type statusAndChatsType = {
  status: boolean;
  chats: Chat[];
};
