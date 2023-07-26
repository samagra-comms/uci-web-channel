
export * from './react-event';
export * from './user';
export * from './socket';
export * from './context-provider';


export {};
declare global {
  interface Window {
    androidInteract: any;  // this will be your variable name
  } 
}
declare module "@/types"