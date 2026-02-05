export default function TrendingSection() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-5">Yang Lagi Ngetren</h2>
      <div className="grid grid-cols-12 gap-3 md:gap-4">
        <div className="col-span-6 md:col-span-4 lg:col-span-3 md:row-span-2 bg-white rounded-2xl"></div>
        <div className="col-span-6 md:col-span-4 lg:col-span-3 bg-white sm:h-[100px] h-[200px] lg:h-[150px] rounded-2xl"></div>
        <div className="col-span-6 md:col-span-4 lg:col-span-3 md:row-span-2 bg-white rounded-2xl"></div>
        <div className="col-span-6 md:col-span-4 lg:col-span-3 bg-white sm:h-[100px] h-[200px] lg:h-[150px] rounded-2xl"></div>
        <div className="col-span-6 md:col-span-6 lg:col-span-3 bg-white sm:h-[100px] h-[200px] lg:h-[150px] rounded-2xl"></div>
        <div className="col-span-6 md:col-span-6 lg:col-span-3 bg-white sm:h-[100px] h-[200px] lg:h-[150px] rounded-2xl"></div>
      </div>
    </div>
  );
}
