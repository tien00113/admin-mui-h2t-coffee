import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client, Frame } from 'stompjs';

const useWebSocket = (url: string): Client | null => {
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const sock = new SockJS(url);
    const stomp: Client = Stomp.over(sock);

    stomp.connect({}, () => {
      setStompClient(stomp);
    }, (error: Frame | string) => {
      console.log("Error connecting to WebSocket: ", error);
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect(()=> {});
      }
    };
  }, [url]);

  return stompClient;
};

export default useWebSocket;
