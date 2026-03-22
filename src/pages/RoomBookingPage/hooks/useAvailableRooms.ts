import { useMemo } from 'react';
import type { Reservation, Room } from 'shared/types';
import type { BookingFilters } from '../types';

export function useAvailableRooms(
  rooms: Room[],
  reservations: Reservation[],
  filters: BookingFilters,
  isFilterComplete: boolean
) {
  const floors = useMemo(() => {
    return [...new Set(rooms.map(room => room.floor))].sort((a, b) => a - b);
  }, [rooms]);

  const availableRooms = useMemo(() => {
    if (!isFilterComplete) {
      return [];
    }

    const { date, startTime, endTime, attendees, equipment, preferredFloor } = filters;

    return rooms
      .filter(room => {
        if (room.capacity < attendees) return false;
        if (!equipment.every(eq => room.equipment.includes(eq))) return false;
        if (preferredFloor !== null && room.floor !== preferredFloor) return false;

        const hasConflict = reservations.some(
          reservation =>
            reservation.roomId === room.id &&
            reservation.date === date &&
            reservation.start < endTime &&
            reservation.end > startTime
        );

        return !hasConflict;
      })
      .sort((a, b) => {
        if (a.floor !== b.floor) return a.floor - b.floor;
        return a.name.localeCompare(b.name);
      });
  }, [filters, isFilterComplete, reservations, rooms]);

  return {
    floors,
    availableRooms,
  };
}
