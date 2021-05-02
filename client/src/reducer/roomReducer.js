export const roomReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROOM":
      return action.payload;
    default:
      break;
  }
};
