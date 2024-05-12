// navbar component
require('./components/ui/deltaNavbar')

// prevent key
document.addEventListener('keypress', (e) => {
  if (e.code === "Enter") {
    e.preventDefault()
    return false
  }
})
