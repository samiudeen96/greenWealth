// import { useScreenSize } from "./useScreenSize";


// export const useDeviceType = () => {
//   const { width } = useScreenSize();

//   // if (width < 480) return "xs-mobile";           // very small phones
//   if (width >= 480 && width < 641) return "mobile";  // standard mobile
//   if (width >= 641 && width < 1024) return "tablet"; // tablets
//   if (width >= 1024 && width < 1280) return "laptop"; // small laptops
//   if (width >= 1280 && width < 1920) return "desktop"; // standard desktops
//   if (width >= 1920) return "large-desktop";      // 2K+ large monitors
// };


// import { useScreenSize } from "./useScreenSize";

// export const useDeviceType = () => {
//   const { width } = useScreenSize();

//   if (width < 768) return "mobile";          // mobile devices
//   if (width >= 768 && width < 1024) return "tablet";  // tablets
//   if (width >= 1024 && width < 1920) return "desktop"; // desktops
//   if (width >= 1920) return "large-device";   // large monitors / 2K+
// };


// import { useScreenSize } from "./useScreenSize";

// export const useDeviceType = () => {
//   const { width } = useScreenSize();

//   if (width < 768) return "mobile";            // mobile devices
//   if (width >= 768 && width < 1024) return "tablet"; // tablets
//   if (width >= 1024 && width < 1920) return "desktop"; // desktops
//   return "large-device";                        // 1920+
// };


import { useMediaQuery } from "react-responsive";

export const useDeviceType = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isLargeDesktop = useMediaQuery({ minWidth: 1440 });

  const device = isMobile
    ? "mobile"
    : isTablet
    ? "tablet"
    : isDesktop
    ? "desktop"
    : "large-desktop";

  return { isMobile, isTablet, isDesktop, isLargeDesktop, device };
  // return device;
};
