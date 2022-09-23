import { createContext, useState } from "react";

const DownloadContext = createContext();

export function DownloadProvider({ children }) {
  const [download, setDownload] = useState(null);

    const updateDownload = (value) => {
        setDownload(value);
    }
  return (
    <DownloadContext.Provider value={{ download, updateDownload }}>
      {children}
    </DownloadContext.Provider>
  );
}
export default DownloadContext;