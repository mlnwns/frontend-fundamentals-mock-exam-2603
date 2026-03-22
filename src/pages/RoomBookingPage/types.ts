export type BookingFilters = {
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  equipment: string[];
  preferredFloor: number | null;
};

export type BookingFilterActions = {
  onDateChange: (value: string) => void;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onAttendeesChange: (value: number) => void;
  onPreferredFloorChange: (value: number | null) => void;
  onToggleEquipment: (equipment: string) => void;
};
