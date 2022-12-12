function navbar() {
    document.getElementById('list-link').addEventListener('click', () => {
      document.getElementById('book-cont').classList.remove('hidden');
      document.getElementById('form').classList.add('hidden');
      document.getElementById('contact').classList.add('hidden');
    });
  
    document.getElementById('add-link').addEventListener('click', () => {
      document.getElementById('book-cont').classList.add('hidden');
      document.getElementById('form').classList.remove('hidden');
      document.getElementById('contact').classList.add('hidden');
    });
  
    document.getElementById('contact-link').addEventListener('click', () => {
      document.getElementById('book-cont').classList.add('hidden');
      document.getElementById('form').classList.add('hidden');
      document.getElementById('contact').classList.remove('hidden');
    });
  }
  export default navbar;