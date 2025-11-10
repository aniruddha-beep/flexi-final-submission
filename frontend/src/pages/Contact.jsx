import { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const validate = () => {
    return name.trim().length >= 2 && email.includes('@');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      setStatusMsg('Please fill valid name and email');
      return;
    }

    setStatusMsg('Message sent (demo)');
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setStatusMsg(''), 1500);
  };

  return (
    <main className="container">
      <section className="form-area">
        <h2>Contact</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name<br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={validate}
              required
            />
          </label>
          <label>
            Email<br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validate}
              required
            />
          </label>
          <label>
            Message<br />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              required
            />
          </label>
          <div className="form-actions">
            <button type="submit">Send</button>
          </div>
          {statusMsg && <div className="form-msg">{statusMsg}</div>}
        </form>
      </section>
    </main>
  );
}

export default Contact;
