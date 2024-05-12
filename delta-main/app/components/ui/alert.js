/* Creating a new element called styles and assigning it to the variable alertStyles. */
const alertStyles = document.createElement('style');
alertStyles.textContent = `
  .alert {
    visibility: hidden;
    min-width: 250px;
    margin-right: 125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(30px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 12px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    right: 5%;
    bottom: 10vh;
    font-size: 1.05em;
  }

  .alert-info {
    background: rgba(0, 255, 0, 0.30);
  }

  .alert-danger {
    background: rgba(255, 0, 0, 0.30);
  }

  .show {
    visibility: visible;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
  
  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    
    to {
      bottom: 30px;
      opacity: 1;
    }
  }
  
  @keyframes fadeout {
    from {
      bottom: 30px;
      opacity: 1;
    }
    
    to {
      bottom: 0;
      opacity: 0;
    }
  }
`;

document.head.append(alertStyles);

/**
 * @typedef {'alert-info'| 'alert-danger'} alertSelect
 * It creates a div element, adds text to it, adds classes to it, adds it to the DOM, and then removes
 * it after 3 seconds
 * @param {string} txt - The text to display in the alert.
 * @param {alertSelect} classAlert - This is the class that will be added to the toast element. This will be used to
 * style the toast element.
 */
const alertMsg = (txt, classAlert) => {
  const toast = document.createElement('div');
  toast.textContent = txt;
  toast.classList.add('alert', classAlert, 'show');

  document.body.prepend(toast);

  setTimeout(() => { 
    toast.classList.remove('show');
    document.body.removeChild(toast);
  }, 3000);
};

module.exports = alertMsg;
