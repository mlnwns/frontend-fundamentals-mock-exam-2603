export interface RoomSummary {
  id: string;
  name: string;
}

export interface Room extends RoomSummary {
  floor: number;
  capacity: number;
  equipment: string[];
}

export interface Reservation {
  id: string;
  roomId: string;
  date: string;
  start: string;
  end: string;
  attendees: number;
  equipment: string[];
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
  reservation?: unknown;
  code?: string;
  message?: string;
}
