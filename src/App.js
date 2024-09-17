import BigCalendar from "./components/BigCalendar";
import "./App.css";
import React, {useState} from "react";

function App() {
    const [isEventOverviewOpen, setIsEventOverviewOpen] = useState(false);
    const toggleEventOverview = () => {
        setIsEventOverviewOpen(!isEventOverviewOpen);
    };

  return (
      <div style={{ height: "100vh", display: "flex" }}>
          <div style={{ flexGrow: 2 }}>
              <BigCalendar />
          </div>

          <button
              onClick={toggleEventOverview}
              style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  zIndex: 1,
                  padding: "10px 20px",
                  fontSize: "15px",
                  backgroundColor: "#3173ac",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  outline: "none",
              }}>
              {isEventOverviewOpen ? "x" : "+"}
          </button>

          {isEventOverviewOpen && (
              <div
                  style={{
                      width: "300px",
                      backgroundColor: "#ffffff",
                      borderLeft: "1px solid black",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      padding: "20px",
                      height: "100vh",
                  }}>
                  <div
                      style={{
                          textAlign: "center",
                          fontSize: "1.5rem",
                          marginBottom: "20px",
                      }}>
                      Event Overview
                  </div>
                  <div
                      style={{
                          marginTop: "20px",
                          textAlign: "center",
                      }}>
                      Insert Event Information Here
                  </div>
              </div>
          )}
      </div>
  );
}

export default App;
