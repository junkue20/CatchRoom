import BannerContainer from '@/components/mypage/banner/bannerContainer';
import BannerItem from '@/components/mypage/banner/bannerItem';
import React from 'react';

import { MYPAGE_CONSTANTS } from '@/constants/mypage';
import ProfileContainer from '@/components/mypage/profile/profileContainer';
import ProfileButton from '@/components/mypage/profile/profileButton';
import AccountContainer from '@/components/mypage/account/accountContainer';
import AccountButton from '@/components/mypage/account/accountButton';
import BottomNav from '@/components/common/bottomNav';

const fetchTest = async () => {
  const res = await fetch('https://catchroom.xyz/v1/test/do');
  const data = await res.text();
  console.log(data);
};

const page = async () => {
  await fetchTest();
  return (
    <>
      <div className="px-3 py-12 bg-bg">
        <div className="w-full flex flex-col gap-6">
          {/* 유저 프로필 상단 배너 */}
          <ProfileContainer name="김민수" email="abcde@google.com">
            <ProfileButton />
          </ProfileContainer>
          {/* 가지고 있는 포인트 계좌 내역 */}
          <AccountContainer balance={9500}>
            {MYPAGE_CONSTANTS.ACCOUNT_BUTTON.map((button) => {
              return (
                <AccountButton
                  key={button.TITLE}
                  text={button.TITLE}
                  location={button.LOCATION}
                />
              );
            })}
          </AccountContainer>
          {/* 나의활동 및 기타사항 클릭 배너 */}
          <BannerContainer text={MYPAGE_CONSTANTS.TOP_BANNER.TITLE}>
            {MYPAGE_CONSTANTS.TOP_BANNER.BANNERS.map((banner) => {
              return (
                <BannerItem
                  key={banner.TITLE}
                  text={banner.TITLE}
                  location={banner.LOCATION}
                />
              );
            })}
          </BannerContainer>
          <BannerContainer text={MYPAGE_CONSTANTS.BOTTOM_BANNER.TITLE}>
            {MYPAGE_CONSTANTS.BOTTOM_BANNER.BANNERS.map((banner) => {
              return (
                <BannerItem
                  key={banner.TITLE}
                  text={banner.TITLE}
                  location={banner.LOCATION}
                />
              );
            })}
          </BannerContainer>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default page;
