import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { User } from "../../types";
import { fetchHistory } from "../actions/fetchHistory";
import { toast } from "react-hot-toast";
import { normalizedChat } from "../../utils/normalize-chats";
import { getMsgType } from "../../utils/get-msg-type";
import { logToAndroid } from "../../utils/android-events";

// Define a type for the slice state
interface UsersState {
  all: Record<string, any>;
  active: User | {};
  status: "idle" | "loading" | "succeeded" | "failed" | string;
  error: null | string;
  loading: boolean;
}

// Define the initial state using that type
const initialState: UsersState = {
  all: {},
  active: [],
  status: "idle",
  loading: true,
  error: null,
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setActiveMessages: (state, action) => {
      state.active = action.payload;
      state.all[state.active[0].botUuid] = action.payload;
      localStorage.setItem(
        "userMsgs",
        JSON.stringify(action.payload)
      );
    },
    appendMessage: (state, action) => {
      //@ts-ignore
      const prev = [...(state.all[action.payload.botUuid] || [])];
      prev.push(action.payload);
      localStorage.setItem(
        "userMsgs",
        JSON.stringify(prev)
      );
      state.all[action.payload.botUuid] = prev;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state, { meta }) => {
        state.status = "loading";
        if (!state.all[meta.arg.id]) state.loading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, { meta, payload }) => {
        state.status = "succeeded";
        state.loading = false;
        if (meta?.arg?.isExpired) toast.error("यह फॉर्म समाप्त हो गया है !");
        //@ts-ignore
        if (payload?.length > 0) {
          const normalizedChats = normalizedChat(payload);
          logToAndroid(`ChatsToDisplay:${JSON.stringify(normalizedChats)}`);
          localStorage.setItem("userMsgs", JSON.stringify(normalizedChats));
          state.active = normalizedChats;
          state.all[meta.arg.botUuid] = normalizedChats;
        }
        return state;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
        toast.error(JSON.stringify(action.error.message));
        logToAndroid( `error in fetching chat history(online):${JSON.stringify(
          action.error.message
        )}`)
      });
  },
});

export const { setLoading, setActiveMessages, appendMessage } =
  messageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMessages = (state: RootState) => state.messages;
export const selectActiveMessages = (user) => (state: RootState) => {
  return state.messages.all?.[user?.id];
};

export const selectNormalisedMessages =
  (user, botIcon,imageBlob) => (state: RootState) => {
    return (
      state.messages.all?.[user?.id]?.map((msg: any) => ({
        type: getMsgType(msg),
        content: { text: msg?.text, data: { ...msg } },
        position: msg?.position ?? "right",
        user: {
          style: { border: "2px solid lightgray" },
          avatar: msg?.position === "left" ? imageBlob ? URL.createObjectURL(imageBlob) : botIcon : "",
        },
      })) || []
    );
  };
export const isMsgLoadingSelector = (state: RootState) =>
  state.messages.loading;

export default messageSlice.reducer;
