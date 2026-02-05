import SearchBar from "@/components/SearchBar";

export default function Explore() {
  return (
    <main className="flex flex-col min-h-screen w-full gap-[80px] px-12 pt-2 pb-30 gap-[20px]">
      <div
        id="explore-banner"
        className="relative w-full flex flex-col justify-center items-center py-[40px] gap-[20px]"
      >
        <h1 className="text-balance text-white text-center text-[24px] font-semibold">
          Kafe kayak apa yang kamu cari?
        </h1>
        <SearchBar />
      </div>
      <div id="category" className="grid grid-cols-6 gap-[20px]">
        <div className="col-span-2 bg-white rounded-2xl h-[200px]" />
        <div className="col-span-2 bg-white rounded-2xl h-[200px]" />
        <div className="col-span-2 bg-white rounded-2xl h-[200px]" />
        <div className="col-span-2 col-start-2 bg-white rounded-2xl h-[200px]" />
        <div className="col-span-2 col-start-4 bg-white rounded-2xl h-[200px]" />
      </div>
    </main>
  );
}
