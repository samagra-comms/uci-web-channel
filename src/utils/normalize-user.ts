// normalize new user structure to the old one

import { includes } from "lodash";
import moment from "moment";
import { User } from "../types";

export const normalizeUsers = (user: User): User => ({
  ...user,
  id: user?.id,
  botUuid: user?.id,
  useIcon:false,
  isExpired:
    user?.endDate !== undefined &&
    user.endDate < moment().format() &&
    user?.status === "ENABLED",
  isConvStarted: !includes(JSON.parse(localStorage.getItem('unstartedBotList')),user?.id)  

});
