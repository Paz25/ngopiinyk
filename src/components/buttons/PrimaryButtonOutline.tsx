type PrimaryButtonProps = {
  title: string;
};

export default function PrimaryButtonOutline({ title }: PrimaryButtonProps) {
  return (
    <button className="px-6 py-2 rounded-full font-medium text-[var(--color-primary)] border-2 border-[var(--color-primary)] cursor-pointer text-sm">
      {title}
    </button>
  );
}
