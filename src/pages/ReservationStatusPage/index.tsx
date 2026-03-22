import { css } from '@emotion/react';
import { Border, Button, Spacing, Text, Top } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'shared/components/DatePicker';
import { PageHorizontalPadding } from 'shared/components/PageHorizontalPadding';
import type { RoomSummary } from 'shared/types';
import { formatDate } from 'shared/utils/reservation';
import { MyReservationSection } from './components/MyReservationSection';
import { ReservationMessageBanner } from './components/ReservationMessageBanner';
import { ReservationTimelineSection } from './components/ReservationTimelineSection';
import { useReservationStatusData } from './hooks/useReservationStatusData';
import { useReservationStatusUiState } from './hooks/useReservationStatusUiState';
import type { ReservationLocationState } from './types';

export function ReservationStatusPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState(formatDate(new Date()));

  const locationState = location.state as ReservationLocationState;
  const { message, activeReservationId, showCancelSuccess, showCancelFailure, toggleActiveReservation } =
    useReservationStatusUiState(locationState);

  const { rooms, reservations, myReservationList, cancelReservationAsync } = useReservationStatusData(date);

  const handleCancel = async (id: string) => {
    try {
      await cancelReservationAsync(id);
      showCancelSuccess();
    } catch {
      showCancelFailure();
    }
  };

  const getRoomName = (roomId: string) => rooms.find((r: RoomSummary) => r.id === roomId)?.name ?? roomId;

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <Top.Top03
        css={css`
          padding-left: 24px;
          padding-right: 24px;
        `}
      >
        회의실 예약
      </Top.Top03>

      <Spacing size={24} />

      {/* 날짜 선택 */}
      <PageHorizontalPadding>
        <Text typography="t5" fontWeight="bold" color={colors.grey900}>
          날짜 선택
        </Text>
        <Spacing size={16} />
        <DatePicker value={date} onChange={setDate} min={formatDate(new Date())} />
      </PageHorizontalPadding>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <ReservationTimelineSection
        rooms={rooms}
        reservations={reservations}
        activeReservationId={activeReservationId}
        onToggleReservation={toggleActiveReservation}
      />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <ReservationMessageBanner message={message} />

      <MyReservationSection myReservationList={myReservationList} getRoomName={getRoomName} onCancel={handleCancel} />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {/* 예약하기 버튼 */}
      <PageHorizontalPadding>
        <Button display="full" onClick={() => navigate('/booking')}>
          예약하기
        </Button>
      </PageHorizontalPadding>
      <Spacing size={24} />
    </div>
  );
}
