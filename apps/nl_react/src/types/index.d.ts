export type User = {
	name: string;
	number: string;
	active: boolean;
	id?: string;
	botUuid?: string;
	startingMessage?: string;
};

export type toChangeCurrentUser = (arg: User) => void;


export {};
declare global {
  interface Window {
    androidInteract: any;  // this will be your variable name
  } 
}