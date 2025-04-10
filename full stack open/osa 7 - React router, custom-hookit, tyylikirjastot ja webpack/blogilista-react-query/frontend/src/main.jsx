import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserContextProvider } from "./reducers/UserContext";
import { NotificationContextProvider } from "./reducers/NotificationContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
  <NotificationContextProvider>
  <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </NotificationContextProvider>
  </UserContextProvider>
);
