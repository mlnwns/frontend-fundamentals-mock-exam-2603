import { TIMELINE_START } from 'shared/constants/reservation';

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function timeToTimelineMinutes(time: string, timelineStart = TIMELINE_START): number {
  const [h, m] = time.split(':').map(Number);
  return (h - timelineStart) * 60 + m;
}
