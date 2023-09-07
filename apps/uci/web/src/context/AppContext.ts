import { toChangeCurrentUser, User } from '@/types';
import { createContext } from 'react';

type AppContextType =
    | {
          toChangeCurrentUser: toChangeCurrentUser;
          currentUser: User;
          allUsers: Array<User>;
      }
    | any;

export const AppContext = createContext<AppContextType | null>(null);
