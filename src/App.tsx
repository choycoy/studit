import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import { OverlayProvider } from "overlay-kit";

function App() {
  return (
    <BrowserRouter>
      <OverlayProvider>
        <Router />
      </OverlayProvider>
    </BrowserRouter>
  );
}

export default App;
