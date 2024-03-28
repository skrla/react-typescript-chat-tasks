import ReactDOM  from "react-dom/client";
import App from "./App";
import "./Assets/global.css"
import {Provider} from 'react-redux'
import { store } from "./Redux/store";
import "./Assets/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);