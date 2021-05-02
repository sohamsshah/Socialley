export const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return action.payload

    default:
      break;
  }
};
