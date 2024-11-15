import React, { useState } from 'react';
import axios from 'axios';

const Bot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { text: "Welcome to the Video Games Assistant! 🎮 \n I’m here to help you discover your next favorite game! \n Please type the number corresponding to your question below:\n \n 1-🎮 Recommend games based on your favorite genre and console.\n 2- 📖 Learn more about a specific game you have in mind.\n 3-⭐ View the top 3 rated games based on user reviews", className: "bot-message" }
  ]);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [caseChoice, setCaseChoice] = useState('');

  const appendMessage = (message, className) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: message, className },
    ]);
  };

  const sendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    appendMessage(trimmedInput, "user-message");
    setUserInput('');

    let apiEndpoint = '';
    let requestBody = {};

    try {
      if (caseChoice === '') { // No previous choice made
        if (trimmedInput === "1") {
          appendMessage("Please enter both genre and console (e.g., 'action PC')", "bot-message");
          setCaseChoice('1'); // Set choice to '1'
          return; // Exit early; wait for the next input
        } else if (trimmedInput === "2") {
          appendMessage("Please enter the game name", "bot-message");
          setCaseChoice('2'); // Set choice to '2'
          return; // Exit early; wait for the next input
        } else if (trimmedInput === "3") {
          apiEndpoint = "https://fusiontech1.onrender.com/api/Bot/top-rated";
          const response = await axios.get(apiEndpoint);
          const gameMessages = [];
          response.data.slice(0, 3).forEach((game) => {
            if (game.name) {
              gameMessages.push(`Name: ${game.name}, Rating: ${game.rating}`);
            }
          });
          if (gameMessages.length > 0) {
            appendMessage(gameMessages.join('\n'), "bot-message");
          } else {
            appendMessage("No valid games found.", "bot-message");
          }
          return; // Exit after processing top-rated games
        }
      } else {
        // Handle the subsequent input based on the user's previous choice
        if (caseChoice === '1') {
          const [genre, console] = trimmedInput.split(" ");
          if (!genre || !console) {
            appendMessage("Please provide both genre and console (e.g., 'action PC').", "bot-message");
            return; // Exit if the input is not valid
          }
          apiEndpoint = "http://localhost:5125/api/Bot/recommend";
          requestBody = { genre, console }; // Prepare the request body

          const response = await axios.post(apiEndpoint, requestBody);
          const gameMessages = [];
          response.data.slice(0, 3).forEach((game) => {
            if (game.name) {
              gameMessages.push(`Name: ${game.name}, Rating: ${game.rating} |`);
            }
          });
          if (gameMessages.length > 0) {
            appendMessage(gameMessages.join('\n'), "bot-message");
          } else {
            appendMessage("No valid games found.", "bot-message");
          }
          setCaseChoice(''); // Reset case choice after processing
        } else if (caseChoice === '2') {
          // Handle the case for searching a game by name
          const gameName = trimmedInput; // Assume the entire input is the game name
          apiEndpoint = "http://localhost:5125/api/Bot/search"; // Set the search API endpoint
          requestBody = { gameName }; // Prepare the request body

          const response = await axios.post(apiEndpoint, requestBody);
          if (response.data.length === 0) {
            appendMessage("No results found.", "bot-message");
          } else {
            const game = response.data[0]; // Assuming the response returns an array of game objects
            appendMessage(`Name: ${game.name}, Released: ${game.released}, Rating: ${game.rating}, Description: ${game.description}, Playtime: ${game.playtime}`, "bot-message");
          }
          setCaseChoice(''); // Reset case choice after processing
        }
      }
    } catch (error) {
      console.error("Error:", error);
      appendMessage("Sorry, there was an error connecting to the chatbot.", "bot-message");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const toggleChatbotVisibility = () => {
    setIsChatVisible((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleChatbotVisibility} id="toggle-chatbot">
        {isChatVisible ? "Hide Chat" : "Chat"}
      </button>
      <div id="chatbot" className={isChatVisible ? "visible" : ""}>
        <div className="chat-header" id="chat-header">Chatbot</div>
        <div className="chat-box" id="chat-box">
        {chatMessages.map((msg, index) => (
  <div key={index} className={`chat-message ${msg.className}`} dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
))}
        </div>
        <input
          type="text"
          id="user-input"
          placeholder="Type your message here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button id="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Bot;



