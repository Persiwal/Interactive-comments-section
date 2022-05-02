const commentsList = document.querySelector(".comments-list");
const minusButton = document.querySelector(".comments-list__minus");
const score = document.querySelector(".comments-list__score");
const plusButton = document.querySelector(".comments-list__plus");

//fetch data from data.json file
const fetchComments = async () => {
  try {
    const response = await fetch("./data.json");
    data = await response.json();
    console.log(data);
    return displayComments(data);
  } catch (e) {
    console.log(e);
  }
};

const displayComments = (data) => {
  commentsList.innerHTML = "";
  const { comments, currentUser } = data;

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
            <img src="./images/icon-reply.svg" alt="reply icon" />
            <span>Reply</span>
          </div>
        </li>`;

        //add replies
        if(comment.replies.length > 0) {
            comment.replies.map(reply => {
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
            <img src="./images/icon-reply.svg" alt="reply icon" />
            <span>Reply</span>
          </div>
        </li>`;
        });
    }
  });
};

fetchComments();
