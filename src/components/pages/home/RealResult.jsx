// "use client";
// import { activeIngredients, info } from "@/utils/constant";
// import Image from "next/image";
// import React, { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";

// gsap.registerPlugin(ScrollTrigger);

// const TextImage = () => {

//   const image3Ref = useRef(null)

//   useGSAP(() => {
//     const ctx = gsap.context(() => {

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: image3Ref.current,
//         start: "top center+=300px",
//         end: "top top+=100px",
//         scrub: true,
//         // markers: true,
//       },
//     });

//     tl.fromTo(
//       ".image3",
//       {
//         y: -100,
//         ease: "none", // Ease not needed with scrub
//       },
//       {
//         y: 50,
//         ease: "none", // Ease not needed with scrub
//       }
//     );
//     },image3Ref);

//     return () => ctx.revert();
//   },);

//   return (
//     <>
//       <div className="container ">
//         <div className="pt-20">
//           <div>
//             <h3>
//               Simple ingredients, <strong>powerful results.</strong>
//             </h3>

//             <p className="mt-8">
//               Each ingredient in Essentia was chosen for one reason: it works.
//               No trendy botanicals that sound nice but do nothing. No irritating
//               fragrances. Just five powerful ingredients working together to
//               transform your skin.
//             </p>

//             <div className="grid grid-cols-2 mt-20 gap-20">
//               {/* LEFT IMAGE */}
//               <div className="relative w-full h-[800px] rounded-2xl overflow-hidden">
//                 <Image
//                   src="/image1.avif"
//                   alt=""
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               {/* RIGHT CONTENT */}
//               <div>
//                 <div className="border-b py-5">
//                   <div className="pill">Active Ingredients</div>
//                 </div>

//                 {activeIngredients.map((item, i) => (
//                   <div key={i} className="border-b py-5 flex justify-between">
//                     <div>{item.title}</div>
//                     <div>{item.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* BOTTOM GRID */}
//             <div className="mt-20">
//               <div className="grid grid-cols-3 gap-25">
//                 {info.map((item, i) => (
//                   <div key={i}>
//                     <Image
//                       src={item.icon}
//                       width={30}
//                       height={30}
//                       alt={item.title}
//                     />
//                     <div className="py-1 border-b flex justify-between mt-4">
//                       <p className="font-semibold">{item.title}</p>
//                       <p>0{i + 1}</p>
//                     </div>
//                     <div className="mt-2">{item.subtext}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container py-40 ">
//         <div className="grid grid-cols-2 mt-20 gap-20">
//           <div className="flex justify-center flex-col">
//             <h3>Most skincare is doing too much.</h3>
//             <p className="mt-8">
//               Ever notice how your skin gets worse the more products you try?
//               There's a reason. Most brands pile on ingredients, hoping a few
//               might work. Your poor skin is overwhelmed, irritated, and nowhere
//               near its natural best.
//             </p>
//           </div>
//           <div className="relative w-full h-[800px] rounded-2xl overflow-hidden">
//             <Image
//               className="object-cover"
//               src="/imageText1.avif"
//               fill
//               alt=""
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 mt-20 gap-20" >
//           <div className="relative w-full h-[800px] rounded-2xl overflow-hidden">
//             <Image
//               className="object-cover"
//               src="/imageText2.avif"
//               fill
//               alt=""
//             />
//           </div>
//           <div className="flex justify-center flex-col">
//             <h3>What if less actually worked better?</h3>
//             <p className="mt-8">
//               We stripped away everything unnecessary and focused on five
//               ingredients proven to strengthen your skin's natural barrier. The
//               result? Skin that looks better, feels better, and actually gets
//               healthier—not just temporarily masked.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="container relative" >
//         <div className="bg-[#D4DCCF] min-h-[170vh] rounded-2xl  flex flex-col justify-between items-center p-5" ref={image3Ref}>
//           <h3 className="pt-30 ">
//             <strong>Real result</strong> you <br /> can see and feel.
//           </h3>

//           <Image
//             className="z-0 image3"
//             src="/imageText3.avif"
//             width={700}
//             height={700}
//             alt=""
//           />

//           <div className="grid grid-cols-3 gap-4 w-full z-1">
//             <div className="flex flex-col gap-5">
//               <div className="min-h-72 flex flex-col justify-between h-full p-10 bg-white/25 rounded-lg">
//                 <h4>92.3%</h4>

//                 <div>
//                   We stripped away everything unnecessary and focused on five
//                   ingredients
//                 </div>
//               </div>
//               <div className="min-h-72 flex flex-col justify-between h-full p-10 bg-white/25 rounded-lg">
//                 <h4>28 Days</h4>

//                 <div>
//                   We stripped away everything unnecessary and focused on five
//                   ingredients
//                 </div>
//               </div>
//             </div>

//             <div className="col-span-2 h-full pt-10 px-10 rounded-lg bg-black/5 flex flex-col justify-between ">
//               <div>
//                 <h4>Science backed skincare.</h4>
//                 <p className="mt-4">
//                   Developed in partnership with dermatological researchers, our
//                   formulation philosophy is built on clinical evidence that
//                   shows fewer, more concentrated ingredients deliver superior
//                   results. Our minimalist approach is validated by extensive
//                   testing across diverse skin types and conditions.
//                 </p>
//               </div>

//               <div className="w-full flex justify-center">
//                 <Image src="/dr.avif" width={230} height={500} alt="" />
//               </div>
//             </div>

//             <div className="col-span-2">
//               <div className="relative w-full h-[350px] rounded-2xl overflow-hidden">
//                 <Image className="object-cover" src="/eye.avif" fill alt="" />
//                 <div className="absolute p-10 w-full h-full bg-black/20">
//                   <h4 className="text-white">Your skin deserves better.</h4>
//                 </div>
//               </div>
//             </div>
//             <div className="min-h-72 flex flex-col justify-between h-full p-10 bg-white/25 rounded-lg">
//               <h4>5x</h4>

//               <div>
//                 We stripped away everything unnecessary and focused on five
//                 ingredients
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TextImage;

"use client";
import { activeIngredients, info } from "@/utils/constant";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useDeviceType } from "@/hooks/useDeviceType";

gsap.registerPlugin(ScrollTrigger);

const RealResult = () => {
  const image3Ref = useRef(null);
  const imageSecRef = useRef(null);
    const device = useDeviceType();

useGSAP(
  () => {
    const imageEl = imageSecRef.current?.querySelector(".image3");
    if (!imageEl) return;

    gsap.fromTo(
      imageEl,
      { y: -100 },
      {
        y: 50,
        ease: "none",
        scrollTrigger: { 
          trigger: ".imageContainerRef",
          start:  "top center+=200",
          // start:  device === "mobile" ? "top center+=300" : "top center+=300",
          end: "top center-=200",
          // end: "bottom-=700 center-=150",
          scrub: true,
          // markers: true
        },
      }
    );

    requestAnimationFrame(() => ScrollTrigger.refresh());
  },
  { scope: imageSecRef }
);


  return (
    <div ref={imageSecRef} className="container">
      {/* TOP SECTION */}
      <div className=" section pt-5 md:pt-20">
        <h3>
          Simple ingredients, <strong>powerful results.</strong>
        </h3>
        <p className="mt-8">
          Each ingredient in Essentia was chosen for one reason: it works. No
          trendy botanicals that sound nice but do nothing. No irritating
          fragrances. Just five powerful ingredients working together to
          transform your skin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 md:mt-20 mt-10 gap-10 md:gap-20">

          <div className="relative w-full md:h-[800px] h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/image1.avif"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          <div>
            <div className="border-b py-5">
              <div className="pill">Active Ingredients</div>
            </div>
            {activeIngredients.map((item, i) => (
              <div key={i} className="border-b py-5 flex justify-between">
                <div>{item.title}</div>
                <div>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-25">
            {info.map((item, i) => (
              <div key={i}>
                <Image src={item.icon} width={30} height={30} alt={item.title} />
                <div className="py-1 border-b flex justify-between mt-4">
                  <p className="font-semibold">{item.title}</p>
                  <p>0{i + 1}</p>
                </div>
                <div className="mt-2">{item.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MID SECTIONS */}
      <div className="section grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 my-56">
        <div className="flex flex-col justify-center">
          <h3>Most skincare is doing too much.</h3>
          <p className="mt-8">
            Ever notice how your skin gets worse the more products you try? Most
            brands pile on ingredients, hoping a few might work. Your skin is
            overwhelmed, irritated, and nowhere near its natural best.
          </p>
        </div>
        <div className="relative w-full md:h-[800px] h-[400px] rounded-2xl overflow-hidden">
          <Image className="object-cover" src="/imageText1.avif" fill alt="" />
        </div>

        <div className="relative w-full md:h-[800px] h-[400px] rounded-2xl overflow-hidden">
          <Image className="object-cover" src="/imageText2.avif" fill alt="" />
        </div>
        <div className="flex flex-col justify-center">
          <h3>What if less actually worked better?</h3>
          <p className="mt-8">
            We stripped away everything unnecessary and focused on five
            ingredients proven to strengthen your skin's natural barrier.
          </p>
        </div>
      </div>

      {/* SCROLL ANIMATED SECTION */}
      <div
        
        className="relative bg-[#D4DCCF] rounded-2xl flex flex-col justify-between items-center p-4 imageContainerRef mb-56"
      >
        <h3 className="pt-30">
          <strong>Real result</strong> you <br /> can see and feel.
        </h3>

        <Image
        ref={image3Ref}
          className="z-0 image3"
          src="/imageText3.avif"
          width={700}
          height={700}
          alt=""
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full z-10">
          <div className="flex flex-col gap-4">

            <div className="backdrop-blur-2xl overflow-hidden">
              <div className="min-h-72 flex flex-col justify-between p-10 bg-white/25 rounded-lg">
              <h4>92.3%</h4>
              <div>
                We stripped away everything unnecessary and focused on five
                ingredients
              </div>
            </div>
            </div>

            <div className="backdrop-blur-2xl overflow-hidden">
              <div className="min-h-72 flex flex-col justify-between p-10 bg-white/25 rounded-lg">
              <h4>28 Days</h4>
              <div>
                We stripped away everything unnecessary and focused on five
                ingredients
              </div>
            </div>
            </div>
            
          </div>

          <div className=" backdrop-blur-2xl overflow-hidden rounded-lg md:col-span-2">
            <div className="h-full pt-10 bg-black/5 px-10 flex flex-col justify-between">
            <div>
              <h4>Science backed skincare.</h4>
              <p className="mt-4">
                Developed in partnership with dermatological researchers, our
                formulation philosophy is built on clinical evidence.
              </p>
            </div>
            <div className="w-full flex justify-center">
              <Image src="/dr.avif" width={230} height={500} alt="" />
            </div>
          </div>
          </div>

          <div className="md:col-span-2 relative w-full h-[350px] rounded-lg overflow-hidden">
            <Image className="object-cover" src="/eye.avif" fill alt="" />
            <div className="absolute p-10 w-full h-full bg-black/20">
              <h4 className="text-white">Your skin deserves better.</h4>
            </div>
          </div>

          <div className="min-h-72 flex flex-col justify-between p-10 bg-white/25 rounded-lg">
            <h4>5x</h4>
            <div>
              We stripped away everything unnecessary and focused on five
              ingredients
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealResult;

