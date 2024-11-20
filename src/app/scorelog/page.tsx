"use client";

import React, { useState } from "react";
import "../css/scorelog.css"; // Updated CSS file

type ZoneKey = "A" | "B" | "C" | "D" | "E" | "4" | "6";

const ScoreLog = () => {
  const [striker, setStriker] = useState("Batsman A");
  const [nonStriker, setNonStriker] = useState("Batsman B");
  const [bowler, setBowler] = useState("Bowler X");
  const [totalRuns, setTotalRuns] = useState(0);
  const [balls, setBalls] = useState(0); // balls in the current over
  const [overs, setOvers] = useState(0); // complete overs
  const [dismissal, setDismissal] = useState<string | null>(null);
  const [pendingZoneRuns, setPendingZoneRuns] = useState<number>(0);
  const [pendingExtraRuns, setPendingExtraRuns] = useState<number>(0);

  const zones: Record<ZoneKey, number> = {
    A: 1,
    B: 3,
    C: 2,
    D: 1,
    E: 1,
    "4": 4,
    "6": 6,
  };

  const handleZoneClick = (zone: ZoneKey) => {
    const zoneRuns = zones[zone];
    setPendingZoneRuns(zoneRuns);
  };

  const handleExtraRuns = (extraRuns: number) => {
    setPendingExtraRuns(extraRuns);
  };

  const submitRun = () => {
    const totalRunForThisBall = pendingZoneRuns + pendingExtraRuns;

    // Increment the total runs
    setTotalRuns((prevTotal) => prevTotal + totalRunForThisBall);

    // Increment balls bowled in the current over
    setBalls((prevBalls) => {
      const newBalls = prevBalls + 1;

      if (newBalls === 6) {
        setOvers((prevOvers) => prevOvers + 1);
        return 0; // reset balls
      }
      return newBalls; // return updated balls count
    });

    if (totalRunForThisBall % 2 !== 0) {
      switchStriker();
    }

    setPendingZoneRuns(0);
    setPendingExtraRuns(0);
  };

  const switchStriker = () => {
    const temp = striker;
    setStriker(nonStriker);
    setNonStriker(temp);
  };

  return (
    <div className="container">
      <h1>Cricket Score Log</h1>

      <div className="score-table">
        <table className="score-summary-table">
          <thead className="score-summary-head">
            <tr className="score-summary-row">
              <th colSpan={2}>Score</th>
              <th colSpan={7}>
                {totalRuns} / {overs}.{balls} overs
              </th>
            </tr>
            <tr className="this-over-head-row">
              <th colSpan={3}>This Over</th>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
            <tr className="bat-no-1-row">
              <th colSpan={3}>Bat No. 1</th>
              <td>4</td>
              <td>X</td>
              <td>8</td>
              <td>2</td>
              <td>3</td>
              <td>-</td>
            </tr>
            <tr className="bat-no-2-row">
              <th colSpan={3}>Bat No. 2</th>
              <td>X</td>
              <td>X</td>
              <td>3</td>
              <td>5</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr className="skin-score-row">
              <th colSpan={2}>SKIN No. / SCORE</th>
              <td colSpan={2}>16</td>
              <td colSpan={2}>20</td>
              <td colSpan={2}>26</td>
              <td colSpan={2}>23</td>
            </tr>
          </thead>
        </table>

        <table className="zone-table">
          <thead className="zone-table-head">
            <tr className="zone-head-row">
              <th colSpan={5}>Zone</th>
            </tr>
            <tr className="zone-row">
              <td>B</td>
              <td>C</td>
              <td>D</td>
              <td>E</td>
              <td>-</td>
            </tr>
          </thead>
        </table>

        <table className="additional-run-table">
          <thead className="additional-run-head">
            <tr className="additional-run-head-row">
              <th colSpan={7}>Additional Run</th>
            </tr>
            <tr className="additional-run-row">
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
          </thead>
        </table>

        <h3>Player Out Table</h3>
        <table className="player-out-table">
          <thead className="player-out-head">
            <tr className="player-out-head-row">
              <th colSpan={10}>OUT</th>
            </tr>
            <tr className="player-out-subhead-row">
              <td> </td>
              <td> </td>
              <td>B</td>
              <td>C</td>
              <td>L</td>
              <td>R</td>
              <td>CB</td>
              <td>H</td>
              <td>WK</td>
            </tr>
            <tr className="player-out-row">
              <th>Player No.</th>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
            </tr>
            <tr className="bowler-out-row">
              <th>Bowler No.</th>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default ScoreLog;
