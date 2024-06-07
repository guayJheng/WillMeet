"use client";

import Container from "./components/Container";
import Navbar from "./components/Navbar";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <Container>
        <Navbar session={session} />
        <div className="flex-grow text-center p-10">
          <div className="flex justify-center my-10"></div>
        </div>
      </Container>
    </main>
  );
}
