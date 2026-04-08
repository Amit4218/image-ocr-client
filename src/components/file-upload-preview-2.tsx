import { ImageIcon, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { useApi } from "@/contexts/ApiProvider";

const ImageUpload = () => {
  const { apiKey, model, provider } = useApi();
  const [files, setFiles] = React.useState<File[]>([]);
  const [responseType, setResponseType] = React.useState("JSON");
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!apiKey || !model || !provider) {
        toast("No api keys found", {
          description: "Please setup your apikey first",
        });
        return;
      }

      if (!files.length) {
        toast("Images not found", {
          description: "Did you forget to upload images?",
        });
        return;
      }

      if (!summary?.trim() || !responseType) {
        toast("Validation Error", {
          description: "Please fill the required fields",
        });
        return;
      }

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });

      formData.append("responseType", responseType);
      formData.append("summary", summary);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ocr`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to process OCR request");
      }

      const data = await res.json();
      console.log("OCR Result:", data);

      toast("Success", {
        description: "OCR completed successfully",
      });
    } catch (error) {
      console.error(error);

      toast("Error", {
        description: "Something went wrong while processing OCR",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Describe what data needs to be extracted
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                disabled={isLoading}
                value={summary ?? ""}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Example: Extact all the available fields like name, age etc."
              />
            </div>

            <div className="space-y-2">
              <Label>Please select the data structure</Label>
              <Select
                disabled={isLoading}
                value={responseType}
                onValueChange={setResponseType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JSON">JSON</SelectItem>
                  <SelectItem value="CSV">CSV</SelectItem>
                  <SelectItem value="MARKDOWN">MARKDOWN</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-full mt-4"
            >
              {isLoading ? "Loading please wait" : "Submit"}
            </Button>
          </CardContent>
        </Card>

        <FileUpload
          disabled={isLoading}
          accept="image/*"
          value={files}
          onValueChange={setFiles}
          multiple
          className="w-full"
        >
          <FileUploadDropzone className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-6">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full border p-3">
                <ImageIcon className="size-6 text-muted-foreground" />
              </div>

              <p className="text-sm font-medium">Upload images</p>
              <p className="text-xs text-muted-foreground">
                Drag & drop or click below
              </p>
            </div>

            <FileUploadTrigger asChild>
              <Button variant="outline" size="sm" className="mt-3">
                Select Images
              </Button>
            </FileUploadTrigger>
          </FileUploadDropzone>

          <FileUploadList className="grid grid-cols-6 sm:grid-cols-4 gap-3 mt-4 max-h-90 overflow-y-auto">
            {files.map((file, index) => (
              <FileUploadItem
                key={index}
                value={file}
                className="relative aspect-square flex-col p-0"
              >
                <FileUploadItemPreview className="size-full rounded-lg" />

                <FileUploadItemDelete asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-1 right-1 size-4 rounded-full"
                  >
                    <X className="size-3" />
                  </Button>
                </FileUploadItemDelete>
              </FileUploadItem>
            ))}
          </FileUploadList>
        </FileUpload>
      </div>
    </div>
  );
};

export default ImageUpload;
