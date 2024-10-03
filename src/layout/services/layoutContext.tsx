import React, { FC, createContext, useContext, useState } from "react";

const Context = () => {
  const [loading, setLoading] = useState(true);

  return {
    state: { loading },
    actions: { setLoading },
  };
};

const LayoutContext = createContext<any>({ state: {}, actions: {} });

export const LayoutContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = Context();
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default function useLayoutContext() {
  return useContext<ReturnType<typeof Context>>(LayoutContext);
}
