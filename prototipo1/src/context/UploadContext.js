import { createContext, useState } from "react";

const UploadContext = createContext();

export function UploadProvider({ children }) {
  const [upload, setUpload] = useState(null);

    const updateUpload = (value) => {
        setUpload(value);
    }
  return (
    <UploadContext.Provider value={{ upload, updateUpload }}>
      {children}
    </UploadContext.Provider>
  );
}
export default UploadContext;