type PrimaryButtonProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onclick?: () => void;
};

export default function PrimaryButton({
  children,
  className,
  disabled = false,
  onclick,
}: PrimaryButtonProps) {
  return (
    <button
      className={`bg-[var(--color-primary)] px-6 py-2.5 rounded-full font-medium cursor-pointer text-sm text-black ${className || ""}`}
      disabled={disabled}
      onClick={onclick}
    >
      {children}
    </button>
  );
}
