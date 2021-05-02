export const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      console.log(action.payload);
      return action.payload;
    default:
      console.log("Something wrong happened");
      break;
  }
};
