class Data {
  static getEmails(mailbox) {
    return fetch(`/emails/${mailbox}`)
      .then((response) => response.json())
      .then((emails) => {
        return Promise.resolve(emails);
      });
  }

  static getEmail(id) {
    return fetch(`/emails/${id}`)
      .then((response) => response.json())
      .then((email) => {
        return Promise.resolve(email);
      });
  }

  static sendEmail(email, title, message) {
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
  }
}

export default Data;
