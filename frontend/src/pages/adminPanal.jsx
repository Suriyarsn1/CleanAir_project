import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import SectionWebsiteImages from "../components/sections/sectionWebsiteImages";
import SectionDoctorList from "../components/sections/sectionDoctorlist";
import SectionHealthCareList from "../components/sections/sectionHealthcarelist";
import SectionUserList from "../components/sections/sectionUserlist";

const SECTIONS = {
  images: SectionWebsiteImages,
  doctors: SectionDoctorList,
  healthcare: SectionHealthCareList,
  users: SectionUserList,
};

export default function AdminPanel() {
  const [active, setActive] = useState("images");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const ActiveSection = SECTIONS[active];

  return (
    <div className="flex h-screen bg-sky-50 text-sky-900">
      <Sidebar
        active={active}
        setActive={setActive}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex-grow p-8 overflow-auto">
        <ActiveSection />
      </main>
    </div>
  );
}
