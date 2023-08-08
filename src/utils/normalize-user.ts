// normalize new user structure to the old one

import moment from "moment";
import { User } from "../types";

export const normalizeUsers = (user: User): User => ({
  ...user,
  id: user?.id,
  botUuid: user?.id,
  isExpired:
    user?.endDate !== undefined &&
    user.endDate < moment().format() &&
    user?.status === "ENABLED",
});
