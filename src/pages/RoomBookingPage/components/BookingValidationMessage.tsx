import { css } from '@emotion/react';
import { Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { PageHorizontalPadding } from 'shared/components/PageHorizontalPadding';

type BookingValidationMessageProps = {
  message: string | null;
};

export function BookingValidationMessage({ message }: BookingValidationMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <PageHorizontalPadding>
      <Spacing size={8} />
      <span
        css={css`
          color: ${colors.red500};
          font-size: 14px;
        `}
        role="alert"
      >
        {message}
      </span>
    </PageHorizontalPadding>
  );
}
