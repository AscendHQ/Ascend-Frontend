import { RefObject, useEffect } from "react";

type EventListener = (event: MouseEvent) => void;

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: EventListener,
  targetRef: RefObject<HTMLButtonElement>
) {
  useEffect(() => {
    const handleOutsideClick: EventListener = e => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (targetRef.current && targetRef.current.contains(e.target as Node))
          return;
        callback(e);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, callback, targetRef]);
}

export default useClickOutside;
