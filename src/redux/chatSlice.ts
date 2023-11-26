// chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  text: string;
  timestamp: string;
}

interface Chat {
  id: string;
  messages: Message[];
}

interface ChatState {
  chats: Chat[];
}

const initialState: ChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
    addMessage: (state, action: PayloadAction<{ id: string; message: Message }>) => {
      const { id, message } = action.payload;
      const chatIndex = state.chats.findIndex((chat) => chat.id === id);

      if (chatIndex !== -1) {
        state.chats[chatIndex].messages.push(message);
      } else {
        // Create a new chat if the identifier is not found
        state.chats.push({ id, messages: [message] });
      }
    },
  },
});

export const { addChat, addMessage } = chatSlice.actions;
export const selectChats = (state: { chat: ChatState }) => state.chat.chats;
export default chatSlice.reducer;
