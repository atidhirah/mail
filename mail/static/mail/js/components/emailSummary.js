class EmailSummary extends HTMLElement {
  set emailType(mailbox) {
    this._isSentMail = mailbox === "sent" ? true : false;
  }

  set emailData(data) {
    this._bg = data.read ? "grey" : "white";
    this._isArchived = data.archived ? "Unarchive" : "Archive";
    this._sender = data.sender;
    this._subject = data.subject;
    this._body = data.body.replace(/<br\s*\/?>/gi, " ");

    // *Check if date is today, date will show the time if true
    const date = (new Date() + " ").split(" ");
    const today = date.slice(1, 4).toString();
    const dataDate = data.timestamp.split(" ");
    if (dataDate.slice(0, 3).toString() === today) {
      this._time = dataDate[3];
    } else {
      this._time = `${dataDate[0]} ${dataDate[1]}`;
    }

    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="summary ${this._bg}">
        <div class="sender">
          <p>${this._sender}</p>
        </div>
        <div class="data">
          <p><span>${this._subject}</span> - ${this._body}</p>
        </div>
        <div class="time">
          <p>${this._time}</p>
        </div>
        <div class="archive">
          <button>${this._isArchived}</button>
        </div>
      </div>
      `;

    if (this._isSentMail) {
      this.querySelector(".archive").style.display = "none";
    } else {
      const style = document.createElement("style");
      style.innerHTML = `
        .archive {
          display: none;
        }

        .summary:hover .time {
          display: none;
        }
        
        .summary:hover .archive {
          display: block;
        }
      `;
      this.appendChild(style);
    }
  }
}

customElements.define("email-summary", EmailSummary);
