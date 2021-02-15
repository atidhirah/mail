import "./components/emailSummary.js";
import * as component from "./component.js";
import Data from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  // Use buttons to toggle between views
  document.querySelectorAll(".inbox-menu button").forEach((btn) => {
    btn.onclick = () => {
      btn.id === "compose" ? composeEmail() : loadMailbox(btn.id);
    };
  });

  // Send email button event listener
  document.getElementById("compose-send").onclick = (e) => {
    sendEmail();
    e.preventDefault();
  };

  // By default, load the inbox
  loadMailbox("inbox");
});

const composeEmail = () => {
  // Show compose view
  document.getElementById("compose-view").classList.toggle("show-compose");

  // Clear out composition fields
  document.getElementById("compose-recipients").value = "";
  document.getElementById("compose-subject").value = "";
  document.getElementById("compose-body").value = "";
};

const sendEmail = () => {
  const composeView = document.getElementById("compose-view");
  const email = document.getElementById("compose-recipients").value;
  const title = document.getElementById("compose-subject").value;
  const message = document.getElementById("compose-body").value;

  // Send the email, go to 'sent' section and close compose view
  Data.sendEmail(email, title, message).then((response) => {
    console.log(response);
    loadMailbox("sent");
    composeView.classList.toggle("show-compose");
  });
};

const loadMailbox = (mailbox) => {
  const emailsView = document.getElementById("emails-view");
  const detailView = document.getElementById("detail-view");

  const emailsHeader = document.getElementById("emails-header");
  const emailsContainer = document.getElementById("emails-container");

  // *Show mailbox view and hide email detail view
  emailsView.style.display = "block";
  detailView.style.display = "none";

  // *Disable the button
  disableMenuBtn(mailbox);

  // *Show the mailbox name
  emailsHeader.innerHTML = "";
  emailsHeader.append(component.headerElement(mailbox));

  // *Remove previous data and fetch new data
  emailsContainer.innerHTML = "";
  Data.getEmails(mailbox).then((emails) => {
    if (emails.length === 0) {
      emailsContainer.append(component.noEmailElement(mailbox));
    } else {
      emails.forEach((email) => {
        const element = document.createElement("email-summary");
        element.emailData = email;
        element.onclick = () => detailEmail(email.id);
        emailsContainer.append(element);
      });
    }
  });
};

const detailEmail = (id) => {
  const emailsView = document.getElementById("emails-view");
  const detailView = document.getElementById("detail-view");

  Data.getEmail(id).then((email) => {
    if (email.read === false) {
      Data.updateRead(email.id);
    }

    console.log(email);
    // Show mailbox view and hide email detail view
    emailsView.style.display = "none";
    detailView.style.display = "block";

    // Clear old child element and append a new one
    detailView.innerHTML = "";
    detailView.append(component.emailDetailElement(email));

    // Activate all menu button
    enableAllMenuBtn();
  });
};

const disableMenuBtn = (btnId) => {
  document.querySelectorAll(".inbox-menu button").forEach((btn) => {
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
  document.querySelectorAll(".inbox-menu button").forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("active-inbox-button");
  });
};
