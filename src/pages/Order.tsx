import { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';
import DefaultLayout from '../layout/DefaultLayout';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';



const Order = () => {
  // useEffect(() => {
  //   const socket = new SockJS('http://localhost:5454/ws');
  //   const stompClient = new Client({
  //     brokerURL: 'ws://localhost:5454/ws', // Sửa địa chỉ WebSocket
  //     debug: function (str) {
  //       console.log(str);
  //     },
  //     reconnectDelay: 5000,
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //   });
  
  //   stompClient.onConnect = function (frame) {
  //     console.log('Connected to WebSocket');
  //     stompClient.subscribe('/topic/orders', function (message) {
  //       alert('Received a new order: ' + message.body);
  //     });
  //   };
  
  //   stompClient.onStompError = function (frame) {
  //     console.error('Broker reported error: ' + frame.headers['message']);
  //     console.error('Additional details: ' + frame.body);
  //   };
  
  //   stompClient.activate();
  
  //   socket.onerror = function (error) {
  //     console.log('WebSocket Error: ', error);
  //   };
  
  //   socket.onclose = function (event) {
  //     console.log('WebSocket is closed now.');
  //   };
  
  //   return () => {
  //     if (stompClient !== null) {
  //       stompClient.deactivate();
  //     }
  //   };
  // }, []);
  

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Đơn hàng" />
      <TableThree />
    </DefaultLayout>
  );
};

export default Order;
