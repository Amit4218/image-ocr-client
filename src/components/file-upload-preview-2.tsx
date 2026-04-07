import { ImageIcon, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

const ImageUpload = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const handleSubmit = async () => {
    if (!files.length) return;

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file); // "images" = backend field name
    });

    try {
      console.log(formData);

      //   const res = await fetch("/api/upload", {
      //     method: "POST",
      //     body: formData,
      //   });

      //   const data = await res.json();
      //   console.log("Uploaded:", data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <>
      <FileUpload
        accept="image/*"
        // maxFiles={9}
        // maxSize={5 * 1024 * 1024}
        className="w-full max-w-2/4"
        value={files}
        onValueChange={setFiles}
        multiple
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <ImageIcon className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">Upload images</p>
            <p className="text-xs text-muted-foreground"></p>
          </div>
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2">
              Select Images
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList className="grid grid-cols-6 gap-2">
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
                  className="absolute top-1 right-1 size-6"
                >
                  <X className="size-3" />
                </Button>
              </FileUploadItemDelete>
            </FileUploadItem>
          ))}
        </FileUploadList>
        <div className="text-center mt-6">
          <Button onClick={handleSubmit} className="px-8 py-4">
            Submit
          </Button>
        </div>
      </FileUpload>
    </>
  );
};

export default ImageUpload;
