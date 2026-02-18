import { Metadata } from "next";
import WorkTalkClient from "./WorkTalkClient";

export const metadata: Metadata = {
  title: "WorkTalk | Practice Job English Phrases",
  description:
    "Learn and practice essential English phrases for the workplace. Build confidence with flashcards for common job situations.",
  keywords: [
    "workplace English",
    "job phrases",
    "English flashcards",
    "work vocabulary",
    "ESL work",
    "professional English",
  ],
};

export default function WorkTalkPage() {
  return <WorkTalkClient />;
}

