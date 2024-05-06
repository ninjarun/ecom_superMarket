// Inside the useEffect hook
useEffect(() => {
    // Function to handle click outside the sidebar
    const handleClickOutside = (event) => {
      // Check if the click occurred outside the sidebar
      if (!event.target.closest('.sideBar')) { // Updated condition here
        setSideBarOpen(false);
      }
    };
  
    // Add event listener when the sidebar is open
    if (sideBarOpen) {
      window.addEventListener('click', handleClickOutside); // Changed document to window
    }
  
    // Clean up the event listener when the sidebar is closed or the component unmounts
    return () => {
      window.removeEventListener('click', handleClickOutside); // Changed document to window
    };
  }, [sideBarOpen]);
  