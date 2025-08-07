// components/SectionContent.jsx

import FadeInImageText from "./fadeInimageHome";

// Import images once here to avoid repetition
import lungsImg from "../assets/lungsimg.jpg";
import aboutImg from "../assets/aboutusimg.jpg";
import servicesImg from "../assets/serviceimg.jpg";
import contactImg from "../assets/contactusimg.jpg";


const sections = {
  Home: (
    <FadeInImageText imgSrc={lungsImg} imgAlt="Healthy Lungs" title="Welcome to CleanAir Healthcare">
      <p>
        Providing you with clean air solutions for better health. Join us on a journey towards a healthier tomorrow.
      </p>
    </FadeInImageText>
  ),
  "About Us": (
    <FadeInImageText imgSrc={aboutImg} imgAlt="About Us" title="About Us">
      <p>
        CleanAir Healthcare is committed to improving air quality through innovative healthcare solutions.
        Our team is dedicated to research, education, and service excellence.
      </p>
    </FadeInImageText>
  ),
  Services: (
    <FadeInImageText imgSrc={servicesImg} imgAlt="Services" title="Services">
      <ul className="list-disc list-inside space-y-2">
        <li>Air Quality Testing and Analysis</li>
        <li>Personalized Healthcare Consultations</li>
        <li>Environmental and Occupational Health Programs</li>
        <li>Innovative Clean Air Technologies</li>
      </ul>
    </FadeInImageText>
  ),
  Contact: (
    <FadeInImageText imgSrc={contactImg} imgAlt="Contact Us" title="Contact Us">
      <p>Email: contact@cleanairhealthcare.com</p>
      <p>Phone: (123) 456-7890</p>
      <p>Address: 123 Health St, Wellness City, Country</p>
    </FadeInImageText>
  ),
};


export default function SectionContent({ activeSection }) {
  return sections[activeSection] || null;
}
