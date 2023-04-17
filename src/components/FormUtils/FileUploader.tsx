import { ChangeEvent, useRef, useState } from "react";

export const FileUploader = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("File is not selected");

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let uploadedFile: File;
    let fileUploaded = event.target.files;
    if (fileUploaded && fileUploaded.length > 0) {
      uploadedFile = fileUploaded[0];
      setFileName(uploadedFile.name);
    }
  };
  return (
    <div className="flex items-center">
      <div className="h-full h-12 w-1/4">
        <button
          className="bg-indigo-500 rounded-l-lg p-2 text-white w-full h-full font-semibold"
          onClick={handleClick}
          type="button"
        >
          Upload a file
        </button>
        <input
          type="file"
          name="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="border h-12 w-3/4 rounded-r-lg font-semibold py-2 pl-4 flex items-center ">
        <p>{fileName}</p>
      </div>
    </div>
  );
};
