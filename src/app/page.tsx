import { ContactTile } from "@/components/contact-tile";
import { ExperienceSection } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Intro } from "@/components/sections/intro";
import { Projects } from "@/components/sections/projects";
import { Technologies } from "@/components/sections/technologies";

/** Overview first, projects straight after it, then experience, technologies and contact. */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Intro />
        <Projects />
        <ExperienceSection />
        <Technologies />
        <section className="pb-6">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <ContactTile />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
