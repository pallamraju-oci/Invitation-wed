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
import { ProgressNav } from "./components/ProgressNav";
import { FilmGrain } from "./components/FilmGrain";
import { GoldSparkleField } from "./components/decor";

function App() {
  return (
    <LenisProvider>
      <main>
        <WeddingHero />
        <WelcomeScene />
        <CoupleScene />
        <JourneyScene />
        <HaldiScene />
        <ElephantProcessionScene />
        <WeddingCeremonyScene />
        <VenueScene />
        <BlessingsScene />
        <SaveTheDateScene />
        <ThankYouScene />
        {/* <FinalScene /> */}
      </main>
      <ProgressNav />
      <GoldSparkleField />
      <FilmGrain />
    </LenisProvider>
  );
}

export default App;
