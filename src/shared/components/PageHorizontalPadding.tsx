import { css } from '@emotion/react';
import type { ReactNode } from 'react';

type PageHorizontalPaddingProps = {
  children: ReactNode;
};

export function PageHorizontalPadding({ children }: PageHorizontalPaddingProps) {
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      {children}
    </div>
  );
}
