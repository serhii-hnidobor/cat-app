"use client";

import { useState, useEffect } from "react";
import useWindowDimensions from "@/app/hooks/use-window-dimension";

function OnlyDesktopWarning() {
  const [isFirstRender, setIsFirstRender] = useState(true);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  if (!isFirstRender && typeof window !== "undefined" && width < 1335) {
    return (
      <div
        id="modalOverlay"
        className="z-[9999] backdrop-blur-lg overflow-hidden w-screen h-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white w-2/3 md:w-1/3 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Warning</h2>
          <p className="text-gray-700 mb-6">
            This site is only accessible from a desktop device.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default OnlyDesktopWarning;
