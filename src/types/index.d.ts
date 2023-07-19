export type User = {
	name: string;
	number: string;
	active: boolean;
	id?: string;
	botUuid?: string;
	startingMessage?: string;
	botImage?:string;
};

export type toChangeCurrentUser = (arg: User) => void;