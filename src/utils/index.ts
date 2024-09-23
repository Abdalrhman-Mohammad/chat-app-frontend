import {Platform} from 'react-native';
import {io} from 'socket.io-client';
export const BaseUrl =
  Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://localhost:3000';
const BaseURL = 'http://localhost:4000/';
export const socket = io(BaseURL); // server port
