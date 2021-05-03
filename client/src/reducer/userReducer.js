export const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return action.payload;
    case "UPDATE_USER":
      console.log("here");
      return action.payload;
    default:
      console.log("Something wrong happened");
      break;
  }
};
