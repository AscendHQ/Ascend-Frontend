import { RefObject, useEffect } from "react";

type EventListener = (event: MouseEvent) => void;

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: EventListener
) {
  useEffect(() => {
    const handleOutsideClick: EventListener = e => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback(e);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, callback]);
}

export default useClickOutside;
