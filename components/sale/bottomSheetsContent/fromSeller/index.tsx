'use client';

import { useMutaionPostSaleProduct } from '@/api/home/query';
import { catchPriceState, catchState } from '@/atoms/sale/catchAtom';
import { isHeaderSate } from '@/atoms/sale/headerAtom';
import {
  percentState,
  priceState,
  totalPriceState,
} from '@/atoms/sale/priceAtom';
import {
  catchSingleDate,
  saleSingleDate,
} from '@/atoms/search-detail/searchStates';
import CheckBoxComponent from '@/components/common/checkBox';
import Modal from '@/components/common/modal';
import { FromSeller, sellerSchema } from '@/constants/zodSchema';
import { ProductItem } from '@/types/sale/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const FromSeller = () => {
  const [agreePriceOffer, setAgreedPriceOffer] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState(0);
  const router = useRouter();
  const { register, setValue } = useForm<FromSeller>({
    resolver: zodResolver(sellerSchema),
    mode: 'onChange',
  });
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const mutation = useMutaionPostSaleProduct();
  const setHeaderUnVisible = useSetRecoilState(isHeaderSate);
  const params = useSearchParams();
  const id = params?.get('id');
  const catchPriceStartDate = useRecoilValue(catchSingleDate);
  const endDate = useRecoilValue(saleSingleDate);
  const [sellPrice, setSellPrice] = useRecoilState(priceState);
  const actualProfit = useRecoilValue(totalPriceState);
  const [discountRate, setDiscountRate] = useRecoilState(percentState);
  const [isAutoCatch, setIsAutoCatch] = useRecoilState(catchState);
  const catchprice = useRecoilValue(catchPriceState);
  const isCatch = discountRate >= 50 ? true : false;
  const [modalContent, setModalContent] = useState('');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.target.value;
    setWordCount(currentValue.length);

    if (currentValue.length > 100) {
      const slicedValue = currentValue.slice(0, 100);
      setValue('sellerContent', slicedValue);
      setWordCount(slicedValue.length);
      setContent(slicedValue);
    } else {
      setContent(currentValue);
    }
  };

  const handleCheckbox = () => {
    setAgreedPriceOffer((prev) => !prev);
  };

  const handleModalOpen = () => {
    setOpen((prev) => !prev);
  };
  const onConfirm = () => {
    handleModalOpen();
    setHeaderUnVisible(false);
    setIsAutoCatch(false);
    setSellPrice(0);
    setDiscountRate(0);
    setHeaderUnVisible(false);
    router.push('/');
  };
  const handleButtonClick = () => {
    //api 호출

    const productData: ProductItem = {
      orderHistoryId: +id!,
      discountRate: discountRate,
      sellPrice: sellPrice,
      actualProfit: actualProfit,
      catchprice: catchprice,
      endDate: endDate!.toISOString(),
      introduction: content,
      isAutoCatch: isAutoCatch,
      isCatch: isCatch,
      isNego: agreePriceOffer,
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      catchPriceStartDate: catchPriceStartDate?.toISOString().split('T')[0]!,
    };
    mutation.mutate(productData, {
      onSuccess: handleMutationSucess,
      onError: handleMutationError,
    });
  };

  type APIresponse = {
    code: number;
    data: {
      id: number;
      accommodationName: string;
    };
  };
  const handleMutationSucess = (data: APIresponse) => {
    console.log(data);
    if (data.code === 4010) {
      router.push(`/room-info/${data.data.id}`);
      setHeaderUnVisible(false);
    } else if (data.code === 4012) {
      setModalContent('이미 등록된 상품입니다.');
      setOpen(true);
      setHeaderUnVisible(false);
    }
  };
  const handleMutationError = () => {
    setModalContent('사유 : 서버 에러');
    setOpen(true);
    setHeaderUnVisible(false);
  };

  return (
    <>
      {open && (
        <Modal
          title="등록 실패"
          content={modalContent}
          showConfirmButton={true}
          onConfirm={onConfirm}
          confirmString="홈으로 이동"
        />
      )}
      <div className="flex flex-col w-full mt-8">
        <form className="w-full h-[120px]">
          <textarea
            className="w-full h-[120px] border border-border-sub px-3 py-2 focus:outline-border-sub"
            {...register('sellerContent')}
            onChange={handleContentChange}
            placeholder={`판매사유 등 추가설명 작성\nex) 네고 가능하니 연락주세요!`}
          />
        </form>
        <div className="w-full text-end mt-2 text-p2 mb-5 ">
          {wordCount}/100
        </div>
        <CheckBoxComponent
          id="priceOffer"
          labelText="가격 제안 받기"
          isBoxChecked={agreePriceOffer}
          isLabelTextBold={true}
          handleSelectState={handleCheckbox}
        />

        <button
          onClick={handleButtonClick}
          type="submit"
          className="bg-action-primary h-11 px-4 mt-6 rounded text-text-on text-t2 font-semibold "
        >
          등록하기
        </button>
      </div>
    </>
  );
};

export default FromSeller;
