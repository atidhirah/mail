class Data {
  static getEmails(mailbox) {
    return fetch(`/emails/${mailbox}`)
      .then((response) => response.json())
      .then((emails) => {
        if (emails.error) {
          return Promise.reject(emails.error);
        } else {
          return Promise.resolve(emails);
        }
      });
  }

  static getEmail(id) {
    return fetch(`/emails/${id}`)
      .then((response) => response.json())
      .then((email) => {
        if (email.error) {
          return Promise.reject(email.error);
        } else {
          return Promise.resolve(email);
        }
      });
  }

  static updateRead(id) {
    return fetch(`/emails/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        read: true,
      }),
    }).then((result) => {
      return Promise.resolve(result);
    });
  }

  static archiveEmail(id) {
    return fetch(`/emails/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        archived: true,
      }),
    }).then((result) => {
      return Promise.resolve(result);
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
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          return Promise.reject(result.error);
        } else {
          return Promise.resolve(result.message);
        }
      });
  }
}

export default Data;
