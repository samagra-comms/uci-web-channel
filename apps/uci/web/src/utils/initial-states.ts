export const initialState: {
    allMessages: {
        user: string;
        phoneNumber: string | null;
        messages: any[];
    }[];
    messages: any[];
    username: string;
    session: any;
} = {
    allMessages: [{ user: 'Farmer Bot', phoneNumber: null, messages: [] }],
    messages: [],
    username: '',
    session: {},
};
