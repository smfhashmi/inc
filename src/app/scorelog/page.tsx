'use client';
import React, { useState } from 'react';

const ScoreLog = () => {
  const [striker, setStriker] = useState('Batsman A');
  const [nonStriker, setNonStriker] = useState('Batsman B');
  const [bowler, setBowler] = useState('Bowler X');
  const [totalRuns, setTotalRuns] = useState(0);
  const [balls, setBalls] = useState(0);  // Total balls in the over
  const [overBalls, setOverBalls] = useState(0);  // Balls count for the bowler
  const [dismissal, setDismissal] = useState<string | null>(null);
  const [pendingZoneRuns, setPendingZoneRuns] = useState<number>(0); // Store zone runs temporarily
  const [pendingExtraRuns, setPendingExtraRuns] = useState<number>(0); // Store extra runs temporarily

  // Define zones with corresponding runs
  const zones = { A: 1, B: 3, C: 2, D: 1, E: 1, '4': 4, '6': 6 };

  // Handle zone click
  const handleZoneClick = (zone: string) => {
    const zoneRuns = zones[zone];
    setPendingZoneRuns(zoneRuns);
  };

  // Handle extra runs input
  const handleExtraRuns = (extraRuns: number) => {
    setPendingExtraRuns(extraRuns);
  };

  // Handle run submission (for both zone and extra runs)
  const submitRun = () => {
    const totalRunForThisBall = pendingZoneRuns + pendingExtraRuns;

    // Increment ball count only once
    setBalls((prevBalls) => prevBalls + 1);
    setOverBalls((prevBalls) => prevBalls + 1);

    // Update total score
    setTotalRuns((prevTotal) => prevTotal + totalRunForThisBall);

    // Check if striker should be switched (total runs for the ball is odd)
    if (totalRunForThisBall % 2 !== 0) {
      switchStriker();
    }

    // Clear pending runs for next ball
    setPendingZoneRuns(0);
    setPendingExtraRuns(0);

    // End of over logic (6 balls bowled)
    if (balls + 1 === 6) {
      handleEndOfOver();
    }
  };

  // Function to switch the striker
  const switchStriker = () => {
    const temp = striker;
    setStriker(nonStriker);
    setNonStriker(temp);
  };

  // Function to handle the end of over
  const handleEndOfOver = () => {
    // Switch striker automatically after 6 balls
    switchStriker();
    setBalls(0); // Reset ball count for the new over
    setOverBalls(0); // Reset bowler's ball count
    alert('End of Over');
  };

  // Handle player dismissal (caught, bowled, LBW, run out, etc.)
  const handlePlayerOut = (outType: string) => {
    setDismissal(outType);
    setBalls((prevBalls) => prevBalls + 1);
    setOverBalls((prevBalls) => prevBalls + 1);

    // Add logic to change the batsman after out
    alert(`Player got out: ${outType}`);
  };

  return (
    <div>
      <h1>Cricket Score Log</h1>
      <div>
        <h2>Striker: {striker}</h2>
        <h2>Non-Striker: {nonStriker}</h2>
        <h2>Bowler: {bowler}</h2>
        <h3>Bowler's Ball Count: {overBalls}/6</h3>
      </div>

      <div>
        <h3>Select Zone:</h3>
        {Object.keys(zones).map((zone) => (
          <button key={zone} onClick={() => handleZoneClick(zone)}>
            {zone}
          </button>
        ))}
      </div>

      <div>
        <h3>Extra Runs:</h3>
        <input
          type="number"
          placeholder="Extra Runs"
          onChange={(e) => handleExtraRuns(Number(e.target.value))}
        />
      </div>

      <div>
        <button onClick={submitRun}>Submit Run</button>
      </div>

      <div>
        <h3>Total Score: {totalRuns} Runs</h3>
        <h3>Balls Bowled: {balls}/6</h3>
      </div>

      <div>
        <h3>Player Out:</h3>
        <button onClick={() => handlePlayerOut('Caught')}>Caught</button>
        <button onClick={() => handlePlayerOut('Bowled')}>Bowled</button>
        <button onClick={() => handlePlayerOut('LBW')}>LBW</button>
        <button onClick={() => handlePlayerOut('Run Out')}>Run Out</button>
      </div>
    </div>
  );
};

export default ScoreLog;
