import { HTMLAttributes } from "react";

export function Container({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mx-auto max-w-8xl px-5 sm:px-8 lg:px-12 ${className}`} {...props}>
      {children}
    </div>
  );
}
