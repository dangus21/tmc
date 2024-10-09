import { Titillium_Web } from "next/font/google";

const titilium = Titillium_Web({
	subsets: ["latin"], // Choose the subsets you need
	weight: ["400", "700"], // You can specify different font weights
	variable: "--font-titilium" // Set a CSS variable to use the font
});

export { titilium };
