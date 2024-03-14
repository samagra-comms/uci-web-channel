export type User = {
	name: string;
	number: string;
	active: boolean;
	id: string;
	botUuid?: string;
	startingMessage?: string;
	botImage?:string;
	botImageUrl?:string;
	isExpired:boolean;
	isPinned:boolean;
	endDate:string;
	startDate:string;
	status:'ENABLED'|'DISABLED'|'PINNED';
	useIcon?:boolean;
	isConvStarted?:boolean;
	createdAt?:string
};

export type toChangeCurrentUser = (arg: User) => void;