class EmailSummary extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  set emailData(data) {
    this._id = data.id;
    this._sender = data.sender;
    this._subject = data.subject;
    this._body = data.body;
    this._time = data.timestamp;

    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        .wrapper {
          height: 3rem;
          display: grid;
          grid-template-columns: 4fr 7fr 1fr;
          align-items: center;
          border-bottom: 1px solid rgba(128, 128, 128, 0.2);
        }

        .wrapper:hover {
          cursor: pointer;
          background-color: rgba(128, 128, 128, 0.2);
        }

        .sender {
          padding-left: 1rem;
        }

        .data {
          color: grey;
          width: 100%;
          overflow: hidden;
        }
        
        .data p {
          width: calc(100%);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .data span {
          color: black;
          font-weight: bold;
        }
        
        .time {
          text-align: end;
          padding-right: 0.5rem;
        }

      </style>
      <div class="wrapper">
        <div class="sender">
          <p>${this._sender}</p>
        </div>
        <div class="data">
          <p><span>${this._subject}</span> - ${this._body}</p>
        </div>
        <div class="time">
          <p>${this._time}</p>
        </div>
      </div>
      `;
  }
}

customElements.define("email-summary", EmailSummary);
