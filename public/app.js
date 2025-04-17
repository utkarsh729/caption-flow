// app.js
const socket = io();  // Connect to the backend server
const recordBtn = document.getElementById('recordBtn');
const captionBox = document.getElementById('caption');
const lastCaptionBox = document.getElementById('lastCaption');

// Record audio and send to backend via WebSocket
async function startRecording() {
  // Get user media (microphone)
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.start();
  const audioChunks = [];

  mediaRecorder.ondataavailable = event => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const reader = new FileReader();
    reader.onloadend = () => {
      const audioData = reader.result.split(',')[1];  // Convert to base64 string
      socket.emit('audioStream', audioData);  // Send audio to the backend for processing
    };
    reader.readAsDataURL(audioBlob);
  };

  // Stop recording after 10 seconds (you can adjust this based on needs)
  setTimeout(() => mediaRecorder.stop(), 10000);
}

// Receive the caption and detected language from the backend
socket.on('caption', (data) => {
  captionBox.textContent = data.text;  // Display caption in real-time
  lastCaptionBox.textContent = `Last Caption: ${data.text}`;  // Update last caption
  console.log('Detected Language:', data.language);  // Log detected language
});

// Start recording when the button is clicked
recordBtn.onclick = startRecording;
