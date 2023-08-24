export type User = {
	name: string;
	number: string;
	active: boolean;
	id: string;
	botUuid?: string;
	startingMessage?: string;
	botImage?:string;
	isExpired:boolean;
	endDate:string;
	status:'ENABLED'|'DISABLED';
	useIcon?:boolean
};

export type toChangeCurrentUser = (arg: User) => void;