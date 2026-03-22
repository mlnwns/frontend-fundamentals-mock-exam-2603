import { useEffect, useState } from 'react';
import type { ReservationLocationState, ReservationMessage } from '../types';

export function useReservationStatusUiState(locationState: ReservationLocationState) {
  const [message, setMessage] = useState<ReservationMessage | null>(
    locationState?.message ? { type: 'success', text: locationState.message } : null
  );
  const [activeReservationId, setActiveReservationId] = useState<string | null>(null);

  useEffect(() => {
    if (locationState?.message) {
      window.history.replaceState({}, '');
    }
  }, [locationState]);

  const showCancelSuccess = () => {
    setMessage({ type: 'success', text: '예약이 취소되었습니다.' });
  };

  const showCancelFailure = () => {
    setMessage({ type: 'error', text: '취소에 실패했습니다.' });
  };

  const toggleActiveReservation = (id: string) => {
    setActiveReservationId(prev => (prev === id ? null : id));
  };

  return {
    message,
    activeReservationId,
    showCancelSuccess,
    showCancelFailure,
    toggleActiveReservation,
  };
}
