import Hero from "@/components/pages/home/Hero";
import StackedCards from "@/components/pages/home/StackedCards";
import ReviewSection from "@/components/pages/home/ReviewSection";
import RealResult from "@/components/pages/home/RealResult";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <StackedCards />
      {/* <RealResult />  */}
      <ReviewSection  />
    </div>
  );
}
