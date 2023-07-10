import { ChangeEvent } from '@/types';
import { PinInputField } from '@chakra-ui/react';
import React, { useState, FC, useCallback } from 'react';
import config from './config.json';

type PinInputType = {
    value: number | string;
    onChange: (arg: string, key: string) => void;
    valueKey: string;
}

export const PinInputComponent: FC<PinInputType> = ({ value, onChange, valueKey }) => {
    const [input, setInput] = useState(value);

    const handleOnChange = useCallback((e: ChangeEvent) => {
        setInput(e.target.value);
        onChange(e.target.value, valueKey);
    }, []);

    return (
        <PinInputField
            className={config.pinInputField.className}
            value={input}
            onChange={handleOnChange}
            boxShadow={config.pinInputField.boxShadow}
        />
    )
}
