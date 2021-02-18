class EmailDetail extends HTMLElement {
  set emailType(mailbox) {
    this._isSentMail = mailbox === "sent" ? true : false;
  }

  set emailData(data) {
    this._subject = data.subject;
    this._sender = data.sender;
    this._recipients = data.recipients;
    this._body = data.body;
    this._time = data.timestamp;
    this._isArchived = data.archived ? "Unarchive" : "Archive";

    this.render();
  }
  render() {
    this.innerHTML = `
      <div id="detail-header">
        <div>
          <button id="detail-back">
            <i class='bx bx-arrow-back'></i>
          </button>
          <h4>${this._subject}</h4>
        </div>
        <button id="detail-archive">${this._isArchived}</button>
      </div>
      <div id="detail-body">
        <span>from: ${this._sender}</span>
        <br/>
        <span>to: ${this._recipients}</span>
        <span>${this._time}</span>
        <p>${this._body}</p>
      </div>
    `;

    if (this._isSentMail) {
      this.querySelector("#detail-archive").style.display = "none";
    }
  }
}

customElements.define("email-detail", EmailDetail);
