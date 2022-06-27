import data from "./data.json" assert { type: "json" };
import { TransformDate, CalculateTimeAgo } from "./Date.js";

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

const createComment = (comment, isReply) => {
  //create comment list item
  const commentElement = document.createElement("li");
  commentElement.classList.add("comments-list__comment");
  if (isReply) {
    commentElement.classList.add("replying");
  }
  commentElement.dataset.id = comment.id;

  //create user avatar
  const userImg = document.createElement("img");
  userImg.classList.add("comments-list__avatar");
  userImg.src = comment.user.image.png;
  userImg.alt = "";

  //create username element
  const username = document.createElement("div");
  username.classList.add("comments-list__username");

  //create username
  const usernameSpan = document.createElement("span");
  usernameSpan.innerText = comment.user.username;

  //create "YOU" element when user comment is written by current user
  const isThatYou = document.createElement("span");
  isThatYou.innerText =
    comment.user.username === currentUser.username ? "YOU" : "";

  //append username element childs
  username.appendChild(usernameSpan);
  username.appendChild(isThatYou);

  //create add date element
  const createdAt = document.createElement("span");
  createdAt.classList.add("comments-list__createdAt");
  createdAt.innerText = CalculateTimeAgo(comment.createdAt);

  //create content element
  const content = document.createElement("div");
  content.classList.add("comments-list__content");
  content.dataset.id = comment.id;
  content.innerText = !isReply
    ? comment.content
    : "@" + comment.replyingTo + " " + comment.content;

  //create score element
  const score = document.createElement("div");
  score.classList.add("comments-list__score");
  if (comment.user.username === currentUser.username) {
    score.classList.add("disable");
  }

  //create minus score wrapper element
  const minusScore = document.createElement("div");
  minusScore.classList.add("comments-list__minus");

  //create minus img element
  const minusScoreImg = document.createElement("img");
  minusScoreImg.dataset.id = comment.id;
  minusScoreImg.alt = "";
  minusScoreImg.src = "./images/icon-minus.svg";

  //add minus img to wrapper element
  minusScore.appendChild(minusScoreImg);

  //create plus score wrapper element
  const plusScore = document.createElement("div");
  plusScore.classList.add("comments-list__plus");

  //create plus img element
  const plusScoreImg = document.createElement("img");
  plusScoreImg.dataset.id = comment.id;
  plusScoreImg.alt = "";
  plusScoreImg.src = "./images/icon-plus.svg";

  //add plus img to wrapper element
  plusScore.appendChild(plusScoreImg);

  //create score number element
  const scoreNumber = document.createElement("p");
  scoreNumber.classList.add("comments-list__score-number");
  scoreNumber.dataset.id = comment.id;
  scoreNumber.innerText = comment.score;

  //apend childs to score box
  score.appendChild(minusScore);
  score.appendChild(scoreNumber);
  score.appendChild(plusScore);

  //create actions element (reply, edit, delete)
  const actions = document.createElement("div");
  actions.classList.add("comments-list__actions");

  //create reply button
  const replyButton = document.createElement("div");
  replyButton.classList.add("reply-button");
  replyButton.dataset.id = comment.id;

  //create reply img
  const replyImg = document.createElement("img");
  replyImg.src = "./images/icon-reply.svg";
  replyImg.alt = "reply icon";
  replyImg.dataset.id = comment.id;

  const replySpan = document.createElement("span");
  replySpan.dataset.id = comment.id;
  replySpan.innerText = "Reply";

  replyButton.appendChild(replyImg);
  replyButton.appendChild(replySpan);

  //create edit button
  const editButton = document.createElement("div");
  editButton.classList.add("edit-button");
  editButton.dataset.id = comment.id;

  //create edit img
  const editImg = document.createElement("img");
  editImg.src = "/images/icon-edit.svg";
  editImg.alt = "edit icon";
  editImg.dataset.id = comment.id;

  const editSpan = document.createElement("span");
  editSpan.dataset.id = comment.id;
  editSpan.innerText = "Edit";

  editButton.appendChild(editImg);
  editButton.appendChild(editSpan);

  //create delete button
  const deleteButton = document.createElement("div");
  deleteButton.classList.add("delete-button");
  deleteButton.dataset.id = comment.id;

  //create delete img
  const deleteImg = document.createElement("img");
  deleteImg.src = "./images/icon-delete.svg";
  deleteImg.alt = "delete icon";
  deleteImg.dataset.id = comment.id;

  const deleteSpan = document.createElement("span");
  deleteSpan.dataset.id = comment.id;
  deleteSpan.innerText = "Delete";

  deleteButton.appendChild(deleteImg);
  deleteButton.appendChild(deleteSpan);

  //check if comment is written by currentUser
  if (comment.user.username === currentUser.username) {
    //append edit and delete buttons for current user
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
  } else {
    if (!isReply) actions.appendChild(replyButton);
  }
  const updateButton = document.createElement("button");
  updateButton.classList.add("update-button");
  updateButton.dataset.id = comment.id;
  updateButton.innerText = "UPDATE";

  //append elements to comment
  commentElement.appendChild(userImg);
  commentElement.appendChild(username);
  commentElement.appendChild(createdAt);
  commentElement.appendChild(content);
  commentElement.appendChild(score);
  commentElement.appendChild(actions);
  commentElement.appendChild(updateButton);

  //append comment to comments list
  commentsList.appendChild(commentElement);
};

const displayComments = () => {
  commentsList.innerHTML = "";

  comments.map((comment) => {
    createComment(comment, false);

    comment.replies.map((reply) => {
      createComment(reply, true);
    });
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
      const addReplyInvalidInput = document.querySelector(
        ".add-reply__invalid-input"
      );
      console.log(addReplyInvalidInput);

      comments.forEach((comment) => {
        if (event.target.dataset.id == comment.id) {
          addReplyButton.addEventListener("click", () => {
            const replyContent = replyingSection.children[0].value;
            if (replyContent === "") {
              //show error when input is empty
              addReplyInvalidInput.innerText = "You can't post empty comment!";
            } else {
              const newReply = {
                id: Math.random(),
                content: replyContent,
                createdAt: TransformDate(new Date()),
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
        createdAt: TransformDate(new Date()),
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
