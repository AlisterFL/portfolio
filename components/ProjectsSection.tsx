"use client";
import React from "react";
import ImageGrid from "./ui/imageGrid";
import { useLanguage } from "../context/LanguageContext";
import { FiraCodeFont, OpenSansFont } from "../lib/fonts";

const ProjectsSection: React.FC = () => {
  const { translations } = useLanguage();

  const pastilles = ["React Native", "Expo"];

  return (
    <section
      id="projects"
      className="max-w-[1300px] mx-auto w-full h-auto flex flex-col justify-center pb-4 pt-14"
    >
      {/* Titre de la section */}
      <div className="flex flex-row justify-between">
        <p className={`${FiraCodeFont.className} text-white text-xs font-medium`}>./Projects ...</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 flex flex-col justify-center text-white">
          <h3 className={`${OpenSansFont.className} text-5xl font-thin`}>{translations.projectName}</h3>
          <div className="flex justify-start gap-6 mt-10 flex-wrap">
            {pastilles.map((pastille, index) => (
              <div
                key={index}
                className="border-2 border-white px-4 py-2 rounded-full text-white"
              >
                {pastille}
              </div>
            ))}
          </div>
          <p className="mt-4 text-lg">
            {translations.projectDescription}{" "}
            {/* La description du projet est dynamique */}
          </p>
        </div>

        {/* 🖼️ Colonne Droite : ImageGrid avec images dynamiques */}
        <div className="w-full md:w-2/3">
          <ImageGrid
            smallImage="/irish_flag.jpg"
            halfImage="/irish_flag.jpg"
            largeImage="/irish_flag.jpg"
            tallImage="/irish_flag.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
