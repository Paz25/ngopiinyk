type PrimaryButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onclick?: () => void;
};

export default function PrimaryButton({
  children,
  className,
  onclick,
}: PrimaryButtonProps) {
  return (
    <button
      className={`bg-[var(--color-primary)] px-6 py-2.5 rounded-full font-medium cursor-pointer text-sm text-black ${className || ""}`}
      onClick={onclick}
    >
      {children}
    </button>
  );
}
