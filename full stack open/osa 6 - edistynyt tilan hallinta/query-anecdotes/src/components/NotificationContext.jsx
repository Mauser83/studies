import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      console.log(action);
      return action.message;
    case "CLEAR_NOTIFICATION":
      console.log(action);
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
