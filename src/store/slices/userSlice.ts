import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { User } from "../../types";
import { fetchUsers } from "../actions/fetchUsers";
import {
  cloneDeep,
  concat,
  filter,
  find,
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
import { getShouldFilterTheList } from "../../utils/util-functions";

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
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    setIsChatStarted: (state, action) => {
      state.active = { ...state.active, isConvStarted: action.payload.value };
      const index = findIndex(state.all, { id: action.payload.bot.id });
      state.all[index].isConvStarted = action.payload.value;
      return state;
    },
    setBotImage: (state, action) => {
      const index = findIndex(state.all, { id: action.payload.user.id });
      state.all[index].useIcon = true;
      state.all[index].botImage = action.payload.image;

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...state.all[index],
          useIcon: true,
          botImage: action.payload.image,
        })
      );
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
        const filterList = getShouldFilterTheList();
        const botIds = JSON.parse(localStorage.getItem("botList"));
        const botDetailsList = without(
          reverse(
            sortBy(
              action.payload?.map((bot: any, index: number) => {
                if (
                true
                  // bot?.logicIDs?.[0]?.transformers?.[0]?.meta?.type !==
                  //   "broadcast" &&
                  // bot?.status === "ENABLED" &&
                  // includes(botIds, bot?.id)
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
        const botList = activeBots;
        logToAndroid(`botDetailsList:${JSON.stringify(botDetailsList)}`);

        state.all = botList;

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

export const { setLoading, setActiveUser, setBotImage, setIsChatStarted } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.users;
export const selectActiveUser = (state: RootState) => state.users.active;
export const isLoadingSelector = (state: RootState) => state.users.loading;

export default userSlice.reducer;
