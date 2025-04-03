import React from "react";
import Heading from "../components/Heading";
import HeadingImage from "../components/HeadingImage";

export default function About() {
  return (
    <div className="mt-10 flex flex-col items-start ">
      <Heading data={"Himanshu Khairnar"} />

      <div className="mt-10 w-full">
        <h1 className="text-[24px] font-semibold">About Me</h1>
        <p className="text-gray-400 text-base md:text-lg">
          As a passionate and experienced UI designer, I am dedicated to
          creating intuitive and engaging user experiences that meet the needs
          of my clients and their users. I have a strong understanding of design
          principles and a proficiency in design tools, and I am comfortable
          working with cross-functional teams to bring projects to fruition. I
          am confident in my ability to create designs that are both visually
          appealing and functional, and I am always looking for new challenges
          and opportunities to grow as a designer.
        </p>
      </div>

      <div className="mt-10 w-full">
        <h1 className="text-[24px] font-semibold">Skills:</h1>
        <ul className="text-gray-400 list-disc ml-5 text-base md:text-lg">
          <li>
            Extensive experience in UI design, with a strong portfolio of
            completed projects.
          </li>
          <li>
            Proficiency in design tools such as Adobe Creative Suite and Sketch.
          </li>
          <li>
            Excellent visual design skills, with a strong understanding of
            layout, color theory, and typography.
          </li>
          <li>
            Ability to create wireframes and prototypes to communicate design
            concepts.
          </li>
          <li>
            Strong communication and collaboration skills, with the ability to
            work effectively with cross-functional teams.
          </li>
          <li>
            Experience conducting user research and gathering insights to inform
            design decisions.
          </li>
          <li>Proficiency in HTML, CSS, and JavaScript.</li>
        </ul>
      </div>

      <div className="mt-10 w-full">
        <h1 className="text-[24px] font-semibold">Experience:</h1>
        <ul className="text-gray-400 list-disc ml-5 text-base md:text-lg">
          <li>
            6 Months Experience as a Backend Web Developer in Softel
            Technologies INC.
          </li>
        </ul>
      </div>

      <div className="mt-10 w-full">
        <h1 className="text-[24px] font-semibold">Education:</h1>
        <ul className="text-gray-400 list-disc ml-5 text-base md:text-lg">
          <li>
            Diploma In Computer Science, In GOVERNMENT POLYTECHNIC MUMBAI :
            ongoing
          </li>
        </ul>
      </div>
    </div>
  );
}
