import React from 'react';

const AboutSection = () => {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      color : 'wheat',
    },
    heading: {
      borderBottom: '2px solid #333',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    overview: {
      marginBottom: '20px',
    },
    keyFeatures: {
      marginBottom: '20px',
    },
    howToPlay: {
      marginBottom: '20px',
    },
    technologiesUsed: {
      marginBottom: '20px',
    },
    credits: {
      marginBottom: '20px',
    },
    link: {
        color: 'cornflowerblue',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>About Tic Tac Toe Project</h2>

      <div style={styles.overview}>
        <p>
          Welcome to the Tic-Tac-Toe Game! This project is a simple yet engaging
          implementation of the classic Tic-Tac-Toe game, designed for a
          two-player mode with an option to play against the computer.
        </p>
      </div>

      <div style={styles.keyFeatures}>
        <h3>Key Features</h3>
        <ul>
          <li>
            <strong>Player Names:</strong> Customize the gaming experience by
            entering names for Player 1 and Player 2.
          </li>
          <li>
            <strong>Toggle Mode:</strong> Switch between two-player mode and
            playing against the computer.
          </li>
          <li>
            <strong>Responsive Design:</strong> Enjoy a seamless gaming
            experience on various devices, thanks to a responsive and
            user-friendly interface.
          </li>
          <li>
            <strong>Real-time Updates:</strong> Witness dynamic updates on the
            game board as players make their moves.
          </li>
        </ul>
      </div>

      <div style={styles.howToPlay}>
        <h3>How to Play</h3>
        <ol>
          <li>
            <strong>Start:</strong> Begin the game by clicking the "Start"
            button on the home page.
          </li>
          <li>
            <strong>Enter Names:</strong> Enter names for both players and
            customize the gaming experience.
          </li>
          <li>
            <strong>Toggle Mode:</strong> Choose between a two-player mode or
            challenge the computer by toggling the switch.
          </li>
          <li>
            <strong>Make Your Move:</strong> Click on the game board to make
            your move, and witness real-time updates.
          </li>
          <li>
            <strong>Game Outcome:</strong> Experience the thrill of victory or
            face the challenge of a draw as the game progresses.
          </li>
          <li>
            <strong>Restart:</strong> Restart the game at any time to enjoy
            another round of Tic-Tac-Toe.
          </li>
        </ol>
      </div>

      <div style={styles.technologiesUsed}>
        <h3>Technologies Used</h3>
        <ul>
          <li>
            <strong>React:</strong> The project is built using the React library
            for creating interactive user interfaces.
          </li>
          <li>
            <strong>Redux:</strong> State management is handled efficiently with
            Redux to maintain the game state and user preferences.
          </li>
          <li>
            <strong>React Router:</strong> Seamless navigation is achieved using
            React Router, providing a smooth transition between different game
            sections.
          </li>
        </ul>
      </div>

      <div style={styles.credits}>
        <h3>Credits</h3>
        <p>
          This project was created with passion and enthusiasm by Yashwant Poyrekar.
          Feel free to explore the source code and make contributions on{' '}
          <a style={styles.link} href='https://github.com/Yashwant937363/TicTacToe'>Github</a>.
        </p>
        <p>
          Enjoy playing Tic-Tac-Toe, and may the best player win!{' '}
          <span role="img" aria-label="confetti">
            🎉
          </span>
        </p>
      </div>
    </div>
  );
};

export default AboutSection;