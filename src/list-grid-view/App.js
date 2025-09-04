import { useState } from "react";
import "./styles.css";

export default function App() {
  const [view, setView] = useState("list");
  const items = ["File1", "File2", "File3", "File4"];

  return (
    <div>
      <h2>File Browser</h2>
      <button onClick={() => setView("list")}>List</button>
      <button onClick={() => setView("grid")}>Grid</button>

      <div className={view === "list" ? "list-view" : "grid-view"}>
        {items.map((item, idx) => (
          <div key={idx} className="item">{item}</div>
        ))}
      </div>
    </div>
  );
}
