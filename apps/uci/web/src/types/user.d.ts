export type User = {
    botImage: any;
    name: string;
    number: string;
    active: boolean;
    id?: string;
    botUuid?: string;
    startingMessage?: string;
    status?: string;
    endDate: string | undefined;
};

export type toChangeCurrentUser = (arg: User) => void;
