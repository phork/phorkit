import React from "react"

// see https://stackoverflow.com/q/58469229
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: ForwardedRef<T>) => ReactElement | null
  ): (props: P & RefAttributes<T>) => ReactElement | null
}
