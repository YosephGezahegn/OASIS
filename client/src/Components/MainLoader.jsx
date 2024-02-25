import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const MainLoader = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      <ClipLoader
        color="blue"
        loading={loading}
        css={{
          display: "block",
          margin: "0 auto",
          borderColor: "red",
          width: "50px",
          height: "50px",
        }}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default MainLoader;
