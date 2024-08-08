const htmlTextarea = document.getElementById('html');
const output = document.getElementById('output');
const query = document.getElementById('qurey');
const copyButton = document.getElementById('copy');
const textButton = document.getElementById('text');
const nodeButton = document.getElementById('node');

// Initialize CodeMirror for the textarea
const editor = CodeMirror.fromTextArea(htmlTextarea, {
  mode: 'xml',
  autoCloseTags: true,
});


function text(query) {  // function to represent text inside the search html in output textarea
  output.value = '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(editor.getValue(), 'text/html'); // to take all html in html textarea ad doc
  let queryUser = doc.querySelectorAll(`${query.value}`); 
  queryUser.forEach(element => {
    output.value += element.textContent + '\n';
  });
}

function node(query) { // function to represent search node in output textarea
  output.value = '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(editor.getValue(), 'text/html');
  let queryUser = doc.querySelectorAll(`${query.value}`);
  queryUser.forEach(element => {
    output.value += element.outerHTML + '\n';
  });
}

function copy() { // function to copy button
  output.select(); // to select text
  output.setSelectionRange(0, 99999); // selection range for mobile
  document.execCommand('copy'); // to copy select text
}

query.addEventListener('keypress', function(e) { // code when we press enter and to execute node function
  if (e.key === 'Enter') {
    node(query);
  }
});

copyButton.addEventListener('click', function() { // when click on copy button copy function will execute
  copy();
});

textButton.addEventListener('click', function() { // when click on text button text function will execute
  text(query);
});

nodeButton.addEventListener('click', function() { // when click on node button node function will execute
  node(query);
});