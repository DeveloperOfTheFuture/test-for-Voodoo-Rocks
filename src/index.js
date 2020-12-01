import './styles/main.scss';
import '@babel/polyfill';

const URL = 'https://jsonplaceholder.typicode.com/';
const URLPosts = 'posts';
const URLAuthors = 'users';

const $postsContainer = document.querySelector('.card-columns');
const $formFilter = document.querySelector('#blog-form');

const getData = async (URLString) => {
  let response = await fetch(`${URL}${URLString}?_limit=10&_page=1`);
  let data = await response.json();
  return data;
};

const showPosts = async () => {
  const posts = await getData(URLPosts);
  const authors = await getData(URLAuthors);

  posts.forEach((post, index) => {
    const postEl = `
      <div class="post col-12 col-sm-auto col-md-6 col-lg-auto mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-primary">${post.title[0].toUpperCase() + post.title.slice(1)}</h5>
            <p class="card-text text-body">${post.body[0].toUpperCase() + post.body.slice(1)}.</p>
            <h6 class="post__author card-subtitle mb-2 text-muted">${authors[index].name}</h6>
          </div>
        </div>
      </div>
    `;

    $postsContainer.insertAdjacentHTML("afterbegin", postEl);
  });
};

const filterPosts = e => {
  e.preventDefault();

  const inputValue = document.querySelector('#filter-input').value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const author = post.querySelector('.post__author').textContent.toUpperCase();

    if (author.indexOf(inputValue) > -1) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
};

showPosts();

$formFilter.addEventListener('submit', filterPosts);