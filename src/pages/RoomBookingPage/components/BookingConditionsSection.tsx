import { css } from '@emotion/react';
import { Select, Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { ALL_EQUIPMENT, EQUIPMENT_LABELS, TIME_SLOTS } from 'shared/constants/reservation';
import DatePicker from 'shared/components/DatePicker';
import { PageHorizontalPadding } from 'shared/components/PageHorizontalPadding';
import { formatDate } from 'shared/utils/reservation';

type BookingConditionsSectionProps = {
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  equipment: string[];
  preferredFloor: number | null;
  floors: number[];
  onDateChange: (value: string) => void;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onAttendeesChange: (value: number) => void;
  onPreferredFloorChange: (value: number | null) => void;
  onToggleEquipment: (equipment: string) => void;
};

export function BookingConditionsSection({
  date,
  startTime,
  endTime,
  attendees,
  equipment,
  preferredFloor,
  floors,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  onAttendeesChange,
  onPreferredFloorChange,
  onToggleEquipment,
}: BookingConditionsSectionProps) {
  return (
    <PageHorizontalPadding>
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 조건
      </Text>
      <Spacing size={16} />

      <DatePicker value={date} min={formatDate(new Date())} onChange={onDateChange} />
      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
          `}
        >
          <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
            시작 시간
          </Text>
          <Select value={startTime} onChange={e => onStartTimeChange(e.target.value)} aria-label="시작 시간">
            <option value="">선택</option>
            {TIME_SLOTS.slice(0, -1).map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
          `}
        >
          <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
            종료 시간
          </Text>
          <Select value={endTime} onChange={e => onEndTimeChange(e.target.value)} aria-label="종료 시간">
            <option value="">선택</option>
            {TIME_SLOTS.slice(1).map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
          `}
        >
          <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
            참석 인원
          </Text>
          <input
            type="number"
            min={1}
            value={attendees}
            onChange={e => onAttendeesChange(Math.max(1, Number(e.target.value)))}
            aria-label="참석 인원"
            css={css`
              box-sizing: border-box;
              font-size: 16px;
              font-weight: 500;
              line-height: 1.5;
              height: 48px;
              background-color: ${colors.grey50};
              border-radius: 12px;
              color: ${colors.grey800};
              width: 100%;
              border: 1px solid ${colors.grey200};
              padding: 0 16px;
              outline: none;
              transition: border-color 0.15s;
              &:focus {
                border-color: ${colors.blue500};
              }
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
          `}
        >
          <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
            선호 층
          </Text>
          <Select
            value={preferredFloor ?? ''}
            onChange={e => {
              const val = e.target.value;
              onPreferredFloorChange(val === '' ? null : Number(val));
            }}
            aria-label="선호 층"
          >
            <option value="">전체</option>
            {floors.map(f => (
              <option key={f} value={f}>
                {f}층
              </option>
            ))}
          </Select>
        </div>
      </div>
      <Spacing size={14} />

      <div>
        <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
          필요 장비
        </Text>
        <Spacing size={8} />
        <div
          css={css`
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          `}
        >
          {ALL_EQUIPMENT.map(eq => {
            const selected = equipment.includes(eq);
            return (
              <button
                key={eq}
                type="button"
                onClick={() => onToggleEquipment(eq)}
                aria-label={EQUIPMENT_LABELS[eq]}
                aria-pressed={selected}
                css={css`
                  padding: 8px 16px;
                  border-radius: 20px;
                  border: 1px solid ${selected ? colors.blue500 : colors.grey200};
                  background: ${selected ? colors.blue50 : colors.grey50};
                  color: ${selected ? colors.blue600 : colors.grey700};
                  font-size: 14px;
                  font-weight: 500;
                  cursor: pointer;
                  transition: all 0.15s;
                  &:hover {
                    border-color: ${selected ? colors.blue500 : colors.grey400};
                  }
                `}
              >
                {EQUIPMENT_LABELS[eq]}
              </button>
            );
          })}
        </div>
      </div>
    </PageHorizontalPadding>
  );
}
