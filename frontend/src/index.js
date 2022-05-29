import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from './theme';



//   green: {
//     50: '#F0FFF4',
//     500: '#38A169'


const root = document.getElementById('root');
ReactDOM.render(
<ChakraProvider theme={theme}>
    <App />
</ChakraProvider>
,root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

