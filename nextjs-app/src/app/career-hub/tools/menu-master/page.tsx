import { Metadata } from "next";
import MenuMasterClient from "./MenuMasterClient";

export const metadata: Metadata = {
  title: "Menu Master | Learn Culinary Terms",
  description:
    "Master culinary terminology with flashcards. Learn cooking terms, techniques, and menu vocabulary for restaurant work.",
  keywords: [
    "culinary terms",
    "menu vocabulary",
    "restaurant training",
    "cooking terms",
    "food terminology",
    "server training",
  ],
};

export default function MenuMasterPage() {
  return <MenuMasterClient />;
}

