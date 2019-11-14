import React, { useState, useRef } from 'react';
//import logo from './logo.svg';
import Editor from './components/editor.component';
import Preview from './components/preview.component';
import Mode from './components/mode.component';
import './App.css';
import './fcc';
import Marked from './marked';

function App() {
  const text = `Marked - Markdown Parser
  ========================
  
  [Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.
  
  How To Use The Demo
  -------------------
  
  1. Type in stuff on the left.
  2. See the live updates on the right.
  
  That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:
  
  - **Preview:**  A live display of the generated HTML as it would render in a browser.
  - **HTML Source:**  The generated HTML before your browser makes it pretty.
  - **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.
  - **Quick Reference:**  A brief run-down of how to format things using markdown.
  
  Why Markdown?
  -------------
  
  It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,
  
  > The overriding design goal for Markdown's
  > formatting syntax is to make it as readable
  > as possible. The idea is that a
  > Markdown-formatted document should be
  > publishable as-is, as plain text, without
  > looking like it's been marked up with tags
  > or formatting instructions.
  
  Ready to start writing?  Either start changing stuff on the left or
  [clear everything](/demo/?text=) with a simple click.
  
  [Marked]: https://github.com/markedjs/marked/
  [Markdown]: http://daringfireball.net/projects/markdown/
  `;
  const [input, setInput] = useState({ value: text });
  const [display, setDisplay] = useState({ type: 'preview' });
  const handleChange = e => {
    setInput({
      value: e.target.value
    });
  };
  const handleClear = () => {
    setInput({
      value: ''
    });
  };
  const handleSelect = e => {
    setDisplay({
      type: e.target.value
    });
  };
  const copyTextAreaRef = useRef(null);
  const copyFeedBackDisplayRef = useRef(null);
  const handleCopy = () => {
    const copyText = copyTextAreaRef.current;
    copyText.select();
    document.execCommand('copy');

    copyFeedBackDisplayRef.current.style.display = 'block';
    setTimeout(() => {
      copyFeedBackDisplayRef.current.style.display = 'none';
    }, 1000);
  };

  return (
    <>
      <div className='app'>
        <div className='container'>
          <div className='title'>EDITOR</div>
          <div className='left_controls'>
            <button onClick={handleClear}>Clear</button>
          </div>
          <Editor onChange={handleChange} value={input} />
        </div>
        <div className='container'>
          <div className='title'>PREVIEW</div>
          <div className='right_controls'>
            <div className='select_container'>
              View Mode
              <Mode onChange={handleSelect} />
            </div>
            <button onClick={handleCopy}>Copy</button>{' '}
            <div ref={copyFeedBackDisplayRef}>Copied!</div>
          </div>
          <Preview value={Marked(input.value)} display={display} />
        </div>
      </div>
      <textarea
        className='copyTextArea'
        ref={copyTextAreaRef}
        value={Marked(input.value)}
        readOnly
      ></textarea>
    </>
  );
}

export default App;