import React, { useEffect, useRef } from "react";

export const ExampleContext = React.createContext();

function SocketProvider({ children }) {

  return (
    <ExampleContext.Provider>
      {children}
    </ExampleContext.Provider>
  );
}

export default SocketProvider;
