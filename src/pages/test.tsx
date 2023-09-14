import React from "react";
import ReactToPrint from "react-to-print";

import ComponentToPrint from "@/config/componentToPrint";

export default function Test() {
  const componentRef = React.useRef<HTMLDivElement>(null);

  const onBeforeGetContentResolve = React.useRef<(() => void) | null>(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called");
    setLoading(true);
    setText("Loading new text...");

    return new Promise<void>(resolve => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [text]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, []);

  const reactToPrintTrigger = React.useCallback(() => {
    return (
      <button className="border-1.5 rounded border-border-colour-light text-gray-800 py-2 px-3">
        Download
      </button>
    );
  }, []);

  return (
    <div>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle={"item.studentName"}
        onBeforeGetContent={handleOnBeforeGetContent}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
      {loading && <p>loading....</p>}
      <div>
        <ComponentToPrint ref={componentRef} text={text} />
      </div>
    </div>
  );
}
