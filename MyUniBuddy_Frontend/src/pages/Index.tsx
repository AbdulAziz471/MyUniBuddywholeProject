import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import Stats from "@/components/Stats";
import { QADemo } from "@/components/QADemo";
import ProcessSteps from "@/components/ProcessSteps";
import FeaturesGrid from "@/components/FeaturesGrid";
import TechShowcase from "@/components/TechShowcase";
import GlobalReach from "@/components/GlobalReach";
import Innovation from "@/components/Innovation";
import { Showcase } from "@/components/Showcase";
import LatestUpdates from "@/components/LatestUpdates";
import CallToAction from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Navigation />
      <Hero />
      <Stats />
      {/* <QADemo /> */}
      <TechShowcase />
      <ProcessSteps />
      <FeaturesGrid />
      {/* <GlobalReach /> */}
      {/* <Innovation /> */}
      {/* <Showcase /> */}
      <Testimonials/>
      <LatestUpdates />
      <CallToAction />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
