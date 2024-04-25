import React, { useState } from 'react'

const Dark = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
      };
    
  return (
    <>
       <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <header>
        
        <button onClick={toggleMode}>Toggle Mode</button>
      </header>
      <main>
        {/* Content of your application */}
      </main>
    </div>
    </>
  )
}

export default Dark
