import { GOOGLE_SPEECH_API_KEY, GOOGLE_SPEECH_API_ENDPOINT, SPEECH_CONFIG } from '../config/api';

/**
 * Convert a Blob to a Base64 string
 * @param {Blob} blob - The audio blob to convert
 * @returns {Promise<string>} - A promise that resolves to the Base64 string
 */
export const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

/**
 * Transcribe audio using Google's Speech-to-Text API
 * @param {Blob} audioBlob - The audio blob to transcribe
 * @param {string} languageCode - The language code (e.g., 'en-US')
 * @returns {Promise<string>} - A promise that resolves to the transcription text
 */
export const transcribeAudio = async (audioBlob, languageCode = 'en-US') => {
  try {
    // Convert the audio blob to base64
    const base64Audio = await blobToBase64(audioBlob);
    const audioContent = base64Audio.split(',')[1]; // Remove the data URL prefix

    // Create the request payload
    const payload = {
      config: {
        ...SPEECH_CONFIG,
        languageCode: languageCode,
      },
      audio: {
        content: audioContent,
      },
    };

    // Send the request to Google's Speech-to-Text API
    const response = await fetch(
      `${GOOGLE_SPEECH_API_ENDPOINT}?key=${GOOGLE_SPEECH_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    // Parse the response
    const data = await response.json();

    // Extract the transcription
    if (data.results && data.results.length > 0) {
      return data.results
        .map((result) => result.alternatives[0].transcript)
        .join(' ');
    } else {
      return '';
    }
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
}; 