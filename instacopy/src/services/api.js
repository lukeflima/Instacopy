import axios from 'axios';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default axios.create({
  baseURL: "http://192.168.0.11:3000"
})