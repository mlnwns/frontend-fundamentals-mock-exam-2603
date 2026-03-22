import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cancelReservation, getMyReservations, getReservations, getRooms } from 'pages/remotes';
import type { Reservation, Room } from 'shared/types';

export function useReservationStatusData(date: string) {
  const queryClient = useQueryClient();

  const { data: rooms = [] } = useQuery<Room[]>(['rooms'], getRooms);
  const { data: reservations = [] } = useQuery<Reservation[]>(['reservations', date], () => getReservations(date), {
    enabled: !!date,
  });
  const { data: myReservationList = [] } = useQuery<Reservation[]>(['myReservations'], getMyReservations);

  const cancelMutation = useMutation((id: string) => cancelReservation(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['reservations']);
      queryClient.invalidateQueries(['myReservations']);
    },
  });

  const cancelReservationAsync = (id: string) => cancelMutation.mutateAsync(id);

  return {
    rooms,
    reservations,
    myReservationList,
    cancelReservationAsync,
  };
}
