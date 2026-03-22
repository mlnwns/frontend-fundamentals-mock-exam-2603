import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { PageHorizontalPadding } from 'shared/components/PageHorizontalPadding';
import type { ReservationMessage } from '../types';

type ReservationMessageBannerProps = {
  message: ReservationMessage | null;
};

export function ReservationMessageBanner({ message }: ReservationMessageBannerProps) {
  if (!message) {
    return null;
  }

  return (
    <PageHorizontalPadding>
      <div
        css={css`
          padding: 10px 14px;
          border-radius: 10px;
          background: ${message.type === 'success' ? colors.blue50 : colors.red50};
          display: flex;
          align-items: center;
          gap: 8px;
        `}
      >
        <Text typography="t7" fontWeight="medium" color={message.type === 'success' ? colors.blue600 : colors.red500}>
          {message.text}
        </Text>
      </div>
      <Spacing size={12} />
    </PageHorizontalPadding>
  );
}
