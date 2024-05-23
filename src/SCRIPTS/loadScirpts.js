const scripts = [
    "/src/SCRIPTS/sharp.js",
    "../auth/sessionCheck.js",
    "../validations/logout.js"
  ];
  
  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.type = src.includes("module") ? "module" : "text/javascript";
    document.head.appendChild(script);
  });