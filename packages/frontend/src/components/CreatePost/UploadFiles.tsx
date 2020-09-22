import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

export type FileWithPreview = File & {
  preview: string;
};

type Props = {
  files: FileWithPreview[];
  setFiles(setter: (newFiles: FileWithPreview[]) => FileWithPreview[]): void;
};

export default function MyDropzone({ files, setFiles }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    // TODO: Enforce max onDrop:
    // maxFiles: 5,
    // 10MB:
    maxSize: 10000000,
    accept: ["image/*", "video/*"],
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const thumbs = files.map((file, i) => (
    <div className="bg-white h-28 rounded overflow-hidden shadow" key={i}>
      {file.type.startsWith("video/") ? (
        <video
          controls
          muted
          loop
          disablePictureInPicture
          controlsList={"nodownload  noremoteplayback"}
          className="object-cover h-full w-full"
        >
          <source src={file.preview} type={file.type} />
          Sorry, your browser doesn't support embedded videos.
        </video>
      ) : (
        <img src={file.preview} className="object-cover h-full w-full" />
      )}
    </div>
  ));

  return (
    <div>
      <div
        className="border-dashed border-2 border-gray-400 bg-gray-300 text-gray-500 rounded text-lg text-center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {thumbs.length > 0 && (
          <div className="grid grid-cols-3 gap-4 p-4">{thumbs}</div>
        )}
        <div className="p-8">
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </div>
    </div>
  );
}
