"use client";

import { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

const memo = () => {
  if (typeof document === "undefined") {
    return null;
  }

  const el = document.createElement("div");

  el.classList.add(
    "fixed",
    "top-0",
    "left-0",
    "z-100",
    "w-screen",
    "h-screen",
    "bg-[#1D1D1D99]"
  );

  return el;
};

const Portal = ({ children, className }: Props) => {
  const portalContainer = useMemo(memo, []);

  useEffect(() => {
    if (className) {
      portalContainer?.classList.add(...className.split(" "));

      return (): void => {
        portalContainer?.classList.remove(...clsx(className).split(" "));
      };
    }
  }, [className, portalContainer]);

  useEffect(() => {
    if (!portalContainer) {
      return;
    }
    const wasOverflowHidden =
      document.body.classList.contains("overflow-hidden");
    document.body.appendChild(portalContainer);
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.removeChild(portalContainer);
      if (!wasOverflowHidden) {
        document.body.classList.remove("overflow-hidden");
      }
    };
  }, [portalContainer]);

  return portalContainer && ReactDOM.createPortal(children, portalContainer);
};

export { Portal };
