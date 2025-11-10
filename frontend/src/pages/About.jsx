import { useState, useEffect } from 'react';

function About() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCustomerData() {
      try {
        const response = await fetch('/customer.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCustomers(data);
        setLoading(false);
      } catch (err) {
        console.error('Could not load customer data:', err);
        setError('Failed to load customer data. Check console for details.');
        setLoading(false);
      }
    }

    loadCustomerData();
  }, []);

  return (
    <main className="container">
      <section className="list-area">
        <h2>Customer Records</h2>
        <table id="customerTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Last Order</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.totalOrders}</td>
                <td>{customer.lastOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="form-msg" style={{ marginTop: '10px', color: 'var(--primary)' }}>
            Loading data...
          </div>
        )}
        {error && (
          <div className="form-msg" style={{ marginTop: '10px', color: '#c53030' }}>
            {error}
          </div>
        )}
      </section>
    </main>
  );
}

export default About;
