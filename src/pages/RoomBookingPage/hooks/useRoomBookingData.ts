import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { createReservation, getReservations, getRooms } from 'pages/remotes';
import type { CreateReservationPayload, Reservation, ReservationMutationResult, Room } from 'shared/types';

type BookRoomResult = {
  ok: boolean;
  message?: string;
};

export function useRoomBookingData(date: string) {
  const queryClient = useQueryClient();

  const { data: rooms = [] } = useQuery<Room[]>(['rooms'], getRooms);
  const { data: reservations = [] } = useQuery<Reservation[]>(['reservations', date], () => getReservations(date), {
    enabled: !!date,
  });

  const createMutation = useMutation((payload: CreateReservationPayload) => createReservation(payload), {
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(['reservations', variables.date]);
      queryClient.invalidateQueries(['myReservations']);
    },
  });

  const bookRoom = async (payload: CreateReservationPayload): Promise<BookRoomResult> => {
    try {
      const result = await createMutation.mutateAsync(payload);

      if ('ok' in result && result.ok) {
        return { ok: true };
      }

      const errorResult = result as ReservationMutationResult;
      return { ok: false, message: errorResult.message ?? '예약에 실패했습니다.' };
    } catch (error: unknown) {
      let message = '예약에 실패했습니다.';

      if (axios.isAxiosError(error)) {
        const data = error.response?.data as { message?: string } | undefined;
        message = data?.message ?? message;
      }

      return { ok: false, message };
    }
  };

  return {
    rooms,
    reservations,
    isBooking: createMutation.isLoading,
    bookRoom,
  };
}
