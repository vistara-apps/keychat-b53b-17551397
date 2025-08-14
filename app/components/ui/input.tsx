"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, ...props }, ref) => {
    return (
      <input
        type={type}
        id={id}
        className={cn("input-field", className)}
        ref={ref}
        aria-invalid={props["aria-invalid"]}
        aria-describedby={props["aria-describedby"]}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
