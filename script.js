const commentsList = document.querySelector(".comments-list");
const addCommentAvatar = document.querySelector(".add-comment__avatar");
const addCommentText = document.querySelector(".add-comment__text");
const addCommentButton = document.querySelector(".add-comment__cta");
const addCommentSection = document.querySelector(".add-comment");
const invalidInput = document.querySelector(".add-comment__invalid-input");

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
          <div class="comments-list__score ">
            <div class="comments-list__minus">
             <img
              src="./images/icon-minus.svg"
              alt=""
              data-id="${comment.id}"
            />
            </div>
            <p class="comments-list__score-number" data-id="${comment.id}">${
      comment.score
    }</p>
    <div class="comments-list__plus">
            <img
              src="./images/icon-plus.svg"
              alt=""
              data-id="${comment.id}"
            />
            </div>
          </div>
          <div class="comments-list__actions">
          <div class="reply-button" data-id="${comment.id}">
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
          <div class="comments-list__score ">
            <div class="comments-list__minus">
             <img
              src="./images/icon-minus.svg"
              alt=""
              data-id="${reply.id}"
            />
            </div>
            <p class="comments-list__score-number" data-id="${reply.id}">${
          reply.score
        }</p>
    <div class="comments-list__plus">
            <img
              src="./images/icon-plus.svg"
              alt=""
              data-id="${reply.id}"
            />
            </div>
            </div>
          <div class="comments-list__actions">
          <div class="reply-button" data-id="${reply.id}">
            <img src="./images/icon-reply.svg" alt="reply icon" />
            <span>Reply</span>
            </div>
          </div>
        </li>`;
      });
    }
    // add listeners to score buttons
    const minusButtons = document.querySelectorAll(".comments-list__minus");
    const scores = document.querySelectorAll(".comments-list__score-number");
    const plusButtons = document.querySelectorAll(".comments-list__plus");

    minusButtons.forEach((button) =>
      button.addEventListener("click", (event) => {
        event.preventDefault();
        scores.forEach((score) => {
          if (event.target.dataset.id == score.dataset.id) {
            score.innerHTML--;
          } else {
            return;
          }
        });
      })
    );

    plusButtons.forEach((button) =>
      button.addEventListener("click", (event) => {
        event.preventDefault();
        scores.forEach((score) => {
          if (event.target.dataset.id == score.dataset.id) {
            score.innerHTML++;
          } else {
            return;
          }
        });
      })
    );
  });

  // set current user avatar on add-comment section
  addCommentAvatar.innerHTML = `<img
              src="${currentUser.image.png}"
              alt=""
            />`;
};

addCommentText.addEventListener("keyup", () => {
  invalidInput.innerText = "";
});

addCommentButton.addEventListener("click", async (e) => {
  e.preventDefault();
  if (addCommentText.value === "") {
    invalidInput.innerText = "You can't post empty comment!";
  } else {
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
  }
});

displayComments(addedCommentsArray);
