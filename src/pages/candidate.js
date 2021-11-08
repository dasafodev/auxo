import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { useLocation } from "react-router-dom";
import "../styles/candidatePage.css";
import axios from "axios";

export const CandidatePage = () => {
  const location = useLocation();
  const { candidate } = location.state;

  const [applications, setApplications] = useState([]);
  const [questions, setquestions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3010/applications")
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:3010/questions")
      .then((response) => {
        setquestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const application = () => {
    return applications.find((elem) => {
      return elem.id === candidate.applicationId;
    });
  };

  const updateApplication = () => {
    axios
      .get("http://localhost:3010/applications")
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header title={candidate.name} />
      {application() !== undefined && (
        <Application
          application={application()}
          questions={questions}
          updateApplication={updateApplication}
        />
      )}
      {application() === undefined && (
        <section className="container-warning">
          <div className="warning">
            <p>The selected candidate has not applied</p>
          </div>
        </section>
      )}
    </>
  );
};

const Application = ({ application, questions, updateApplication }) => {
  console.log(application);
  return (
    <section>
      <ul className="list-videos">
        {application.videos.map((video) => (
          <VideoItem
            video={video}
            application={application}
            questions={questions}
            updateApplication={updateApplication}
          />
        ))}
      </ul>
    </section>
  );
};

const VideoItem = ({ questions, video, application, updateApplication }) => {
  const [onChange, setOnChange] = useState("");

  const handleSubmit = () => {
    const newVideo = video;
    newVideo.comments = [...video.comments, onChange];
    const videos = application.videos;
    const index = videos.findIndex((val) => {
      return val.src === video.src;
    });
    console.log(index);
    videos[index] = newVideo;
    axios
      .put(`http://localhost:3010/applications/${application.id}`, {
        videos: videos,
      })
      .then(function (response) {
        updateApplication();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log("video", video);
  const question = questions.find((elem) => elem.id === video.questionId);
  return (
    <div className="video-container">
      <video className="video" width="420">
        <source src={video.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <section>
        <h2>{question?.question}</h2>
        <ul>
          {Array.isArray(video.comments) &&
            video.comments?.map((elem) => <li>{elem}</li>)}
        </ul>
        <div className="bottom-comments">
          <input onChange={(val) => setOnChange(val.target.value)} />
          <button onClick={() => handleSubmit()}> Submit</button>
        </div>
      </section>
    </div>
  );
};
