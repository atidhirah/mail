class EmailSummary extends HTMLElement {
  set emailData(data) {
    this._sender = data.sender;
    this._subject = data.subject;
    this._body = data.body.replace(/<br\s*\/?>/gi, " ");
    this._time = data.timestamp;
    this._bg = data.read ? "grey" : "white";

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
        <button>Archive</button>
      </div>
    </div>
    `;
  }
}

customElements.define("email-summary", EmailSummary);
