// const BASE_URL = 'http://localhost:5000/api';

// export async function apiRequest(path, method = 'GET', body, token) {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(token && { Authorization: `Bearer ${token}` })
//     },
//     body: body ? JSON.stringify(body) : null
//   });

//   return res.json();
// }
const BASE_URL = "http://localhost:5000/api";

export async function apiRequest(path, method = 'GET', body, token) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: body ? JSON.stringify(body) : undefined
  });

  return res.json();
}
