export default function TrendingSection() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-5">Yang Lagi Ngetren</h2>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 row-span-2 bg-white rounded-2xl"></div>
        <div className="col-span-3 bg-white h-[150px] rounded-2xl"></div>
        <div className="col-span-3 row-span-2 bg-white rounded-2xl"></div>
        <div className="col-span-3 bg-white h-[150px] rounded-2xl"></div>
        <div className="col-span-3 bg-white h-[150px] rounded-2xl"></div>
        <div className="col-span-3 bg-white h-[150px] rounded-2xl"></div>
      </div>
    </div>
  );
}
