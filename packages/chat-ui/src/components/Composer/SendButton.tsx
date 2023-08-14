import React from 'react';
import { useLocale } from '../LocaleProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '../../../../../apps/uci/web/src/config/config';

interface SendButtonProps {
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SendButton = ({ disabled, onClick }: SendButtonProps) => {
  const { trans } = useLocale('Composer');
  return (
    <div className="Composer-actions">
      {/* Use the send icon from Font Awesome */}
      <button
        className="Composer-sendBtn"
        disabled={disabled}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={config?.ChatWindow?.innerWindow?.input?.icon} />
      </button>
    </div>
  );
};
