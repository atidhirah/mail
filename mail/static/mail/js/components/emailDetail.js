class EmailDetail extends HTMLElement {
  set emailData(data) {
    this._subject = data.subject;
    this._sender = data.sender;
    this._recipients = data.recipients;
    this._body = data.body;
    this._time = data.timestamp;

    this.render();
  }
  render() {
    this.innerHTML = `
      <div class="detail-header">
        <h4>${this._subject}</h4>
        <span>from: ${this._sender}</span>
        <br/>
        <span>to: ${this._recipients}</span>
        <span>${this._time}</span>
        <br/>
        <p>${this._body}</p>
      </div>
    `;
  }
}

customElements.define("email-detail", EmailDetail);
