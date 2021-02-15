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

  static updateRead(id) {
    return fetch(`/emails/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        read: true,
      }),
    }).then((result) => {
      return result;
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
    }).then((response) => {
      if (response.status !== 201) {
        // TODO
      }
      return response.json();
    });
  }
}

export default Data;
