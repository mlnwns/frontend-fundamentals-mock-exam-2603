export type ReservationMessage = {
  type: 'success' | 'error';
  text: string;
};

export type ReservationLocationState = {
  message?: string;
} | null;
