const btnInboxMenu = document.querySelectorAll(".inbox-menu button");
const emailsView = document.getElementById("emails-view");
const composeView = document.getElementById("compose-view");

document.addEventListener("DOMContentLoaded", function () {
  // Use buttons to toggle between views
  btnInboxMenu.forEach((btn) => {
    btn.onclick = () => {
      if (btn.id === "compose") {
        compose_email();
      } else {
        load_mailbox(btn.id);
      }
    };
  });

  // Send email button
  document.getElementById("compose-form").onsubmit = () => send_email();

  // By default, load the inbox
  load_mailbox("inbox");
});

function compose_email() {
  // Show compose view
  composeView.classList.toggle("show-compose");

  // Clear out composition fields
  document.getElementById("compose-recipients").value = "";
  document.getElementById("compose-subject").value = "";
  document.getElementById("compose-body").value = "";
}

function send_email() {
  const email = document.getElementById("compose-recipients").value;
  const title = document.getElementById("compose-subject").value;
  const message = document.getElementById("compose-body").value;

  fetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      recipients: email,
      subject: title,
      body: message,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    });
}

function load_mailbox(mailbox) {
  disableMenuBtn(mailbox);

  // Show the mailbox name
  emailsHeader = document.getElementById("emails-header");
  emailsHeader.innerHTML = `<h3>${
    mailbox.charAt(0).toUpperCase() + mailbox.slice(1)
  }</h3>`;

  // Remove email data and fetch new data
  emailsContainer = document.getElementById("emails-container");
  emailsContainer.innerHTML = "";

  fetch(`/emails/${mailbox}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((email) => {
        emailDiv = document.createElement("div");
        emailDiv.innerHTML = `<p>${email.subject}</p>`;

        emailsContainer.append(emailDiv);
      });
    });
}

function disableMenuBtn(btnId) {
  btnInboxMenu.forEach((btn) => {
    if (btn.id === btnId) {
      btn.disabled = true;
      btn.classList.add("active-inbox-button");
    } else {
      btn.disabled = false;
      btn.classList.remove("active-inbox-button");
    }
  });
}
