import Book from './modules/book.js';
import navbar from './modules/navInteraction.js';
import { DateTime } from './modules/luxon.js';

class BookCollection {
    #index;

    tasks;

    getTasks() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const tasksView = document.getElementById('tasks');
      tasksView.innerHTML = '';

      for (let i = 0; i < this.tasks.length; i += 1) {
        const { title } = this.tasks[i];
        const { author } = this.tasks[i];
        const id = `${title}-${i}`.split(' ').join('');

        tasksView.innerHTML += `
        <div class="book-card" id = ${id}>
            <p class="book-title">${title}</p>
            <p>By</p>
            <p class="book-author">${author}</p>
            <button type="button" class="book-btn" onclick="books.deleteTask('${id}','${title}')">Remove</button>
            <hr>
        </div>`;
      }
    }

    saveTask() {
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const task = new Book(title, author);

      if (localStorage.getItem('tasks') === null) {
        const tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } else {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      this.getTasks();
      document.getElementById('form').reset();
    }

    deleteTask(id, title) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const book = document.getElementById(id);
      for (let i = 0; i < tasks.length; i += 1) {
        if (this.tasks[i].title === title && book != null) {
          tasks.splice(i, 1);
        }
      }
      book.remove();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

let books = new BookCollection();
books.getTasks();

window.addEventListener('load', () => {
  // display the date
  document.getElementById('date').innerText = new Date().toLocaleString();
  // fetch data from local storage
  if (JSON.parse(localStorage.getItem('books')) !== null) {
    books = new BookCollection(JSON.parse(localStorage.getItem('books')));
    books.books.forEach((element) => {
      books.getTasks(element);
    });
  }
});

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();

  books.saveTask(
    document.getElementById('title').value,
    document.getElementById('author').value,
  );
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
});

const clock = () => {
  const now = DateTime.now().toFormat('LLL dd yyyy, TT');
  const date2 = document.getElementById('date');
  date2.textContent = now.toLocaleString(DateTime.DATETIME_MED);
};

setInterval(clock, 1000);

window.books = books;

const navigation = navbar;
navigation();