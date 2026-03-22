import { css } from '@emotion/react';
import { Border, Button, Spacing, Top } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageBackButton } from 'shared/components/PageBackButton';
import { PageHorizontalPadding } from 'shared/components/PageHorizontalPadding';
import { formatDate } from 'shared/utils/reservation';
import { AvailableRoomsSection } from './components/AvailableRoomsSection';
import { BookingConditionsSection } from './components/BookingConditionsSection';
import { BookingErrorBanner } from './components/BookingErrorBanner';
import { BookingValidationMessage } from './components/BookingValidationMessage';
import { useAvailableRooms } from './hooks/useAvailableRooms';
import { useRoomBookingData } from './hooks/useRoomBookingData';
import type { BookingFilterActions, BookingFilters } from './types';
import { isBookingFilterComplete, validateBookingFilters } from './utils/validation';

export function RoomBookingPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [date, setDate] = useState(searchParams.get('date') || formatDate(new Date()));
  const [startTime, setStartTime] = useState(searchParams.get('startTime') || '');
  const [endTime, setEndTime] = useState(searchParams.get('endTime') || '');
  const [attendees, setAttendees] = useState(Number(searchParams.get('attendees')) || 1);
  const [equipment, setEquipment] = useState<string[]>(
    searchParams.get('equipment') ? searchParams.get('equipment')!.split(',').filter(Boolean) : []
  );
  const [preferredFloor, setPreferredFloor] = useState<number | null>(
    searchParams.get('floor') ? Number(searchParams.get('floor')) : null
  );
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // URL 쿼리 파라미터 동기화
  useEffect(() => {
    const params: Record<string, string> = {};
    if (date) params.date = date;
    if (startTime) params.startTime = startTime;
    if (endTime) params.endTime = endTime;
    if (attendees > 1) params.attendees = String(attendees);
    if (equipment.length > 0) params.equipment = equipment.join(',');
    if (preferredFloor !== null) params.floor = String(preferredFloor);
    setSearchParams(params, { replace: true });
  }, [date, startTime, endTime, attendees, equipment, preferredFloor, setSearchParams]);

  const { rooms, reservations, isBooking, bookRoom } = useRoomBookingData(date);

  const filters: BookingFilters = {
    date,
    startTime,
    endTime,
    attendees,
    equipment,
    preferredFloor,
  };

  // 필터 변경 시 선택 초기화
  const handleFilterChange = () => {
    setSelectedRoomId(null);
    setErrorMessage(null);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    handleFilterChange();
  };

  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
    handleFilterChange();
  };

  const handleEndTimeChange = (value: string) => {
    setEndTime(value);
    handleFilterChange();
  };

  const handleAttendeesChange = (value: number) => {
    setAttendees(value);
    handleFilterChange();
  };

  const handlePreferredFloorChange = (value: number | null) => {
    setPreferredFloor(value);
    handleFilterChange();
  };

  const handleToggleEquipment = (eq: string) => {
    const selected = equipment.includes(eq);
    const next = selected ? equipment.filter(item => item !== eq) : [...equipment, eq];
    setEquipment(next);
    handleFilterChange();
  };

  const filterActions: BookingFilterActions = {
    onDateChange: handleDateChange,
    onStartTimeChange: handleStartTimeChange,
    onEndTimeChange: handleEndTimeChange,
    onAttendeesChange: handleAttendeesChange,
    onPreferredFloorChange: handlePreferredFloorChange,
    onToggleEquipment: handleToggleEquipment,
  };

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
