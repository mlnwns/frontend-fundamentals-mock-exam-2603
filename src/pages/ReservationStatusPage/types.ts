export type ReservationMessage = {
  type: 'success' | 'error';
  text: string;
};

export type ReservationLocationState = {
  message?: string;
} | null;

export interface ReservationRoom {
  id: string;
  name: string;
}

export interface ReservationItem {
  id: string;
  roomId: string;
  date: string;
  start: string;
  end: string;
  attendees: number;
  equipment: string[];
};
