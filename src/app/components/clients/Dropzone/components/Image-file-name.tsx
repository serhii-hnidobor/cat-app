interface ImageFileNameProps {
  file: File | null;
}

function ImageFileName({ file }: ImageFileNameProps) {
  return (
    <span className="block w-full text-center z-[2] text-[20px] non-italic font-regular leading-[30px] text-[#8C8C8C]">
      {file?.name ? `Image File Name: ${file.name}` : "No file selected"}
    </span>
  );
}

export default ImageFileName;
