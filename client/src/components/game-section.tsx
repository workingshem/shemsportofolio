import { SectionTitle } from "@/components/ui/section-title";
import MultiplayerGame from "@/game/multiplayer-game";

/**
 * GameSection Component
 * 
 * This section showcases the interactive multiplayer game feature of the portfolio.
 * It's designed as a "same-couch" multiplayer experience where two players can
 * compete against each other on the same device.
 * 
 * The game reinforces the portfolio's data science theme by using data-related
 * icons and having players collect data points in a gridded environment that
 * resembles a database or analytics dashboard.
 */
export default function GameSection() {
  return (
    <section id="game" className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Same-Couch Multiplayer Game" className="text-white" />
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
          Take a break and enjoy a simple data-themed game! Use keyboard controls to play against a friend on the same device.
        </p>
        
        {/* Game container with responsive max width */}
        <div className="max-w-3xl mx-auto">
          <MultiplayerGame />
        </div>
      </div>
    </section>
  );
}
