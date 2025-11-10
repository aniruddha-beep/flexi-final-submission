const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

async function handleResponse(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch (e) {
    return text;
  }
}

export async function fetchItems() {
  const res = await fetch(`${API_BASE}/api/items`);
  if (!res.ok) throw new Error('Failed to fetch items');
  return handleResponse(res);
}

export async function createItem(payload) {
  const res = await fetch(`${API_BASE}/api/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to create item');
  return handleResponse(res);
}

export async function deleteItem(id) {
  const res = await fetch(`${API_BASE}/api/items/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete item');
  return handleResponse(res);
}

export async function updateItem(id, payload) {
  const res = await fetch(`${API_BASE}/api/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update item');
  return handleResponse(res);
}
