import { LenisProvider } from "./hooks/useLenis";
import { WeddingHero } from "./components/WeddingHero";
import { WelcomeScene } from "./components/WelcomeScene";
import { CoupleScene } from "./components/CoupleScene";
import { JourneyScene } from "./components/JourneyScene";
import { SaveTheDateScene } from "./components/SaveTheDateScene";
import { HaldiScene } from "./components/HaldiScene";
import { ElephantProcessionScene } from "./components/ElephantProcessionScene";
import { WeddingCeremonyScene } from "./components/WeddingCeremonyScene";
import { VenueScene } from "./components/VenueScene";
import { BlessingsScene } from "./components/BlessingsScene";
import { ThankYouScene } from "./components/ThankYouScene";
import { FinalScene } from "./components/FinalScene";
import { ProgressNav } from "./components/ProgressNav";
import { MusicToggle } from "./components/MusicToggle";

function App() {
  return (
    <LenisProvider>
      <main>
        <WeddingHero />
        <WelcomeScene />
        <CoupleScene />
        <JourneyScene />
        <SaveTheDateScene />
        <HaldiScene />
        <ElephantProcessionScene />
        <WeddingCeremonyScene />
        <VenueScene />
        <BlessingsScene />
        <ThankYouScene />
        <FinalScene />
      </main>
      <ProgressNav />
      <MusicToggle />
    </LenisProvider>
  );
}

export default App;
