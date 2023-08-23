// normalize new user structure to the old one

import { User } from '../types';

export const normalizeUsers = (user: User): User => ({
    ...user,
    id: user?.id,
    botUuid: user?.id,
});
