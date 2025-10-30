const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const colors = [
  'aqua',
  'azure',
  'beige',
  'bisque',
  'black',
  'blue',
  'brown',
  'chocolate',
  'coral',
  'crimson',
  'cyan',
  'fuchsia',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lime',
  'linen',
  'magenta',
  'maroon',
  'moccasin',
  'navy',
  'olive',
  'orange',
  'orchid',
  'peru',
  'pink',
  'plum',
  'purple',
  'red',
  'salmon',
  'sienna',
  'silver',
  'snow',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'white',
  'yellow',
];

const hotword = 'hey parth'; // Wake word
let isActive = false; // Controls command mode

const output = document.querySelector('.output');
const status = document.querySelector('.status');
const bg = document.body;

recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript
    .toLowerCase()
    .trim();
  console.log('Heard:', transcript);

  // Remove punctuation
  const spoken = transcript.replace(/[^\w\s]/gi, '');

  if (!isActive) {
    // Wait for hotword
    if (spoken.includes(hotword)) {
      isActive = true;
      status.textContent = '✅ Hotword detected. Say a color name...';
      output.textContent = '';
    }
  } else {
    // Now wait for color command
    if (colors.includes(spoken)) {
      output.textContent = `✅ Color changed to: ${spoken}`;
      bg.style.backgroundColor = spoken;
    } else {
      output.textContent = `❌ "${spoken}" is not a valid color`;
    }
    isActive = false;
    status.textContent = 'Listening for wake word...';
  }
};

recognition.onerror = (event) => {
  output.textContent = `❌ Error: ${event.error}`;
  status.textContent = 'Retrying...';
  recognition.stop();
  setTimeout(() => recognition.start(), 1000); // Retry after error
};

recognition.onend = () => {
  recognition.start(); // Restart to stay always listening
};

recognition.start(); // Initial start
