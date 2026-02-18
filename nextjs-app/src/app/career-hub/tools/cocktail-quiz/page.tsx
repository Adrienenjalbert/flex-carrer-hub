import { Metadata } from "next";
import CocktailQuizClient from "./CocktailQuizClient";

export const metadata: Metadata = {
  title: "Cocktail Quiz | Test Your Bartending Knowledge",
  description:
    "Test your knowledge of classic cocktails. Learn ingredients, techniques, and recipes for bartending success.",
  keywords: [
    "cocktail quiz",
    "bartending test",
    "drink recipes",
    "mixology",
    "bartender training",
    "cocktail ingredients",
  ],
};

export default function CocktailQuizPage() {
  return <CocktailQuizClient />;
}

