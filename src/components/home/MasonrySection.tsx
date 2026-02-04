export default function MasonrySection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-5">Lihat Mana Yang Kamu Suka</h2>
      <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-6 gap-4">
        {children}
      </div>
    </div>
  );
}
