// normalize new user structure to the old one

import { includes } from "lodash";
import moment from "moment";
import { User } from "../types";

export const normalizeUsers = (user: User): User & {botImageUrl : string ,meta?:any} => ({
  ...user,
  botImageUrl: user?.botImage,
  id: user?.id,
  botUuid: user?.id,
  useIcon:false,
 // isPinned: user?.status === 'PINNED' ? true : user?.isPinned ? true :false,
  isPinned: user?.meta?.isPinned ?? false,
  isExpired:
    user?.endDate !== undefined &&
    user.endDate < moment().format() &&
    user?.status === "ENABLED",
  isConvStarted: !includes(JSON.parse(localStorage.getItem('unstartedBotList')),user?.id)  
});
