import { Children, createContext, useState } from "react";

interface Region {
  iso: string;
  name: string;
}

export const RegionsContext = createContext<Region[]>([]);

export const ReagionProvider = () => {
  const [regions, setRegions] = useState<Region[]>([])

  return (
    <RegionsContext.Provider value={regions}>
      {Children}
    </RegionsContext.Provider>
  )
}
