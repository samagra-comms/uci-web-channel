export const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return `Bearer ${localStorage.getItem('auth')}`;
    }
};

export const getDeviceId = () => {
    if (typeof window !== 'undefined') {
        return `nlpwa:${localStorage.getItem('mobile')}`;
    }
};
