import React, { ReactNode, useEffect, useState } from "react";

interface FadeProps {
  show: boolean;
  children: ReactNode;
}

const UseFade: React.FC<FadeProps> = ({ show, children }) => {
  const [shouldRender, setRender] = useState(false);

  // ALS SHOW IS AAN , START ANIMATIE

  useEffect(() => {
    if (show) {
      setRender(true);
    }

    // else {
    //   const timeout = setTimeout(() => {
    //     setRender(false);
    //   }, 490);
    //   return () => clearTimeout(timeout);
    // }
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <div
        style={{
          animation: `${show ? "fadeIn" : "fadeOut"} 250ms`,
          opacity: !show ? 0 : 1,
        }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
};

export default UseFade;
