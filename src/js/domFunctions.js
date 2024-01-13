// eslint-disable-next-line no-unused-vars
const domFunctions = () => {
  const mainContainer = document.querySelector(".main-container");

  // eslint-disable-next-line no-unused-vars
  function loadingIcon(status) {
    const loadingSpinner = document.querySelector(".loadingIcon");

    if (status === "currentlyLoading") {
      loadingSpinner.className = "loading show";
      mainContainer.className = "main-container hide";
    } else {
      loadingSpinner.className = "loading hide";
    }
  }
};
