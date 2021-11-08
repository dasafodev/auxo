import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/candidatesPage.css";
import { Header } from "../components/header";

export const CandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3010/candidates")
      .then((response) => setCandidates(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const generateSeed = () => {
    return (Math.random() + 1).toString(36).substring(7);
  };

  return (
    <>
      <Header title="Candidates" />
      <ul className="candidates">
        {candidates.map((candidate) => (
          <CandidateItem
            key={candidate.name}
            candidate={candidate}
            seed={generateSeed}
          />
        ))}
      </ul>
    </>
  );
};

const CandidateItem = ({ candidate, seed }) => {
  return (
    <li className="candidate" key={candidate.name}>
      <img
        className="avatar"
        src={`https://avatars.dicebear.com/api/bottts/${seed()}.svg`}
        alt="avatar"
      />
      <p>{candidate.name}</p>
    </li>
  );
};
