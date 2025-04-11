"use client";
import React from "react";
import ImageGrid1 from "./ui/imageGrid1";
import ImageGrid2 from "./ui/imageGrid2";
import ImageGrid3 from "./ui/imageGrid3";
import { useLanguage } from "../context/LanguageContext";
import { FiraCodeFont, OpenSansFont } from "../lib/fonts";

const ProjectsSection: React.FC = () => {
  const { translations } = useLanguage();

  const pastillesGuzzle = ["React native", "Expo"];
  const pastillesJobManager = ["Svelte", "Supabase", "N8N", "Gotenberg"];
  const pastillesArosaje = ["React native", "Expo", "SQLite"];

  return (
    <section
      id="projects"
      className="max-w-[1300px] mx-auto w-full h-auto flex flex-col justify-center pb-4 pt-14 p-6"
    >
      <div className="flex flex-row justify-between">
        <p
          className={`${FiraCodeFont.className} text-white text-xs font-medium`}
        >
          ./Projects ...
        </p>
      </div>

      {/* Guzzle */}
      <div className="flex flex-col items-center md:flex-row my-6 gap-8 ">
        <div className="w-full md:w-1/3 flex flex-col justify-center text-white">
          <h3 className={`${OpenSansFont.className} text-5xl font-thin`}>
            {translations.projectNameGuzzle}
          </h3>
          <div className="flex justify-start gap-2 mt-10 flex-wrap">
            {pastillesGuzzle.map((pastille, index) => (
              <div
                key={index}
                className="border-2 border-white px-4 py-0.5 rounded-full text-white"
              >
                {pastille}
              </div>
            ))}
          </div>
          <p className="mt-4 text-lg">
            {translations.projectDescriptionGuzzle}
          </p>
        </div>

        <div className="w-full md:w-2/3">
          <ImageGrid1
            smallImage="/images/guzzle/logo.png"
            halfImage="/images/guzzle/playerScreen.png"
            largeImage="/images/guzzle/gameScreen.png"
            tallImage="/images/guzzle/gameList.png"
          />
        </div>
      </div>

      {/* Job Manager */}
      <div className="flex items-center flex-col-reverse md:flex-row gap-8 my-6">
        <div className="w-full md:w-2/3">
          <ImageGrid2
            image1="/images/jobManager/loginScreen.png"
            image2="/images/jobManager/mainMenu.png"
            image3="/images/jobManager/client.png"
            image4="/images/jobManager/list.png"
          />
        </div>
        <div className="w-full md:w-1/3 flex flex-col justify-center text-white">
          <h3 className={`${OpenSansFont.className} text-5xl font-thin`}>
            {translations.projectNameJobManager}
          </h3>
          <div className="flex justify-start gap-2 mt-10 flex-wrap">
            {pastillesJobManager.map((pastille, index) => (
              <div
                key={index}
                className="border-2 border-white px-4 py-0.5 rounded-full text-white"
              >
                {pastille}
              </div>
            ))}
          </div>
          <p className="mt-4 text-lg">
            {translations.projectDescriptionJobManager}
          </p>
        </div>
      </div>

      {/* Arosaje */}
      <div className="flex flex-col items-center md:flex-row md:mb-10 gap-8 my-6">
        <div className="w-full md:w-1/3 flex flex-col justify-center text-white">
          <h3 className={`${OpenSansFont.className} text-5xl font-thin`}>
            {translations.projectNameArosaje}
          </h3>
          <div className="flex justify-start gap-2 mt-10 flex-wrap">
            {pastillesArosaje.map((pastille, index) => (
              <div
                key={index}
                className="border-2 border-white px-4 py-0.5 rounded-full text-white"
              >
                {pastille}
              </div>
            ))}
          </div>
          <p className="mt-4 text-lg">
            {translations.projectDescriptionArosaje}
          </p>
        </div>

        <div className="w-full md:w-2/3">
          <ImageGrid3
            smallImage="/images/arosaje/logo.png"
            halfImage="/images/arosaje/largeScreen.png"
            largeImage="/images/arosaje/mainscreen4.png"
            tallImage="/images/arosaje/loginScreen.png"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
