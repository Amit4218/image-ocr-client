import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type Providers = "OPENAI" | "CLAUDE" | "GOOGLE";

interface ApiContextType {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;

  provider: Providers | null;
  setProvider: (provider: Providers | null) => void;

  model: string | null;
  setModel: (model: string | null) => void;

  saveCredientials: (
    key: string,
    selectedProvider: string,
    selectedModel: string,
  ) => void;
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [provider, setProvider] = useState<Providers | null>(null);
  const [model, setModel] = useState<string | null>(null);

  const saveCredientials = (
    key: string,
    selectedProvider: string,
    selectedModel: string,
  ) => {
    setApiKey(key);
    setProvider(selectedProvider as Providers);
    setModel(selectedModel);

    const data = {
      apiKey: key,
      provider: selectedProvider,
      model: selectedModel,
    };

    localStorage.setItem("credentials", JSON.stringify(data));
  };

  useEffect(() => {
    const stored = localStorage.getItem("credentials");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        setApiKey(parsed.apiKey || null);
        setProvider(parsed.provider || null);
        setModel(parsed.model || null);
      } catch {
        console.error("Invalid localStorage data");
      }
    }
  }, []);

  return (
    <ApiContext.Provider
      value={{
        apiKey,
        setApiKey,
        provider,
        setProvider,
        model,
        setModel,
        saveCredientials,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error("useApi must be used inside ApiProvider");
  return ctx;
};
