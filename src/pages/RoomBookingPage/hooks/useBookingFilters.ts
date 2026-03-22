import { useEffect, useState } from 'react';
import type { SetURLSearchParams } from 'react-router-dom';
import { formatDate } from 'shared/utils/reservation';
import type { BookingFilterActions, BookingFilters } from '../types';

type UseBookingFiltersParams = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  onFilterChange: () => void;
};

export function useBookingFilters({ searchParams, setSearchParams, onFilterChange }: UseBookingFiltersParams) {
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

  const actions: BookingFilterActions = {
    onDateChange: value => {
      setDate(value);
      onFilterChange();
    },
    onStartTimeChange: value => {
      setStartTime(value);
      onFilterChange();
    },
    onEndTimeChange: value => {
      setEndTime(value);
      onFilterChange();
    },
    onAttendeesChange: value => {
      setAttendees(value);
      onFilterChange();
    },
    onPreferredFloorChange: value => {
      setPreferredFloor(value);
      onFilterChange();
    },
    onToggleEquipment: target => {
      const selected = equipment.includes(target);
      const next = selected ? equipment.filter(item => item !== target) : [...equipment, target];
      setEquipment(next);
      onFilterChange();
    },
  };

  const filters: BookingFilters = {
    date,
    startTime,
    endTime,
    attendees,
    equipment,
    preferredFloor,
  };

  return {
    filters,
    filterActions: actions,
  };
}
