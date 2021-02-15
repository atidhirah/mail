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

export { headerElement, noEmailElement };
