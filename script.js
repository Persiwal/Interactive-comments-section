import data from "./data.json" assert { type: "json" };

const commentsList = document.querySelector(".comments-list");
const addCommentAvatar = document.querySelector(".add-comment__avatar");
const addCommentText = document.querySelector(".add-comment__text");
const addCommentButton = document.querySelector(".add-comment__cta");
const invalidInput = document.querySelector(".add-comment__invalid-input");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalCancel = document.querySelector(".modal__cancel");
const modalDelete = document.querySelector(".modal__delete");

let comments = [...data.comments];
let currentUser = { ...data.currentUser };

const displayComments = () => {
  commentsList.innerHTML = "";

  comments.map((comment) => {
    commentsList.innerHTML += `<li class="comments-list__comment" data-id="${
      comment.id
    }">
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
          <div class="comments-list__content" data-id="${comment.id}">
            ${comment.content}
          </div>
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
            <span data-id="${comment.id}" data-id="${comment.id}">Delete</span></div>`
          }
          </div>
          <button class='update-button' data-id="${comment.id}">UPDATE</button>
        </li>`;

    //add replies
    if (comment.replies.length > 0) {
      comment.replies.map((reply) => {
        commentsList.innerHTML += `
        <li class="comments-list__comment replying"  data-id="${reply.id}">
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
            <div class="comments-list__user-label">you</div>`
                : ""
            }</div>
          <span class="comments-list__createdAt">${reply.createdAt}</span>
          <div class="comments-list__content" data-id="${reply.id}">
            <span class="comments-list__replyingTo">@${
              reply.replyingTo
            }</span> ${reply.content}
          </div>
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
              ? ""
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
          <button class='update-button' data-id="${reply.id}">UPDATE</button>
        </li>`;
      });
    }
  });

  // add listeners to buttons
  const minusButtons = document.querySelectorAll(".comments-list__minus");
  const scores = document.querySelectorAll(".comments-list__score-number");
  const plusButtons = document.querySelectorAll(".comments-list__plus");
  const replyButtons = document.querySelectorAll(".reply-button");
  const editButtons = document.querySelectorAll(".edit-button");
  const deleteButtons = document.querySelectorAll(".delete-button");
  const updateButtons = document.querySelectorAll(".update-button");

  //minus button logic
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

  //plus button logic
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

  //edit button logic
  editButtons.forEach((button) => {
    let editing = false;
    let replying = false;
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const commentContent = document.querySelector(
        `.comments-list__content[data-id="${event.target.dataset.id}"]`
      );
      console.log("before update" + commentContent.innerHTML);

      comments.forEach((comment) => {
        if (event.target.dataset.id == comment.id && editing === false) {
          editing = true; // prevent from spamming edit button
          event.target.classList.add("active");

          commentContent.innerHTML = `
          <textarea 
          style='width: 100%;
          min-height: 95px;' 
          class="comments-list__edit-textarea" >${commentContent.innerText}</textarea>`;
        }

        comment.replies.forEach((reply) => {
          if (event.target.dataset.id == reply.id && editing === false) {
            editing = true; // prevent from spamming edit button
            replying = true; // set replying to true which will be used in updated content

            commentContent.innerHTML = `
          <textarea 
          style='width: 100%;
          min-height: 95px;' 
          class="comments-list__edit-textarea" >${commentContent.innerText}</textarea>`;
          }
        });
      });

      updateButtons.forEach((button) => {
        if (event.target.dataset.id === button.dataset.id) {
          button.style.display = "block";

          button.addEventListener("click", () => {
            console.log(commentContent);
            const editedContent = commentContent.children[0].value;

            commentContent.innerHTML = replying
              ? `<span class="comments-list__replyingTo">${editedContent.substring(
                  0,
                  editedContent.indexOf(" ")
                )}</span> ${editedContent.substring(
                  editedContent.indexOf(" "),
                  editedContent.length
                )}`
              : editedContent;
            button.style.display = "none";
            editing = false;
            event.target.classList.remove("active");
          });
        }
      });
    });
  });

  //reply button logic
  replyButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const commentItem = document.querySelector(
        `.comments-list__comment[data-id='${event.target.dataset.id}']`
      );

      const replyingSection = document.createElement("div");
      replyingSection.classList.add("add-reply");
      replyingSection.innerHTML = `
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Add a reply..."
          class="add-reply__text"
        ></textarea>
        <div class="add-reply__avatar">
          <img src="${currentUser.image.png}" alt="" />
        </div>
        <button class="add-reply__cta">REPLY</button>
        <span class="add-reply__invalid-input"></span>`;

      commentItem.after(replyingSection);
      const addReplyButton = document.querySelector(".add-reply__cta");

      comments.forEach((comment) => {
        if (event.target.dataset.id == comment.id) {
          addReplyButton.addEventListener("click", () => {
            const replyContent = replyingSection.children[0].value;
            console.log(replyContent);
            if (replyContent === "") {
              //show error when input is empty
              invalidInput.innerText = "You can't post empty comment!";
            } else {
              const newReply = {
                id: Math.random(),
                content: replyContent,
                createdAt: "5 months ago",
                replyingTo: comment.user.username,
                score: 0,
                user: {
                  image: { png: currentUser.image.png },
                  username: currentUser.username,
                },
              };
              addCommentText.value = "";
              comment.replies.push(newReply);
              displayComments();
            }
          });
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

//display comments on page load
displayComments();
