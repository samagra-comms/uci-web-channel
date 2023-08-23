import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
        </>
    );
};
