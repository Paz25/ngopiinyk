type PrimaryButtonProps = {
  title: string;
};

export default function PrimaryButton({ title }: PrimaryButtonProps) {
  return (
    <button className="bg-[var(--color-primary)] px-6 py-2 rounded-full font-medium cursor-pointer text-sm text-black">
      {title}
    </button>
  );
}
