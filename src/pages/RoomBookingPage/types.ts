export type BookingFilters = {
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  equipment: string[];
  preferredFloor: number | null;
};

export interface BookingRoom {
  id: string;
  name: string;
  floor: number;
  capacity: number;
  equipment: string[];
}

export interface BookingReservation {
  roomId: string;
  date: string;
  start: string;
  end: string;
}

export interface CreateReservationPayload {
  roomId: string;
  date: string;
  start: string;
  end: string;
  attendees: number;
  equipment: string[];
}

export interface ReservationMutationResult {
  ok?: boolean;
  message?: string;
}
