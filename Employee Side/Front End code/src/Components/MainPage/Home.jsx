import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";

const Home = ({ isSidebarOpen }) => {
  const { userId } = useContext(AuthContext);
  const [timeSpent, setTimeSpent] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [reviews, setReviews] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    fetch("http://localhost/cafevista/Modules/getManagerReviews.php")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));

    fetch("http://localhost/cafevista/Modules/getAnnouncements.php")
      .then((response) => response.json())
      .then((data) => setAnnouncements(data))
      .catch((error) => console.error("Error fetching announcements:", error));

    if (userId) {
      fetch(
        `http://localhost/cafevista/Modules/getUserTodaySpentTime.php?user_id=${userId}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setTimeSpent({
              hours: data.hours,
              minutes: data.minutes,
              seconds: data.seconds,
            });
          } else {
            setTimeSpent({
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
          }
        })
        .catch((error) => console.error("Error fetching time spent:", error));
    }
  }, [userId]);
  return (
    <>
      <div
        className="container bg-light"
        style={{
          marginTop: "90px", // Adjust this value based on the height of your navbar
        }}
      >
        {/* Content */}
        <div className="d-flex flex-column ">
          {/* First row: Graph and Today's Spent Time */}
          <div className="row mb-4">
            <div className="col-md-6 mb-4">
              <div
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: "15px",
                  background: "#ffffff",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title mb-4 d-flex align-items-center">
                    <i
                      className="fas fa-chart-line me-2 text-primary"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    Project Progress
                  </h5>
                  <div
                    className="progress"
                    style={{ height: "30px", borderRadius: "15px" }}
                  >
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "70%", borderRadius: "15px" }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      70% Complete
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div
                className="card border-0 shadow-lg"
                style={{ borderRadius: "15px", background: "#ffffff" }}
              >
                <div className="card-body">
                  <h5 className="card-title mb-4 d-flex align-items-center">
                    <i
                      className="fas fa-clock me-2 text-warning"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    Today's Spent Time
                  </h5>
                  <p className="card-text" style={{ fontSize: "1.1rem" }}>
                    You have spent{" "}
                    <span className="fw-bold text-primary">
                      {timeSpent.hours} hours{" "}
                    </span>
                    , {timeSpent.minutes} minutes, {timeSpent.seconds} seconds
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Second row: Reviews and Announcements */}
          <div className="row">
            <div className="col-md-6 mb-4">
              <div
                className="card border-0 shadow-lg"
                style={{ borderRadius: "15px", background: "#ffffff" }}
              >
                <div className="card-body">
                  <h5 className="card-title mb-4 d-flex align-items-center">
                    <i
                      className="fas fa-star me-2 text-warning"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    Management Reviews
                  </h5>
                  <div className="review-list">
                    {reviews.map(
                      (
                        { manager_name, employee_name, review, created_at },
                        currIndex
                      ) => {
                        return (
                          <div
                            key={currIndex}
                            className={`d-flex align-items-center ${
                              currIndex !== reviews.length - 1
                                ? "mb-3 border-bottom pb-2"
                                : ""
                            }`}
                          >
                            <img
                              src="https://www.w3schools.com/w3images/avatar2.png"
                              alt="Manager"
                              className="rounded-circle me-3"
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <p className="mb-1">
                                <strong>{manager_name}:</strong> {`"${review}"`}
                              </p>
                              <p className="mb-0 text-muted">
                                <small>{created_at}</small>
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div
                className="card border-0 shadow-lg"
                style={{ borderRadius: "15px", background: "#ffffff" }}
              >
                <div className="card-body">
                  <h5 className="card-title mb-4 d-flex align-items-center">
                    <i
                      className="fas fa-bullhorn me-2 text-danger"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    Announcements
                  </h5>
                  <ul className="list-unstyled">
                    {announcements.map(
                      (
                        { id, title, content, created_by, created_at },
                        index
                      ) => {
                        return (
                          <>
                            <li
                              className="mb-3 d-flex align-items-center"
                              key={index}
                            >
                              <i
                                className="fas fa-calendar-check me-2 text-success"
                                style={{ fontSize: "1.2rem" }}
                              ></i>
                              <span>{content}</span>
                            </li>
                          </>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
