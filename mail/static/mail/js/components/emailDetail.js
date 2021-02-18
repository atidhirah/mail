class EmailDetail extends HTMLElement {
  set emailType(mailbox) {
    this._isSentMail = mailbox === "sent" ? true : false;
  }

  set emailData(data) {
    this._isArchived = data.archived ? "Unarchive" : "Archive";
    this._subject = data.subject;
    this._sender = data.sender;
    this._recipients = data.recipients;
    this._body = data.body;

    const date = data.timestamp.split(" ");
    let time = date[date.length - 1].split(":");
    let hour = parseInt(time[0]);

    // *Change time based on user timezones
    const offset = new Date().getTimezoneOffset() / 60;
    offset <= 0 ? (hour -= offset) : (hour = Math.abs(hour + offset));
    if (hour >= 24) hour -= 24;
    if (hour < 10) hour = `0${hour}`;
    time = `${hour}:${time[1]}`;

    this._time = `${date[0]} ${date[1]} ${date[2]}, ${time}`;

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
      <div id="detail-data">
        <div id="detail-title">
          <div id="detail-users">
            <span>from: ${this._sender}</span>
            <br/>
            <span>to: ${this._recipients}</span>  
          </div>
          <span>${this._time}</span>
        </div>
        <div id="detail-body">
          <p>${this._body}</p>
        </div>
        <button id="detail-reply" class="btn btn-primary">Reply</button>
      </div>
    `;

    if (this._isSentMail) {
      this.querySelector("#detail-archive").style.display = "none";
      this.querySelector("#detail-reply").style.display = "none";
    }
  }
}

customElements.define("email-detail", EmailDetail);
