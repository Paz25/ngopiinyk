import CafeCard from "../cards/CafeCard";

export default function BestSection() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-5">Terbaik di Setiap Kategori</h2>
      <div className="grid grid-cols-4 gap-4">
        <CafeCard
          title="Locan Coffee"
          content="Cepit Baru, Condongcatur"
          bestCategory="Hangout"
          variant="best"
        />
        <CafeCard
          title="Homi Coffee And Space"
          content="Demangan Baru, Caturtunggal"
          bestCategory="WFC"
          variant="best"
        />
        <CafeCard
          title="168 Roast Studio"
          content="Pringwulung, Condongcatur"
          bestCategory="Takeaway"
          variant="best"
        />
        <CafeCard
          title="Leren lan Sareh"
          content="Kaliurang, Hargobinangun"
          bestCategory="Tourism"
          variant="best"
        />
      </div>
    </div>
  );
}
