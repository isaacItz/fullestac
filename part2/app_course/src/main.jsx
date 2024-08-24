import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import '@src/index.css'

import App from "./App";

let notes = [
  {
    id: 1,
    content: "pero que me estas tu container tio joder macho",
    important: true,
  },
  {
    id: 2,
    content: "hola a todos como estais",
    important: false,
  },
  {
    id: 3,
    content: "hola a todos mi nombre es bob, dilan y espero que les traiga mucha alegrias en su vida sale?",
    important: true,
  },
  {
    id: 4,
    content: "que pasa chavales? aqui Willy Rex comentando",
    important: false,
  }
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App notes={notes} />
  </StrictMode>
);
