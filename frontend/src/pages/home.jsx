import { useState } from "react";
import Navbar from "../components/navBar";
import SectionContent from "../components/sectionHomeContent";
import logo from "../assets/cleanairlogo.png";
import headimg from "../assets/lungstitle.jpg";

export default function Home() {
  const [activeSection, setActiveSection] = useState("Home");
  const navSections = ["Home", "About Us", "Services", "Contact"];

  return (
    <>
      <Navbar />
      {/* Responsive Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center px-4 md:px-8 py-3 bg-gradient-to-r from-sky-200 to-blue-300 shadow-md sticky top-0 z-30 w-full">
        <div className="flex items-center font-bold text-2xl md:text-3xl text-white select-none w-full sm:w-auto justify-between sm:justify-start">
          <img src={logo} alt="CleanAir Healthcare Logo" className="w-14 h-10 md:w-20 md:h-12 mr-2 md:mr-3" />
          <span>CleanAir Healthcare</span>
        </div>
        <nav className="mt-3 sm:mt-0">
          <ul className="flex flex-wrap gap-4 md:gap-8 text-white font-semibold cursor-pointer select-none text-base md:text-lg">
            {navSections.map((section) => (
              <li
                key={section}
                className={`transition-colors duration-300 px-1 ${
                  activeSection === section ? "border-b-2 border-white" : "hover:text-sky-200"
                }`}
                onClick={() => setActiveSection(section)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveSection(section)}
              >
                {section}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {/* Responsive Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[80vh] min-h-[340px] overflow-hidden">
          <img
            className="w-full h-full object-cover brightness-75"
            src={headimg}
            alt="Lungs Healthy Air"
          />
          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
            <h1 className="text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg select-none animate-fade-in leading-snug md:leading-tight">
              Breathe Clean, Live Well
            </h1>
            <p className="text-blue-300 font-bold text-xl xs:text-2xl sm:text-3xl animate-pulse mt-2">
              How About Your Lungs Free Test{" "}
              <a href="/user/register" className="underline text-red-500">
                Try it!!
              </a>
            </p>
          </div>
        </div>

        {/* Main Section (with padding and responsive max width) */}
        <section className="my-8 sm:my-10 px-2 xs:px-3 sm:px-6 md:px-8 max-w-6xl mx-auto fade-in">
          <SectionContent activeSection={activeSection} />
        </section>
      </main>
    </>
  );
}
