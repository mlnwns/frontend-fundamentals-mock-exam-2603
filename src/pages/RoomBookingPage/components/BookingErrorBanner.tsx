import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { PageHorizontalPadding } from 'shared/components/PageHorizontalPadding';

type BookingErrorBannerProps = {
  message: string | null;
};

export function BookingErrorBanner({ message }: BookingErrorBannerProps) {
  if (!message) {
    return null;
  }

  return (
    <PageHorizontalPadding>
      <Spacing size={12} />
      <div
        css={css`
          padding: 10px 14px;
          border-radius: 10px;
          background: ${colors.red50};
          display: flex;
          align-items: center;
          gap: 8px;
        `}
      >
        <Text typography="t7" fontWeight="medium" color={colors.red500}>
          {message}
        </Text>
      </div>
    </PageHorizontalPadding>
  );
}
