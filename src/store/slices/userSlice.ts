import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { User } from "../../types";
import { fetchUsers } from "../actions/fetchUsers";
import {
  concat,
  filter,
  findIndex,
  includes,
  reverse,
  sortBy,
  without,
} from "lodash";
import { normalizeUsers } from "../../utils/normalize-user";
import moment from "moment";
import {
  logToAndroid,
  triggerEventInAndroid,
} from "../../utils/android-events";

// Define a type for the slice state
interface UsersState {
  all: Array<User> | [];
  active: User | {};
  status: "idle" | "loading" | "succeeded" | "failed" | string;
  error: null | string;
  loading: boolean;
}

// Define the initial state using that type
const initialState: UsersState = {
  all: [],
  active: {},
  status: "idle",
  loading: true,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setActiveUser: (state, action) => {
      state.active = action.payload;
    },
    setBotImage: (state, action) => {
      const index = findIndex(state.all, { id: action.payload.id });
      console.log("ram ram:", { index, user: state?.all[index] });
      state.all[index].useIcon = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        const filterList =
          localStorage.getItem("filterList") ||
          process.env.REACT_APP_FILTER_LIST === "True";
        logToAndroid("debug: allBots" + JSON.stringify(action.payload));
        const botIds = JSON.parse(localStorage.getItem("botList"));
        const botDetailsList = without(
          reverse(
            sortBy(
              action.payload?.map((bot: any, index: number) => {
                if (
                  filterList
                    ? bot?.logicIDs?.[0]?.transformers?.[0]?.meta?.type !==
                        "broadcast" &&
                      bot?.status === "ENABLED" &&
                      includes(botIds, bot?.id)
                    : true
                ) {
                  if (index === 0)
                    return normalizeUsers({
                      ...bot,
                      botUuid: bot?.id,
                      active: true,
                      createTime: moment(bot?.createdAt).valueOf(),
                    });
                  return normalizeUsers({
                    ...bot,
                    active: false,
                    botUuid: bot?.id,
                    createTime: moment(bot?.createdAt).valueOf(),
                  });
                }
                return null;
              }),
              ["createTime"]
            )
          ),
          null
        );

        const activeBots = filter(botDetailsList, { isExpired: false });
        const expiredBots = filter(botDetailsList, { isExpired: true });
        const botList = concat(activeBots, expiredBots);
        logToAndroid(`botDetailsList:${JSON.stringify(botDetailsList)}`);

        state.all = botList;
        triggerEventInAndroid("onBotDetailsLoaded", JSON.stringify(botList));

        if (localStorage.getItem("currentUser")) {
          state.active = JSON.parse(localStorage.getItem("currentUser"));
        } else {
          state.active = botList?.[0];
        }

        return state;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoading, setActiveUser, setBotImage } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.users;
export const selectActiveUser = (state: RootState) => state.users.active;
export const isLoadingSelector = (state: RootState) => state.users.loading;

export default userSlice.reducer;
