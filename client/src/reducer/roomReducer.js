export const roomReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, chat: [...state.chat, action.payload] };
    case "ADD_ROOM":
      return action.payload;
    default:
      return state;
  }
};
