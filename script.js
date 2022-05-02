const commentsList = document.querySelector(".comments-list");
const minusButton = document.querySelector(".comments-list__minus");
const score = document.querySelector(".comments-list__score");
const plusButton = document.querySelector(".comments-list__plus");
const addCommentAvatar = document.querySelector(".add-comment__avatar");
const addCommentText = document.querySelector(".add-comment__text");
const addCommentButton = document.querySelector(".add-comment__cta");

let addedCommentsArray = [];

//fetch data from data.json file
const fetchComments = async () => {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

const displayComments = async (addedCommentsArray) => {
  commentsList.innerHTML = "";
  const data = await fetchComments();
  console.log(data);
  let comments = data.comments;
  const currentUser = data.currentUser;

  if (addedCommentsArray.length > 0) {
    comments = [...data.comments, ...addedCommentsArray];
  }

  comments.map((comment) => {
    commentsList.innerHTML += `<li class="comments-list__comment">
          <img
            src="${comment.user.image.png}"
            alt=""
            class="comments-list__avatar"
          />
          <div class="comments-list__username">
          <span>${comment.user.username}</span>
            ${
              comment.user.username === currentUser.username
                ? `
            <span>YOU</span>`
                : ""
            }</div>
          <span class="comments-list__createdAt">${comment.createdAt}</span>
          <p class="comments-list__content">
            ${comment.content}
          </p>
          <div class="comments-list__score">
            <img
              src="./images/icon-minus.svg"
              alt=""
              class="comments-list__minus"
            />
            <p class="comments-list__score-number">${comment.score}</p>
            <img
              src="./images/icon-plus.svg"
              alt=""
              class="comments-list__plus"
            />
          </div>
          <div class="comments-list__actions">
          <div class="reply-button" id="${comment.id}">
            <img src="./images/icon-reply.svg" alt="reply icon" />
            <span>Reply</span>
            </div>
          </div>
        </li>`;

    //add replies
    if (comment.replies.length > 0) {
      comment.replies.map((reply) => {
        commentsList.innerHTML += `<li class="comments-list__comment replying">
          <img
            src="${reply.user.image.png}"
            alt=""
            class="comments-list__avatar"
          />
          <div class="comments-list__username">
          <span>${reply.user.username}</span>
            ${
              reply.user.username === currentUser.username
                ? `
            <span>YOU</span>`
                : ""
            }</div>
          <span class="comments-list__createdAt">${reply.createdAt}</span>
          <p class="comments-list__content">
            ${reply.content}
          </p>
          <div class="comments-list__score">
            <img
              src="./images/icon-minus.svg"
              alt=""
              class="comments-list__minus"
            />
            <p class="comments-list__score-number">${reply.score}</p>
            <img
              src="./images/icon-plus.svg"
              alt=""
              class="comments-list__plus"
            />
          </div>
          <div class="comments-list__actions">
          <div class="reply-button" id="${reply.id}">
            <img src="./images/icon-reply.svg" alt="reply icon" />
            <span>Reply</span>
            </div>
          </div>
        </li>`;
      });
    }
  });

  // set current user avatar on add-comment section
  addCommentAvatar.innerHTML = `<img
              src="${currentUser.image.png}"
              alt=""
            />`;
};

addCommentButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = await fetchComments();
  const { currentUser } = data;
  console.log(currentUser);
  const newComment = {
    id: Math.random(),
    content: addCommentText.value,
    createdAt: "5 months ago",
    replies: [],
    score: 0,
    user: {
      image: { png: currentUser.image.png },
      username: currentUser.username,
    },
  };
  addedCommentsArray.push(newComment);
  displayComments(addedCommentsArray);
});

displayComments(addedCommentsArray);
