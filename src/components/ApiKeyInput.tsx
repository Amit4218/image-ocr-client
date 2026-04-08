import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useApi, type Providers } from "@/contexts/ApiProvider";
import { Button } from "./ui/button";

const modelProvider = ["OPENAI", "CLAUDE", "GOOGLE"];

const models = {
  CLAUDE: ["Claude-ops", "claude-sonnet"],
  OPENAI: ["gpt-mini", "whisper"],
  GOOGLE: ["gemini", "nano-banana"],
};

function ApiKeyInput() {
  const { saveCredientials, apiKey, provider, model } = useApi();
  const [filteredModels, setFilteredModels] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [key, setKey] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  useEffect(() => {
    setKey(apiKey);
    setSelectedProvider(provider);
    setSelectedModel(model);
  }, [apiKey, provider, model]);

  useEffect(() => {
    if (selectedProvider) {
      setFilteredModels(models[selectedProvider] || []);
    } else {
      setFilteredModels([]);
    }
  }, [selectedProvider]);

  return (
    <div className="mt-3 flex items-center justify-center px-4">
      <Card className="w-full lg:max-w-2/4 md:max-w-2/3">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold">Connect API</CardTitle>
          <CardDescription>
            Enter your API key and select a provider
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-xxxx..."
              className="h-10"
              value={key || ""}
              onChange={(e) => setKey(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>Select Provider</Label>
            <Select
              disabled={!isEditing}
              value={selectedProvider || ""}
              onValueChange={setSelectedProvider}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Choose a provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Providers</SelectLabel>
                  {modelProvider.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Select Model</Label>
            <Select
              disabled={!isEditing}
              value={selectedModel || ""}
              onValueChange={setSelectedModel}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Choose a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Models</SelectLabel>
                  {filteredModels.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          {isEditing ? (
            <Button
              className="w-full"
              onClick={() => {
                saveCredientials(
                  key as string,
                  selectedProvider as Providers,
                  selectedModel as string,
                );
                setIsEditing(!isEditing);
              }}
            >
              save
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              Edit
            </Button>
          )}
          <p className="text-xs text-muted-foreground text-center">
            Your API key is stored locally in your browser.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ApiKeyInput;
