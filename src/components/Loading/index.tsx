import React from "react";

import "./styles.css";

const Loading: React.FC = () => {
  return (
    <>
      <div className="col">
        <div className="card shadow-sm h-100" aria-hidden="true">
          <div className="loading-card">
            <div className="p-5 h-100 bg-secondary bg-gradient border secondary rounded-top"></div>
          </div>
          <div className="card-body border secondary">
            <h5 className="card-title text-center placeholder-glow mt-2 mb-3">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow mt-3 pt-2">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
              <span className="mt-4 mb-3 placeholder col-12 bg-primary"></span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
