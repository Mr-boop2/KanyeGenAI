// Change themes 
const setTheme = theme => document.documentElement.className = theme;

// Select the quote container element
const yeQuoteEl = document.getElementById('Ye-quote');

// Add event listener for the button click event
document.getElementById('submit').addEventListener('click', function() {
  // Define the API endpoint
  const Kanye_URL ='https://api.kanye.rest';

  // Fetch data from the Kanye REST API
  fetch(Kanye_URL)
    .then(response => response.json())
    .then(responseJson => {
      const quotes = Object.entries(responseJson);

      // Loop through the response to access each quote
      for (const [, quote] of quotes) {
        // Create a new div for each quote, rather than a paragraph
        const quoteBox = document.createElement('div');
        
        // Add class to new div for styling
        quoteBox.classList.add('quote-box');
        
        
        // Format the quote and attribution, adding them to the quote box
        quoteBox.innerText = `"${quote}" - Kanye West`;

        // Append the new quote box to the existing quote element
        yeQuoteEl.append(quoteBox);
        
      }
    })
});


let textArea = document.getElementById("text-to-speech");
let speakButton = document.getElementById("speak-button");
let userInput = textArea.value;


// ElevenLabs TTS API
document.getElementById('speak-button').addEventListener('click', function() {
  const userInput = document.getElementById("user-input").value;
  const options = {
    method: 'POST',
    headers: {
        'xi-api-key': '###',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        model_id: "eleven_multilingual_v2",
        voice_settings: {
            similarity_boost: 0.7,
            stability: 0.4,
            style: 0.05,
            use_speaker_boost: true
        },
        text: userInput
    })
  };

  fetch('https://api.elevenlabs.io/v1/text-to-speech/9ghahd3uWthd2b6OAiH6/stream?output_format=mp3_44100_128', options)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.blob();
      })
      .then(blob => {
          console.log(blob.type)
          const url = window.URL.createObjectURL(blob);
          const audio = new Audio(url);
          audio.play().catch(e => console.error('Error playing audio:', e));
      })
      .catch(err => console.error(err));
});
