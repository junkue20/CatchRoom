'use client';

import React, { useEffect } from 'react';
import { useChatConnection } from '@/hooks/useChatConnection';
import ChatMessageSender from '../sender';
import ProductInfo from '../productInfo';
import { useRecoilValue } from 'recoil';
import { dealModalAtom } from '@/atoms/chat/leaveButton';
import OfferModal from '../offerModal';
import ChatMessageViewer from '../viewer';

const ChatRoomControl = ({ roomId }: { roomId: string }) => {
  const modalState = useRecoilValue(dealModalAtom);
  const {
    connect,
    disconnect,
    sendMessage,
    negoPrice,
    acceptPrice,
    denyPrice,
  } = useChatConnection(roomId);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full relative">
      <ProductInfo />
      <div className="relative">
        <div className={`h-[calc(100vh-130px)] overflow-scroll relative`}>
          <ChatMessageViewer
            accept={acceptPrice}
            deny={denyPrice}
            roomId={roomId}
          />
          <ChatMessageSender publish={sendMessage} />
        </div>
        {modalState && <OfferModal publish={negoPrice} />}
      </div>
    </div>
  );
};

export default ChatRoomControl;
