import * as React from "react";
import { render } from "react-dom";
import { Parent as Hook1 } from "./hook1";
import { Parent as Hook2 } from "./hook2";
function App() {
  return (
    <div className="App">
      <Hook2 />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
