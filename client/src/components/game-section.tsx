import { SectionTitle } from "@/components/ui/section-title";
import MultiplayerGame from "@/game/multiplayer-game";

export default function GameSection() {
  return (
    <section id="game" className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Same-Couch Multiplayer Game" className="text-white" />
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
          Take a break and enjoy a simple data-themed game! Use keyboard controls to play against a friend on the same device.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <MultiplayerGame />
        </div>
      </div>
    </section>
  );
}
