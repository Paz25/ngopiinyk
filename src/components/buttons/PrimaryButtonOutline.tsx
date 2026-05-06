type PrimaryButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onclick?: () => void;
};

export default function PrimaryButtonOutline({
  children,
  className,
  onclick,
}: PrimaryButtonProps) {
  return (
    <button
      className={`px-6 py-2.5 text-sm rounded-full font-medium text-[var(--color-primary)] border-2 border-[var(--color-primary)] hover:bg-white/10 transition-colors duration-200 cursor-pointer ${className || ""}`}
      onClick={onclick}
    >
      {children}
    </button>
  );
}
