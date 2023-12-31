"use client";
import * as React from "react";
import ButtonUnstyled, { ButtonProps } from "@mui/base/Button";

function Button(props: ButtonProps & { "aria-label": string }) {
  return <ButtonUnstyled {...props} />;
}

export default Button;
