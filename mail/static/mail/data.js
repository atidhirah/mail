const getEmailsData = (mailbox) => {
  return fetch(`/emails/${mailbox}`)
    .then((response) => response.json())
    .then((emails) => {
      console.log(emails);
      return emails;
    });
};

const getEmailData = (id) => {
  return fetch(`/emails/${id}`)
    .then((response) => response.json())
    .then((email) => {
      return email;
    });
};

const sendEmailData = (email, title, message) => {
  return fetch(`/emails`, {
    method: "POST",
    body: JSON.stringify({
      recipients: email,
      subject: title,
      body: message,
    }),
  })
    .then((response) => response.json)
    .then((result) => {
      return result;
    });
};

export { getEmailsData, getEmailData, sendEmailData };
