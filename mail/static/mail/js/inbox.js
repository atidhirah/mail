import "./components/emailSummary.js";
import "./components/emailDetail.js";
import * as component from "./component.js";
import Data from "./data.js";

let lastActiveMenu = "";

document.addEventListener("DOMContentLoaded", () => {
  // *Use buttons to toggle between views
  document.querySelectorAll(".inbox-menu button").forEach((btn) => {
    btn.onclick = () => {
      btn.id === "compose" ? composeEmail() : loadMailbox(btn.id);
    };
  });

  // *Send email button event listener
  document.getElementById("compose-send").onclick = (e) => {
    sendEmail();
    e.preventDefault();
  };

  // *By default, load the inbox
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
  let message = document.getElementById("compose-body").value;
  message = message.replace(/\n\r?/g, "<br />");

  // Send the email, go to 'sent' section and close compose view
  Data.sendEmail(email, title, message)
    .then((response) => {
      console.log(response);
      loadMailbox("sent");
      composeView.classList.toggle("show-compose");
    })
    .catch((error) => {
      console.log(error);
    });
};

const loadMailbox = (mailbox) => {
  const emailsView = document.getElementById("emails-view");
  const detailView = document.getElementById("detail-view");

  const emailsHeader = document.getElementById("emails-header");
  const emailsContainer = document.getElementById("emails-container");

  // *Disable the button
  disableMenuBtn(mailbox);

  // *Show mailbox view and hide email detail view
  emailsView.style.display = "block";
  detailView.style.display = "none";

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
        element.emailType = mailbox;
        element.emailData = email;
        element.onclick = (e) => detailEmail(email.id);
        // *Button to save email into 'Archived'
        if (mailbox !== "sent") {
          element.querySelector("button").onclick = (e) => {
            e.stopPropagation();
            archiveEmail(email.id, email.archived);
          };
        }

        emailsContainer.append(element);
      });
    }
  });
};

const archiveEmail = (id, status) => {
  // *Archive or unarchive email depend on status
  Data.archiveEmail(id, !status).then(() => loadMailbox("inbox"));
};

const detailEmail = (id) => {
  const emailsView = document.getElementById("emails-view");
  const detailView = document.getElementById("detail-view");

  // *Remove last email data
  detailView.innerHTML = "";

  Data.getEmail(id).then((email) => {
    if (email.read === false) {
      Data.updateRead(email.id);
    }

    // *Append custom element on detail view
    const emailDetail = document.createElement("email-detail");
    emailDetail.emailType = lastActiveMenu;
    emailDetail.emailData = email;

    document.getElementById("detail-view").append(emailDetail);

    // *Detail view buttons listener
    document.getElementById("detail-back").onclick = () =>
      loadMailbox(lastActiveMenu);
    document.getElementById("detail-archive").onclick = () =>
      archiveEmail(email.id, email.archived);

    // *Show mailbox view and hide email detail view
    emailsView.style.display = "none";
    detailView.style.display = "block";

    // *Activate all menu button
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
  lastActiveMenu = btnId;
};

const enableAllMenuBtn = () => {
  document.querySelectorAll(".inbox-menu button").forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("active-inbox-button");
  });
};
