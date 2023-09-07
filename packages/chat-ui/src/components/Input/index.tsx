import React, { useState, useEffect, useContext, useCallback } from 'react';
import clsx from 'clsx';
import { ThemeContext } from '../Form';
import useForwardRef from '../../hooks/useForwardRef';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function getCount(value: InputProps['value'], maxLength?: number) {
  return `${`${value}`.length}${maxLength ? `/${maxLength}` : ''}`;
}

export type InputVariant = 'outline' | 'filled' | 'flushed';

export type InputRef = HTMLInputElement | HTMLTextAreaElement;

export interface InputProps extends Omit<React.InputHTMLAttributes<InputRef>, 'onChange'> {
  variant?: InputVariant;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  showCount?: boolean;
  multiline?: boolean;
  autoSize?: boolean;
  onChange?: (value: string, event: React.ChangeEvent<InputRef>) => void;
}

export const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    className,
    type = 'text',
    variant: oVariant,
    value,
    placeholder,
    rows: oRows = 1,
    minRows = oRows,
    maxRows = 5,
    maxLength,
    showCount = !!maxLength,
    multiline,
    autoSize,
    onChange,
    disabled = false,
    ...other
  } = props;

  let initialRows = oRows;
  if (initialRows < minRows) {
    initialRows = minRows;
  } else if (initialRows > maxRows) {
    initialRows = maxRows;
  }

  const [rows, setRows] = useState(initialRows);
  const [lineHeight, setLineHeight] = useState(21);
  const inputRef = useForwardRef<any>(ref);
  const theme = useContext(ThemeContext);
  const variant = oVariant || (theme === 'light' ? 'flushed' : 'outline');
  const isMultiline = multiline || autoSize || oRows > 1;
  const Element = isMultiline ? 'textarea' : 'input';
  const [isVoiceInput, setIsVoiceInput] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;

  const handleVoiceInput = useCallback(
    (transcript: string) => {
      if (onChange) {
        const shouldTrim = maxLength && transcript.length > maxLength;
        const val = shouldTrim ? transcript.substr(0, maxLength) : transcript;
        onChange(val, null); // Pass null for the event since it's not a user input event
      }
    },
    [maxLength, onChange],
  );

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  const startVoiceRecognition = () => {
    if (isVoiceInput) {
      console.log('stopping voice recognition');
      recognition.stop();
      recognition.onresult = null;
    } else {
      console.log('starting voice recognition');
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        handleVoiceInput(transcript);
      };
    }
    setIsVoiceInput(!isVoiceInput);
  };

  useEffect(() => {
    if (!inputRef.current) return;

    const lhStr = getComputedStyle(inputRef.current, null).lineHeight;
    const lh = Number(lhStr.replace('px', ''));

    if (lh !== lineHeight) {
      setLineHeight(lh);
    }
  }, [inputRef, lineHeight]);

  const updateRow = useCallback(() => {
    if (!autoSize || !inputRef.current) return;

    const target = inputRef.current as HTMLTextAreaElement;
    const prevRows = target.rows;
    target.rows = minRows;

    if (placeholder) {
      target.placeholder = '';
    }

    // eslint-disable-next-line no-bitwise
    const currentRows = ~~(target.scrollHeight / lineHeight);

    if (currentRows === prevRows) {
      target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      target.rows = maxRows;
      target.scrollTop = target.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);

    if (placeholder) {
      target.placeholder = placeholder;
    }
  }, [autoSize, inputRef, lineHeight, maxRows, minRows, placeholder]);

  useEffect(() => {
    if (value === '') {
      setRows(initialRows);
    } else {
      updateRow();
    }
  }, [initialRows, updateRow, value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<InputRef>) => {
      updateRow();

      if (onChange) {
        const valueFromEvent = e.target.value;
        const shouldTrim = maxLength && valueFromEvent.length > maxLength;
        const val = shouldTrim ? valueFromEvent.substr(0, maxLength) : valueFromEvent;
        onChange(val, e);
      }
    },
    [maxLength, onChange, updateRow],
  );
  console.log('debug:', { disabled });
  const input = (
    <div className="main-input">
      <div className="FooterIcons">
        <div
          className={`voice-mic ${isVoiceInput ? 'active' : ''}`}
          onClick={startVoiceRecognition}
        >
          <FontAwesomeIcon icon={faMicrophone} className="mic-icon" />
        </div>
      </div>
      <div className="text-input">
        <Element
          className={clsx('Input', `Input--${variant}`, className)}
          type={type}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          ref={inputRef}
          rows={rows}
          onChange={handleChange}
          disabled={disabled}
          style={{ width: '100%' }}
          {...other}
        />
      </div>
    </div>
  );

  if (showCount) {
    return (
      <div className={clsx('InputWrapper', { 'has-counter': showCount })}>
        {input}
        {showCount && <div className="Input-counter">{getCount(value, maxLength)}</div>}
      </div>
    );
  }
  return <>{input}</>;
});
