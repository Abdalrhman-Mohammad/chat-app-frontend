import {Chat} from './Chat';

export interface User {
  // id: string;
  name: string;
  chats: Chat[];
  notificationToken?:string;
}

export type statusAndChatsType = {
  status: boolean;
  chats: Chat[];
};
