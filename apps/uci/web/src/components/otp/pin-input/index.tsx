import { ChangeEvent } from '@/types';
import { PinInputField } from '@chakra-ui/react';
import React, { useState, FC, useCallback } from 'react';
import styles from './index.module.css';

type PinInputType = {
    value: number | string;
    onChange: (arg: string, key: string) => void;
    valueKey: string;
};

export const PinInputComponent: FC<PinInputType> = ({
    value,
    onChange,
    valueKey,
}) => {
    const [input, setInput] = useState(value);

    const handleOnChange = useCallback((e: ChangeEvent) => {
        setInput(e.target.value);
        onChange(e.target.value, valueKey);
    }, []);

    return (
        <PinInputField
            className={styles.pinInputField}
            value={input}
            onChange={handleOnChange}
            boxShadow="0 2.8px 2.2px rgba(0, 0, 0, 0.034),
0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
0 100px 80px rgba(0, 0, 0, 0.12);"
        />
    );
};
