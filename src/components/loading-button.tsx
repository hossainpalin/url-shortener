import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { forwardRef } from "react";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    { loading, children, className, disabled, type = "button", ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        {...props}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-white outline-none transition-colors hover:bg-primary/95 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        type={type}>
        {loading && <Loader2 className="size-4 animate-spin" />}
        {children}
      </button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";
export default LoadingButton;
