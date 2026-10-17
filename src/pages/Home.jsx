import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import DonateOptions from "../components/home/DonateOptions";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <DonateOptions />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </>
  );
}

export default Home;