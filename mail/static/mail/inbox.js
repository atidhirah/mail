const btnInboxMenu = document.querySelectorAll(".inbox-menu button");
const emailsView = document.getElementById("emails-view");
const composeView = document.getElementById("compose-view");
const emailView = document.getElementById("email-view");

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
  document.getElementById("compose-send").onclick = (event) => {
    send_email();
    event.preventDefault();
  };

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

  // Send the email, go to 'sent' section and close compose view
  sendEmailData(email, title, message).then(() => {
    load_mailbox("sent");
    composeView.classList.toggle("show-compose");
  });
}

function load_mailbox(mailbox) {
  const mailHeader = document.getElementById("emails-header");
  const mailContainer = document.getElementById("emails-container");

  // Disable the button
  disableMenuBtn(mailbox);

  // Show the mailbox name
  mailHeader.innerHTML = "";
  mailHeader.append(emailsHeader(mailbox));

  // Remove previous data and fetch new data
  mailContainer.innerHTML = "";
  getEmailsData(mailbox).then((emails) => {
    if (emails.length === 0) {
      mailContainer.append(noEmailElement(mailbox));
    } else {
      emails.forEach((email) => {
        const element = emailElement(email);
        element.onclick = () => email_detail(email.id);
        mailContainer.append(element);
      });
    }
  });
}

function email_detail(id) {
  getEmailData(id).then((email) => {
    console.log(email);
  });
}

const disableMenuBtn = (btnId) => {
  btnInboxMenu.forEach((btn) => {
    if (btn.id === btnId) {
      btn.disabled = true;
      btn.classList.add("active-inbox-button");
    } else {
      btn.disabled = false;
      btn.classList.remove("active-inbox-button");
    }
  });
};

const enableAllMenuBtn = () => {
  btnInboxMenu.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("active-inbox-button");
  });
};
