const headerElement = (mailbox) => {
  const element = document.createElement("h3");
  element.innerHTML = `${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}`;

  return element;
};

const emailElement = (email) => {
  const element = document.createElement("div");
  element.innerHTML = `
      <div class="emails-sender">
        <p>${email.sender}</p>
      </div>
      <div class="emails-data">
        <p><span>${email.subject}</span> - ${email.body}</p>
      </div>
      <div class="emails-time">
        <p>${email.timestamp}</p>
      </div>
      `;
  element.classList.add("pl-4");

  return element;
};

const noEmailElement = (mailbox) => {
  const element = document.createElement("p");
  element.classList.add("emails-noemail");
  element.innerHTML = `No ${mailbox} email!`;

  return element;
};

const emailDetailElement = (email) => {
  const element = document.createElement("div");
  element.innerHTML = `
  <div class="detail-header">
    <h4>${email.subject}</h4>
    <span>from: ${email.sender}</span>
    <span>${email.timestamp}</span>
  </div>
  `;

  return element;
};

export { headerElement, emailElement, noEmailElement, emailDetailElement };
