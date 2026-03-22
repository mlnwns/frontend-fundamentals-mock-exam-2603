import { css } from '@emotion/react';
import { colors } from '_tosslib/constants/colors';

type PageBackButtonProps = {
  label: string;
  onClick: () => void;
  ariaLabel?: string;
};

export function PageBackButton({ label, onClick, ariaLabel = '뒤로가기' }: PageBackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      css={css`
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font-size: 14px;
        color: ${colors.grey600};
        &:hover {
          color: ${colors.grey900};
        }
      `}
    >
      {`← ${label}`}
    </button>
  );
}
