import React from 'react';
import { Button } from '../Button';
import { useLocale } from '../LocaleProvider';


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
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  );
};
