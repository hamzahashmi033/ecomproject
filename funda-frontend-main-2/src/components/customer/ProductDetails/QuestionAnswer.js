import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import "./index.css";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function QuestionAnswer() {
  const [vote, setVote] = useState(0);
  const QuestionArray = [
    {
      id: 1,
      question: "Is this tv support external storage",
      votes: 1,
      answers: ["Yes", "No", "May be"],
      authorName: "Mohit Maron",
      authorDate: "6-10-2021",
    },
    {
      id: 2,
      question: "Is this tv support external storage",
      votes: 1,
      answers: ["Yes", "No", "May be"],
      authorName: "Mohit Maron",
      authorDate: "6-10-2021",
    },
    {
      id: 3,
      question: "Is this tv support external storage",
      votes: 1,
      answers: ["Yes", "No", "May be"],
      authorName: "Mohit Maron",
      authorDate: "6-10-2021",
    },
    {
      id: 4,
      question: "Is this tv support external storage",
      votes: 1,
      answers: ["Yes", "No", "May be"],
      authorName: "Mohit Maron",
      authorDate: "6-10-2021",
    },
  ];

  const [readMore, setReadMore] = useState(false);
  const extraContent = (
    <div>
      <p className="extra-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
        consectetur nequeab porro quasi culpa nulla rerum quis minus
        voluptatibus sed hic ad quo sint, libero commodi officia aliquam!
        Maxime.
      </p>
    </div>
  );
  const linkName = readMore ? "See less Answers << " : "See more answers >> ";

  const incrementCounter = () => setVote(vote + 1);
  let decrementCounter = () => setVote(vote - 1);

  if (vote <= 0) {
    decrementCounter = () => setVote(0);
  }

  return (
    <div>
      {QuestionArray.map((question) => {
        return (
          <Grid container spacing={2}>
            <Grid item md={1} xs={12}>
              <div className="icon-question-container">
                <FontAwesomeIcon
                  onClick={incrementCounter}
                  className="up-icon"
                  icon={faCaretUp}
                />
                <h4 className="vote-text">{vote} votes</h4>
                <FontAwesomeIcon
                  onClick={decrementCounter}
                  className="up-icon"
                  icon={faCaretDown}
                />
              </div>
            </Grid>

            <Grid item md={2} xs={12}>
              <h5 className="question-text">
                <b>Question:</b>
              </h5>
              <h4 className="question-text">
                <b>Answer:</b>
              </h4>
            </Grid>
            <Grid className="answer-text" item md={9} xs={12}>
              <h4 className="question-text">{question.question}</h4>
              <h4 className="question-text">
                {question.answers.map((ans) => {
                  return ans[0];
                })}
              </h4>
              <h4 className="author-text">
                <b>
                  By {question.authorName} on {question.authorDate}
                </b>
              </h4>
              <div className="App">
                <a
                  className="read-more-link"
                  onClick={() => {
                    setReadMore(!readMore);
                  }}
                >
                  <h2 className="read-more-link">{linkName}</h2>
                </a>
                {readMore && extraContent}
              </div>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
