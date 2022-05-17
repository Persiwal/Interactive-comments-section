import data from "./data.json" assert { type: "json" };

const commentsList = document.querySelector(".comments-list");
const addCommentAvatar = document.querySelector(".add-comment__avatar");
const addCommentText = document.querySelector(".add-comment__text");
const addCommentButton = document.querySelector(".add-comment__cta");
const addCommentSection = document.querySelector(".add-comment");
const invalidInput = document.querySelector(".add-comment__invalid-input");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalCancel = document.querySelector(".modal__cancel");
const modalDelete = document.querySelector(".modal__delete");

// modal.style = "display:block;";
// overlay.style = "display:block;";
// body.style = "overflow:hidden";

let comments = [...data.comments];
let currentUser = { ...data.currentUser };

const displayComments = () => {
  commentsList.innerHTML = "";

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
          <div class="comments-list__score ${
            comment.user.username === currentUser.username ? "disable" : ""
          }">
            <div class="comments-list__minus ${
              comment.user.username === currentUser.username ? "disable" : ""
            }">
             <img
              src="./images/icon-minus.svg"
              alt=""
              data-id="${comment.id}"
            />
            </div>
            <p class="comments-list__score-number" data-id="${comment.id}">
            ${comment.score}
            </p>
            <div class="comments-list__plus ${
              comment.user.username === currentUser.username ? "disable" : ""
            }">
            <img
              src="./images/icon-plus.svg"
              alt=""
              data-id="${comment.id}"
            />
            </div>
          </div>
          <div class="comments-list__actions">
          ${
            comment.user.username !== currentUser.username
              ? `<div class="reply-button" data-id="${comment.id}">
            <img src="./images/icon-reply.svg" alt="reply icon" data-id="${comment.id}"/>
            <span data-id="${comment.id}">Reply</span>
            </div>`
              : `<div class="edit-button" data-id="${comment.id}" data-id="${comment.id}">
            <img src="./images/icon-edit.svg" alt="edit icon" data-id="${comment.id}"/>
            <span data-id="${comment.id}">Edit</span></div>
            <div class="delete-button" data-id="${comment.id}">
            <img src="./images/icon-delete.svg" alt="delete icon" data-id="${comment.id}"/>
            <span data-id="${comment.id}">Delete</span></div>`
          }
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
          <div class="comments-list__score  ${
            reply.user.username === currentUser.username ? "disable" : ""
          }">
            <div class="comments-list__minus ${
              reply.user.username === currentUser.username ? "disable" : ""
            }">
             <img
              src="./images/icon-minus.svg"
              alt=""
              data-id="${reply.id}"
            />
            </div>
            <p class="comments-list__score-number" data-id="${reply.id}">${
          reply.score
        }</p>
            <div class="comments-list__plus ${
              reply.user.username === currentUser.username ? "disable" : ""
            }">
            <img
              src="./images/icon-plus.svg"
              alt=""
              data-id="${reply.id}"
            />
            </div>
            </div>
          <div class="comments-list__actions">
          ${
            reply.user.username !== currentUser.username
              ? `<div class="reply-button" data-id="${reply.id}">
            <img src="./images/icon-reply.svg" alt="reply icon" data-id="${reply.id}/>
            <span data-id="${reply.id}>Reply</span>
            </div>`
              : `<div class="edit-button" data-id="${reply.id}">
              <img src="./images/icon-edit.svg" alt="edit icon" data-id="${reply.id}/>
              <span data-id="${reply.id}>Edit</span>
              </div>
            <div class="delete-button" data-id="${reply.id}" >
              <img src="./images/icon-delete.svg" alt="delete icon" data-id="${reply.id}/>
              <span data-id="${reply.id}>Delete</span>
            </div>`
          }
          </div>
        </li>`;
      });
    }
  });

  // add listeners to score buttons
  const minusButtons = document.querySelectorAll(".comments-list__minus");
  const scores = document.querySelectorAll(".comments-list__score-number");
  const plusButtons = document.querySelectorAll(".comments-list__plus");
  const replyButtons = document.querySelectorAll(".reply-button");
  const editButtons = document.querySelectorAll(".edit-button");
  const deleteButtons = document.querySelectorAll(".delete-button");

  minusButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      event.preventDefault();
      scores.forEach((score) => {
        if (
          event.target.dataset.id == score.dataset.id &&
          !score.classList.contains("disable")
        ) {
          console.log(!score.classList.contains("disable"));
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
      console.log(event.target.dataset.id);
      scores.forEach((score) => {
        if (
          event.target.dataset.id == score.dataset.id &&
          !score.classList.contains("disable")
        ) {
          score.innerHTML++;
        } else {
          return;
        }
      });
    })
  );

  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      comments.forEach((comment) => {
        if (event.target.dataset.id == comment.id) {
          console.log("xd");
        }
      });
    });
  });

  replyButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      comments.forEach((comment) => {
        if (event.target.dataset.id == comment.id) {
          console.log("xd");
        }
      });
    });
  });

  deleteButtons.forEach((button) => {
    let commentIndex = 0;

    button.addEventListener("click", (event) => {
      //prevent page from refreshing
      event.preventDefault();

      //show overlay and modal
      modal.style = "display:block;";
      overlay.style = "display:block;";
      body.style = "overflow:hidden";

      modalCancel.addEventListener("click", () => {
        //close modal
        modal.style = "display:none;";
        overlay.style = "display:none;";
        body.style = "overflow:default";
      });

      modalDelete.addEventListener("click", () => {
        comments.forEach((comment) => {
          if (event.target.dataset.id == comment.id) {
            commentIndex = comments.indexOf(comment);
            comments.splice(commentIndex, 1);
            displayComments();
          }
          comment.replies.forEach((reply) => {
            if (event.target.dataset.id == reply.id) {
              commentIndex = comment.replies.indexOf(reply);
              comment.replies.splice(commentIndex, 1);
              console.log(comments.replies);
              displayComments();
            }
          });
        });
        //close modal
        modal.style = "display:none;";
        overlay.style = "display:none;";
        body.style = "overflow:default";
      });
    });
  });

  // set current user avatar on add-comment section
  addCommentAvatar.innerHTML = `<img
              src="${currentUser.image.png}"
              alt=""
            />`;

  //clear error message when typing
  addCommentText.addEventListener("keyup", () => {
    invalidInput.innerText = "";
  });

  // adding comment logic
  addCommentButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (addCommentText.value === "") {
      //show error when input is empty
      invalidInput.innerText = "You can't post empty comment!";
    } else {
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
      addCommentText.value = "";
      comments.push(newComment);
      displayComments();
    }
  });
};
displayComments();
