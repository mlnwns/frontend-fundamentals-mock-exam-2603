import { css } from '@emotion/react';
import { Border, Button, Spacing, Top } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageBackButton } from 'shared/components/PageBackButton';
import { PageHorizontalPadding } from 'shared/components/PageHorizontalPadding';
import { AvailableRoomsSection } from './components/AvailableRoomsSection';
import { BookingConditionsSection } from './components/BookingConditionsSection';
import { BookingErrorBanner } from './components/BookingErrorBanner';
import { BookingValidationMessage } from './components/BookingValidationMessage';
import { useAvailableRooms } from './hooks/useAvailableRooms';
import { useBookingFilters } from './hooks/useBookingFilters';
import { useRoomBookingData } from './hooks/useRoomBookingData';
import { isBookingFilterComplete, validateBookingFilters } from './utils/validation';

export function RoomBookingPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 필터 변경 시 선택 초기화
  const handleFilterChange = () => {
    setSelectedRoomId(null);
    setErrorMessage(null);
  };

  const { filters, filterActions } = useBookingFilters({
    searchParams,
    setSearchParams,
    onFilterChange: handleFilterChange,
  });

  const { date, startTime, endTime, attendees, equipment } = filters;
  const { rooms, reservations, isBooking, bookRoom } = useRoomBookingData(date);

  // 입력 검증
  const validationError = validateBookingFilters(filters);
  const isFilterComplete = isBookingFilterComplete(filters, validationError);
  const { floors, availableRooms } = useAvailableRooms(rooms, reservations, filters, isFilterComplete);

  const handleBook = async () => {
    if (!selectedRoomId) {
      setErrorMessage('회의실을 선택해주세요.');
      return;
    }
    if (!startTime || !endTime) {
      setErrorMessage('시작 시간과 종료 시간을 선택해주세요.');
      return;
    }

    const result = await bookRoom({
      roomId: selectedRoomId,
      date,
      start: startTime,
      end: endTime,
      attendees,
      equipment,
    });

    if (result.ok) {
      navigate('/', { state: { message: '예약이 완료되었습니다!' } });
      return;
    }

    setErrorMessage(result.message ?? '예약에 실패했습니다.');
    setSelectedRoomId(null);
  };

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <div
        css={css`
          padding: 12px 24px 0;
        `}
      >
        <PageBackButton label="예약 현황으로" onClick={() => navigate('/')} />
      </div>
      <Top.Top03
        css={css`
          padding-left: 24px;
          padding-right: 24px;
        `}
      >
        예약하기
      </Top.Top03>

      <BookingErrorBanner message={errorMessage} />

      <Spacing size={24} />

      <BookingConditionsSection filters={filters} floors={floors} actions={filterActions} />

      <BookingValidationMessage message={validationError} />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <AvailableRoomsSection
        visible={isFilterComplete}
        rooms={availableRooms}
        selectedRoomId={selectedRoomId}
        onSelectRoom={setSelectedRoomId}
        onBook={handleBook}
        isBooking={isBooking}
      />

      <Spacing size={24} />
    </div>
  );
}
