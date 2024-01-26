import React, { useState, useEffect } from "react";

const Typewriter = ({ texts }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const text = texts[currentIndex];
    let charIndex = 0;

    const intervalId = setInterval(() => {
      if (charIndex <= text.length) {
        setCurrentText(text.substring(0, charIndex));
        charIndex += 1;
      } else {
        clearInterval(intervalId);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 1000); // Delay before starting the next text
      }
    }, 100); // Typing speed (adjust as needed)

    return () => clearInterval(intervalId);
  }, [currentIndex, texts]);

  return (
    <div className="mt-3">
      <span className="text-gray-800 text-2xl font-monospace ">
        ✍{currentText}
      </span>
    </div>
  );
};

export default Typewriter;
