interface DropzoneInstructionTextProps {
  isDragActive: boolean;
}

function DropzoneInstruction({ isDragActive }: DropzoneInstructionTextProps) {
  const strongTextClassName = "font-medium text-[#1D1D1D]";

  return isDragActive ? (
    <span>
      <strong className={strongTextClassName}>Drop here</strong> your file
    </span>
  ) : (
    <span>
      <strong className={strongTextClassName}>Drag here</strong> your file
      or&nbsp;
      <strong className={strongTextClassName}>Click here</strong> to upload
    </span>
  );
}

export default DropzoneInstruction;
