import type { BookingFilters } from '../types';

export function validateBookingFilters(filters: BookingFilters): string | null {
  const { startTime, endTime, attendees } = filters;
  const hasTimeInputs = startTime !== '' && endTime !== '';

  if (!hasTimeInputs) {
    return null;
  }

  if (endTime <= startTime) {
    return '종료 시간은 시작 시간보다 늦어야 합니다.';
  }

  if (attendees < 1) {
    return '참석 인원은 1명 이상이어야 합니다.';
  }

  return null;
}

export function isBookingFilterComplete(filters: BookingFilters, validationError: string | null): boolean {
  return filters.startTime !== '' && filters.endTime !== '' && !validationError;
}
