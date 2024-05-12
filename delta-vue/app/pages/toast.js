exports.toast = (msg, classAlert) => {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.classList.add(classAlert, 'notification', 'show');

  document.body.prepend(toast);

  setTimeout(() => {
    toast.classList.remove('show');
    document.body.removeChild(toast);
  }, 3000);
};
