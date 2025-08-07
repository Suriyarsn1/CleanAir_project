import { useState, useEffect, useRef } from "react";
import logo from "../assets/cleanairlogo.png";
import headimg from "../assets/lungstitle.jpg";
import aboutBg from "../assets/aboutusimg.jpg";    
import servicesBg from "../assets/serviceimg.jpg";
import contactBg from "../assets/contactusimg.jpg";
import Navbar from "../components/navBar";

export default function Home() {
  const navSections = ["About Us", "Services", "Contact"];
  const [activeSection, setActiveSection] = useState(navSections[0]);

  // Smooth scroll handler
  const handleNavClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  //  update activeSection state
  useEffect(() => {
    const handleScroll = () => {
      let current = navSections[0];
      for (let sectionId of navSections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= window.innerHeight / 3) current = sectionId;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom hook  avoid flickering
  const useOnScreen = (ref, rootMargin = "0px") => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry], observerInstance) => {
          if (entry.isIntersecting) {
            setIntersecting(true);
            observerInstance.unobserve(entry.target); 
          }
        },
        { rootMargin }
      );

      if (ref.current) observer.observe(ref.current);

      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, [ref, rootMargin]);

    return isIntersecting;
  };

  // Section refs
  const aboutRef = useRef();
  const servicesRef = useRef();
  const contactRef = useRef();

  // Visibility status for animation
  const aboutVisible = useOnScreen(aboutRef, "-100px");
  const servicesVisible = useOnScreen(servicesRef, "-100px");
  const contactVisible = useOnScreen(contactRef, "-100px");

  return (
    <>
    <Navbar/>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-sky-200 to-blue-300 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between p-4">
          {/* Logo and Site Title */}
          <div className="flex items-center mb-2 sm:mb-0 select-none">
            <img src={logo} alt="CleanAir Healthcare Logo" className="w-20 h-12 mr-3" />
            <span className="text-white font-extrabold text-2xl sm:text-3xl">
              CleanAir Healthcare
            </span>
          </div>

          {/* Navbar */}
          <nav>
            <ul className="flex gap-8 text-white font-semibold text-lg cursor-pointer select-none">
              {navSections.map((section) => (
                <li
                  key={section}
                  className={`pb-1 border-b-2 transition-colors duration-300 ease-in-out will-change-border-color ${
                    activeSection === section
                      ? "border-white"
                      : "border-transparent hover:border-white"
                  }`}
                  onClick={() => handleNavClick(section)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNavClick(section);
                  }}
                >
                  {section}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] min-h-[340px] overflow-hidden">
        <img
          src={headimg}
          alt="Lungs Healthy Air"
          className="w-full h-full object-cover brightness-75"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg select-none leading-tight animate-fade-in">
            Breathe Clean, Live Well
          </h1>
          <p className="text-blue-300 font-bold text-2xl mt-2 animate-pulse">
            How About Your Lungs Free Test{" "}
            <a href="/user/register" className="underline text-red-500">
              Try it!!
            </a>
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16 space-y-32">
        {/* About Us */}
        <section
          id="About Us"
          ref={aboutRef}
          className={`relative rounded-lg overflow-hidden transform transition-opacity transition-transform duration-700 ease-in-out will-change-opacity will-change-transform ${
            aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } scroll-mt-28 text-white`}
          style={{ scrollMarginTop: "112px" }}
        >
          <img
            src={aboutBg}
            alt="About Us Background"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            loading="lazy"
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-extrabold mb-6 text-yellow-300 drop-shadow-lg">
              About Us
            </h2>
            <p className="text-lg leading-relaxed max-w-3xl drop-shadow-md">
              Welcome to CleanAir Healthcare, dedicated to providing you with the best lung health
              insights and care. We believe that clean air is a fundamental right and work towards
              empowering individuals to maintain optimal lung health through innovative solutions and
              personalized care. Our mission is to help you breathe easier and live healthier.
            </p>
          </div>
        </section>

        {/* Services */}
        <section
          id="Services"
          ref={servicesRef}
          className={`relative rounded-lg overflow-hidden transform transition-opacity transition-transform duration-700 ease-in-out delay-[150ms] will-change-opacity will-change-transform ${
            servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } scroll-mt-28 text-white`}
          style={{ scrollMarginTop: "112px" }}
        >
          <img
            src={servicesBg}
            alt="Services Background"
            className="absolute inset-0 w-full h-full object-cover brightness-60"
            loading="lazy"
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 bg-gradient-to-t from-black/70 via-transparent to-black/50 rounded-lg">
            <h2 className="text-4xl font-extrabold mb-6 text-cyan-300 drop-shadow-lg">
              Services
            </h2>
            <p className="text-lg leading-relaxed max-w-3xl drop-shadow-md">
              Our services include advanced lung health diagnostics, regular check-ups, expert
              consultations, and personalized wellness plans designed to support your respiratory
              well-being. Leveraging cutting-edge technologies, we provide accurate, timely, and
              actionable insights to help you make informed health decisions and improve your quality
              of life.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section
          id="Contact"
          ref={contactRef}
          className={`relative rounded-lg overflow-hidden transform transition-opacity transition-transform duration-700 ease-in-out delay-[300ms] will-change-opacity will-change-transform ${
            contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } scroll-mt-28 text-white`}
          style={{ scrollMarginTop: "112px" }}
        >
          <img
            src={contactBg}
            alt="Contact Us Background"
            className="absolute inset-0 w-full h-full object-cover brightness-60"
            loading="lazy"
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 bg-gradient-to-t from-black/70 via-transparent to-black/50 rounded-lg">
            <h2 className="text-4xl font-extrabold mb-6 text-pink-300 drop-shadow-lg">
              Contact Us
            </h2>
            <p className="text-lg leading-relaxed max-w-3xl mb-6 drop-shadow-md">
              Reach out to us via email at{" "}
              <a href="mailto:contact@cleanairhealthcare.com" className="text-blue-400 underline">
                contact@cleanairhealthcare.com
              </a>{" "}
              or call us at (123) 456-7890. We are here to assist you with any questions or concerns
              regarding your lung health.
            </p>

            {/* Simple contact form */}
            <form
              className="max-w-md space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submission feature not implemented.");
              }}
            >
              <label htmlFor="email" className="block mb-1 font-semibold">
                Your Email:
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="message" className="block mb-1 font-semibold">
                Message:
              </label>
              <textarea
                id="message"
                rows={4}
                required
                placeholder="Your message"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
