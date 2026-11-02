import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

const GAP = 8;
const MARGIN = 8;

const OPPOSITE = { top: "bottom", bottom: "top", left: "right", right: "left" };

const Tooltip = ({ text, children, position = "top" }) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState(null);
  const triggerRef = useRef(null);
  const tipRef = useRef(null);

  useLayoutEffect(() => {
    if (!show) {
      setCoords(null);
      return;
    }
    const trigger = triggerRef.current;
    const tip = tipRef.current;
    if (!trigger || !tip) return;

    const t = trigger.getBoundingClientRect();
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const fits = {
      top: t.top - GAP - h >= MARGIN,
      bottom: t.bottom + GAP + h <= vh - MARGIN,
      left: t.left - GAP - w >= MARGIN,
      right: t.right + GAP + w <= vw - MARGIN,
    };
    const side = !fits[position] && fits[OPPOSITE[position]] ? OPPOSITE[position] : position;

    let top;
    let left;
    if (side === "top") {
      top = t.top - GAP - h;
      left = t.left + t.width / 2 - w / 2;
    } else if (side === "bottom") {
      top = t.bottom + GAP;
      left = t.left + t.width / 2 - w / 2;
    } else if (side === "left") {
      top = t.top + t.height / 2 - h / 2;
      left = t.left - GAP - w;
    } else {
      top = t.top + t.height / 2 - h / 2;
      left = t.right + GAP;
    }

    left = Math.min(Math.max(left, MARGIN), vw - w - MARGIN);
    top = Math.min(Math.max(top, MARGIN), vh - h - MARGIN);
    setCoords({ top, left });
  }, [show, position, text]);

  useEffect(() => {
    if (!show) return;
    const hide = () => setShow(false);
    window.addEventListener("scroll", hide, true);
    return () => window.removeEventListener("scroll", hide, true);
  }, [show]);

  if (!text) return children;

  return (
    <span
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}

      {show &&
        createPortal(
          <div
            ref={tipRef}
            role="tooltip"
            style={{
              top: coords?.top ?? 0,
              left: coords?.left ?? 0,
              visibility: coords ? "visible" : "hidden",
            }}
            className="pointer-events-none fixed z-[100] w-64 max-w-[calc(100vw-16px)] rounded-lg border border-blue-700 bg-blue-800 px-3 py-2 text-xs leading-normal text-white"
          >
            {text}
          </div>,
          document.body
        )}
    </span>
  );
};

export default Tooltip;