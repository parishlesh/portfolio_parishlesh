import React, { useEffect } from "react";
import { MdOutlineFileDownload } from "react-icons/md";

function About({ setProgress }) {
  useEffect(() => {
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
    }, 500);
  }, []);

  const handleDownload = () => {
    setProgress(30);
    const link = document.createElement("a");
    link.href = "/resumefile/Parishlesh_Resume 1.pdf";
    link.download = "Parishlesh resume.pdf"; // This will be the name of the file when downloaded
    link.click();
    setProgress(100);
  };

  return (
    <div className="my-16">
      <div className="flex items-center justify-center p-10 bg-[#FCFCFC]">
        <h2 className="font-roboto font-normal text-4xl">About Me</h2>
      </div>
      <main className="grid grid-cols-1 lg:grid-cols-2 w-[85%] lg:w-[70%] mx-auto my-auto bg-[#ffffff] rounded-xl p-4">
        <div className="w-full flex justify-center p-4">
          <img
            src="/images/About me-cuate.png"
            alt="About Me"
            className="max-w-full h-auto"
          />
        </div>
        <div className="w-full flex flex-col justify-between p-4">
          <div>
            <p className="font-roboto font-light text-base text-center lg:text-left">
              Hello! I'm a passionate web developer with a knack for crafting
              dynamic and responsive web applications. Skilled in React JS,
              HTML, and CSS, I bring creative ideas to life with clean and
              efficient code. My projects reflect my dedication to delivering
              user-friendly and visually appealing websites.
              <br />
              <br />
              When I'm not coding, you can find me exploring new destinations,
              enjoying music, spending time with my pets, or indulging in
              sketching. These hobbies inspire my work and fuel my creativity,
              allowing me to bring fresh perspectives to every project I
              undertake.
              <br />
              <br />
              Whether it's building a complex web application or designing a
              simple webpage, I am committed to providing the best solutions and
              continuously enhancing my skills to stay at the forefront of web
              development.
            </p>
          </div>
          <div className="flex justify-center lg:justify-start mt-6">
            <button
              onClick={handleDownload}
              className="font-roboto font-light text-white bg-[#46ecaf] w-40 h-12 rounded-lg hover:bg-[#3bc693] flex justify-center items-center"
            >
              <p className="p-1">Download CV</p>
              <MdOutlineFileDownload className="text-2xl text-gray-700" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
