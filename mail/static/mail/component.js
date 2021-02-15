const headerElement = (mailbox) => {
  const element = document.createElement("h3");
  element.innerHTML = `${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}`;

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

export { headerElement, noEmailElement, emailDetailElement };
