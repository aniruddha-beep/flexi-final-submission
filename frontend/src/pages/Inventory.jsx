import { useState, useEffect } from 'react';
import { fetchItems, createItem, updateItem, deleteItem as apiDeleteItem } from '../api';

const REORDER_THRESHOLD = 3;

function Inventory() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState({ text: '', color: 'green' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkLowStockAlert();
    const interval = setInterval(checkLowStockAlert, 10000);
    return () => clearInterval(interval);
  }, [items]);

  async function loadItems() {
    try {
      setLoading(true);
      const data = await fetchItems();
      // backend returns items with _id; normalize to id
      setItems(data.map(i => ({ id: i._id, name: i.name, qty: i.quantity, price: i.price || 0 })));
    } catch (e) {
      console.error('Failed to load items', e);
    } finally {
      setLoading(false);
    }
  }

  const checkLowStockAlert = () => {
    const lowStockItems = items.filter(it => it.qty <= REORDER_THRESHOLD);
    
    if (lowStockItems.length > 0) {
      const itemNames = lowStockItems.map(it => it.name).join(', ');
      setAlertMsg({
        text: `⚠️ LOW STOCK ALERT! Please re-order: ${itemNames}.`,
        color: '#c53030'
      });
    } else {
      setAlertMsg({
        text: 'Inventory stock levels are healthy.',
        color: 'green'
      });
    }
  };

  const validateName = () => name.trim().length >= 2;
  const validateQty = () => Number(qty) > 0;
  const validatePrice = () => Number(price) >= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateName()) {
      setFormMsg('Name required');
      return;
    }
    if (!validateQty()) {
      setFormMsg('Qty > 0');
      return;
    }
    if (!validatePrice()) {
      setFormMsg('Price >= 0');
      return;
    }

    try {
      const payload = { name: name.trim(), quantity: Number(qty), price: Number(price) };
      const created = await createItem(payload);
      // append created item (normalize id)
      setItems(prev => [{ id: created._id, name: created.name, qty: created.quantity, price: created.price || 0 }, ...prev]);
      setName('');
      setQty('');
      setPrice('');
      setFormMsg('Added');
      setTimeout(() => setFormMsg(''), 1000);
    } catch (e) {
      console.error('Create failed', e);
      setFormMsg('Failed to add');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiDeleteItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (e) {
      console.error('Delete failed', e);
      setFormMsg('Delete failed');
      setTimeout(() => setFormMsg(''), 1500);
    }
  };

  const handlePriceChange = async (id, newPrice) => {
    try {
      const item = items.find(i => i.id === id);
      if (!item) return;
      
      const price = Number(newPrice);
      if (price < 0) return;

      // Update UI immediately for responsiveness
      setItems(prev => prev.map(i => 
        i.id === id ? { ...i, price } : i
      ));

      // Then update backend
      await updateItem(id, { price });
    } catch (e) {
      console.error('Price update failed', e);
      setFormMsg('Price update failed');
      setTimeout(() => setFormMsg(''), 1500);
      // Reload items to reset UI on error
      loadItems();
    }
  };

  const totalValue = items.reduce((sum, item) => sum + (item.qty * item.price), 0);

  const isLowStock = (itemQty) => itemQty <= REORDER_THRESHOLD;

  return (
    <main className="container">
      <section className="form-area">
        <h2>Add Item</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name<br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateName}
              required
            />
          </label>
          <label>
            Quantity<br />
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              min="1"
              required
            />
          </label>
          <label>
            Price (₹)<br />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </label>
          <div className="form-actions">
            <button type="submit">Add</button>
            <button type="button" onClick={() => { setName(''); setQty(''); setPrice(''); }}>
              Clear
            </button>
          </div>
          {formMsg && <div className="form-msg">{formMsg}</div>}
        </form>
      </section>

      <section className="list-area">
        {loading ? (
          <div>Loading items...</div>
        ) : (
          <>
            {alertMsg.text && (
              <div className="form-msg" style={{ color: alertMsg.color, marginBottom: '12px' }}>
                {alertMsg.text}
              </div>
            )}

            <table id="inventory">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr
                    key={item.id}
                    className="inventory-row"
                    style={isLowStock(item.qty) ? { backgroundColor: 'rgba(197, 48, 48, 0.1)' } : {}}
                  >
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>
                      ₹<input
                        type="number"
                        value={item.price}
                        onChange={(e) => handlePriceChange(item.id, e.target.value)}
                        min="0"
                        step="0.01"
                        style={{ width: '80px', padding: '4px' }}
                      />
                    </td>
                    <td>₹{(item.qty * item.price).toFixed(2)}</td>
                    <td className="actions">
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="summary">Total value: ₹{totalValue.toFixed(2)}</div>
          </>
        )}
      </section>
    </main>
  );
}

export default Inventory;
