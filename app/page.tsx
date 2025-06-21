"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useRef, useState } from "react";

gsap.registerPlugin(MorphSVGPlugin);

export default function Home() {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [currentIcon, setCurrentIcon] = useState<string | null>(null);

  useGSAP(() => {
    // Create a timeline but don't auto-play it
    timelineRef.current = gsap.timeline({
      defaults: { duration: 1.5, ease: "expo.inOut" },
      paused: true, // Keep it paused initially
    });
  });

  const handleHover = (targetPath: string) => {
    if (timelineRef.current) {
      // Clear any existing animation
      timelineRef.current.clear();

      // Create new animation to morph to the target path
      timelineRef.current.to("#morphing-path", {
        morphSVG: targetPath,
        duration: 0.8,
        ease: "expo.out",
      });

      console.log(targetPath);

      setCurrentIcon(targetPath);

      // Play the animation
      timelineRef.current.restart();
    }
  };

  const handleLeave = () => {
    if (timelineRef.current) {
      // Clear any existing animation
      timelineRef.current.clear();

      // Return to the default state
      timelineRef.current.to("#morphing-path", {
        morphSVG: "#default-shape",
        duration: 0.8,
        ease: "expo.out",
      });

      setCurrentIcon(null);

      // Play the animation
      timelineRef.current.restart();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full flex items-center justify-between gap-16">
        {/* Icon Container - Left Side */}
        <div className="flex-1 flex justify-center">
          <div
            className={`w-80 h-80 flex items-center justify-center shadow-2xl transition-all duration-250 ${
              currentIcon === "#health-icon"
                ? "bg-red-500"
                : currentIcon === "#energy-icon"
                ? "bg-lime-500"
                : currentIcon === "#education-icon"
                ? "bg-cyan-500"
                : "bg-white"
            }`}
          >
            <svg
              ref={svgRef}
              id="svg-stage"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 240 240"
              className="w-48 h-48"
              fill="none"
            >
              {/* Define all the different shapes for morphing */}
              <defs>
                {/* Default/Initial Shape - Hexagon */}
                <path
                  d="M120 0L240 60V180L120 240L0 180V60Z"
                  id="default-shape"
                />

                {/* Shape 1 - Document/File Icon */}
                <path
                  d="M60 40C60 35.5817 63.5817 32 68 32H140L180 72V200C180 204.418 176.418 208 172 208H68C63.5817 208 60 204.418 60 200V40ZM150 42V72H180"
                  id="file-shape"
                />

                {/* Shape 2 - Window Icon */}
                <path
                  d="M40 60C40 54.4772 44.4772 50 50 50H190C195.523 50 200 54.4772 200 60V180C200 185.523 195.523 190 190 190H50C44.4772 190 40 185.523 40 180V60ZM70 80C70 75.5817 73.5817 72 78 72C82.4183 72 86 75.5817 86 80C86 84.4183 82.4183 88 78 88C73.5817 88 70 84.4183 70 80ZM110 80C110 75.5817 113.582 72 118 72C122.418 72 126 75.5817 126 80C126 84.4183 122.418 88 118 88C113.582 88 110 84.4183 110 80ZM150 80C150 75.5817 153.582 72 158 72C162.418 72 166 75.5817 166 80C166 84.4183 162.418 88 158 88C153.582 88 150 84.4183 150 80Z"
                  id="window-shape"
                />

                {/* Shape 3 - Path 0 */}

                <path
                  d="M240 99.2L119.5 240H119.485L119.736 141.1H0V140.4L119.8 0H120.12L119.869 99.2H240"
                  fill="white"
                  id="energy-icon"
                />

                {/* Shape 4 - Path 1 */}

                <path
                  d="M120 0H120.095L240 79.9V79.947L200.4 120.1V200L120.9 240H119.1L40.5 200.1V120.7L0 79.947V79.9L119.7 0Z"
                  fill="white"
                  id="education-icon"
                />
                {/* Shape 5 - Heart */}
                <path
                  d="M120 240L0 120L0 40L60 0L100 40L120 80L140 40L180 0L240 40L240 120L120 240Z"
                  fill="white"
                  id="health-icon"
                />
              </defs>

              {/* The morphing path - starts as default shape */}
              <path
                d="M120 0L240 60V180L120 240L0 180V60Z"
                fill="black"
                stroke="none"
                strokeWidth="2"
                id="morphing-path"
              />
            </svg>
          </div>
        </div>

        {/* Navigation List - Right Side */}
        <div className="flex-1 max-w-md">
          <div className="space-y-0">
            <h2 className="text-3xl font-bold text-white mb-8">Industries</h2>

            {/* <div
              className="group p-6 bg-gray-800 border border-gray-700 hover:border-blue-500 hover:bg-gray-750 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => handleHover("#file-shape")}
              onMouseLeave={handleLeave}
            >
              <div className="flex flex-col items-start justify-start space-x-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors"></div>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    Document Manager
                  </h3>
                  <p className="text-gray-400 mt-1">
                    Organize and manage your files efficiently
                  </p>
                </div>
              </div>
            </div>

            <div
              className="group p-6 bg-gray-800 border border-gray-700 hover:border-lime-500 hover:bg-gray-750 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => handleHover("#window-shape")}
              onMouseLeave={handleLeave}
            >
              <div className="flex flex-col items-start justify-start space-x-4">
                <div className="w-3 h-3 bg-lime-500 rounded-full group-hover:bg-lime-400 transition-colors"></div>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-lime-400 transition-colors">
                    Window Interface
                  </h3>
                  <p className="text-gray-400 mt-1">
                    Modern windowing system with smooth interactions
                  </p>
                </div>
              </div>
            </div> */}

            <div
              className="group p-6 bg-gray-800 border border-gray-700 hover:border-lime-500 hover:bg-gray-750 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => handleHover("#energy-icon")}
              onMouseLeave={handleLeave}
            >
              <div className="flex flex-col items-start justify-start space-x-4">
                {/* <div className="w-3 h-3 bg-lime-500 rounded-full group-hover:bg-lime-400 transition-colors"></div> */}
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-lime-400 transition-colors">
                    Energy
                  </h3>
                </div>
                <p className="text-gray-400 mt-1">
                  We work with energy companies to help them manage their energy
                  data and improve their operations.
                </p>
              </div>
            </div>

            <div
              className="group p-6 bg-gray-800 border border-gray-700 hover:border-cyan-500 hover:bg-gray-750 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => handleHover("#education-icon")}
              onMouseLeave={handleLeave}
            >
              <div className="flex flex-col items-start justify-start space-x-4">
                {/* <div className="w-3 h-3 bg-lime-500 rounded-full group-hover:bg-lime-400 transition-colors"></div> */}
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    Education
                  </h3>
                </div>
                <p className="text-gray-400 mt-1">
                  We work with education companies to help them manage their
                  education data and improve their operations.
                </p>
              </div>
            </div>

            <div
              className="group p-6 bg-gray-800 border border-gray-700 hover:border-red-500 hover:bg-gray-750 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => handleHover("#health-icon")}
              onMouseLeave={handleLeave}
            >
              <div className="flex flex-col items-start justify-start space-x-4">
                {/* <div className="w-3 h-3 bg-lime-500 rounded-full group-hover:bg-lime-400 transition-colors"></div> */}
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors">
                    Health
                  </h3>
                </div>
                <p className="text-gray-400 mt-1">
                  We work with health companies to help them manage their health
                  data and improve their operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
