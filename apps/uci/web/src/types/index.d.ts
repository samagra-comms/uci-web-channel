export * from './react-event';
export * from './user';
export * from './socket';
export * from './context-provider';
export * from './chat-message';
export * from './base-urls';

export {};
declare global {
    interface Window {
        androidInteract: any; // this will be your variable name
    }
}
declare module '@/types';
