import Hero from "@/components/pages/home/Hero";
import StackedCards from "@/components/pages/home/StackedCards";
import ReviewSection from "@/components/pages/home/ReviewSection";
import RealResult from "@/components/pages/home/RealResult";
import Test from "@/components/animations/Test";

export default function Home() {
  return (
    <div className="">
      {/* <Test /> */}
      <Hero />
      <StackedCards />
      {/* <RealResult />  */}
      <ReviewSection  />
    </div>
  );
}
