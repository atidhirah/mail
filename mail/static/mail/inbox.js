const btnInboxMenu = document.querySelectorAll(".inbox-menu button");
const emailsView = document.getElementById("emails-view");
const composeView = document.getElementById("compose-view");
const detailView = document.getElementById("detail-view");

document.addEventListener("DOMContentLoaded", () => {
  // Use buttons to toggle between views
  btnInboxMenu.forEach((btn) => {
    btn.onclick = () => {
      if (btn.id === "compose") {
        composeEmail();
      } else {
        loadMailbox(btn.id);
      }
    };
  });

  // Send email button event listener
  document.getElementById("compose-send").onclick = (event) => {
    sendEmail();
    event.preventDefault();
  };

  // By default, load the inbox
  loadMailbox("inbox");
});

const composeEmail = () => {
  // Show compose view
  composeView.classList.toggle("show-compose");

  // Clear out composition fields
  document.getElementById("compose-recipients").value = "";
  document.getElementById("compose-subject").value = "";
  document.getElementById("compose-body").value = "";
};

const sendEmail = () => {
  const email = document.getElementById("compose-recipients").value;
  const title = document.getElementById("compose-subject").value;
  const message = document.getElementById("compose-body").value;

  // Send the email, go to 'sent' section and close compose view
  sendEmailData(email, title, message).then(() => {
    loadMailbox("sent");
    composeView.classList.toggle("show-compose");
  });
};

const loadMailbox = (mailbox) => {
  const emailsHeader = document.getElementById("emails-header");
  const emailsContainer = document.getElementById("emails-container");

  // Show mailbox view and hide email detail view
  emailsView.style.display = "block";
  detailView.style.display = "none";

  // Disable the button
  disableMenuBtn(mailbox);

  // Show the mailbox name
  emailsHeader.innerHTML = "";
  emailsHeader.append(headerElement(mailbox));

  // Remove previous data and fetch new data
  emailsContainer.innerHTML = "";
  getEmailsData(mailbox).then((emails) => {
    if (emails.length === 0) {
      emailsContainer.append(noEmailElement(mailbox));
    } else {
      emails.forEach((email) => {
        const element = emailElement(email);
        element.onclick = () => emailDetail(email.id);
        emailsContainer.append(element);
      });
    }
  });
};

const emailDetail = (id) => {
  getEmailData(id).then((email) => {
    // Show mailbox view and hide email detail view
    emailsView.style.display = "none";
    detailView.style.display = "block";

    // Clear old child element and append a new one
    detailView.innerHTML = "";
    detailView.append(emailDetailElement(email));

    // Activate all menu button
    enableAllMenuBtn();
  });
};

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
