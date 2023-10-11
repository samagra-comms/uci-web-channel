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
	startDate:string;
	status:'ENABLED'|'DISABLED';
	useIcon?:boolean;
	isConvStarted?:boolean;
	createdAt?:string
};

export type toChangeCurrentUser = (arg: User) => void;