'use client';
import * as React from "react";
import ButtonUnstyled, {
  ButtonOwnerState,
  ButtonProps,
} from "@mui/base/Button";

function Button(props: ButtonProps) {
  return (
    <ButtonUnstyled
      {...props}
      slotProps={{
        root: (state: ButtonOwnerState) => ({
          className: `hover:text-cyan-500 transition-colors ${
            state.focusVisible ? "outline-0 ring-2 ring-cyan-500" : ""
          }`,
        }),
      }}
    />
  );
}

export default Button;
