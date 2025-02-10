"use client";

import { Tldraw, Editor } from "tldraw"; // Import Editor từ tldraw
import { customShapes } from "./shapes/CardShape"; // Import custom shapes
import "tldraw/tldraw.css";

export default function App() {
  const handleMount = (editor: Editor) => {
    // Create a default text shape for demonstration
    editor.createShape({
      type: "text",
      x: 200,
      y: 200,
      props: {
        text: "Hello world!",
      },
    });

    // Create a custom shape
    editor.createShape({
      type: "my-custom-shape", // Type matches your custom shape type
      x: 300,
      y: 300,
      props: {
        w: 200,
        h: 100,
        text: "My Custom Shape!", // Custom properties
      },
    });

    editor.selectAll();

    editor.zoomToSelection({
      animation: { duration: 5000 },
    });
  };

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      {/* Pass custom shapes to the Tldraw component */}
      <Tldraw onMount={handleMount} shapeUtils={customShapes} />
    </div>
  );
}
