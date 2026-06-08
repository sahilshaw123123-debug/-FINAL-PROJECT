const jwt = require('jsonwebtoken');
const axios = require('axios');
async function run() {
  try {
    const token = jwt.sign(
      { id: '60c72b2f9b1d8b001c8e4a9b', role: 'admin' },
      'FDGTDFHFHFDHF',
      { expiresIn: '1d' }
    );
    const res = await axios.post(
      'http://localhost:5500/api/liveclasses',
      {
        title: 'Test Class',
        subject: 'Math',
        instructorName: 'Sahil',
        date: '2026-06-06',
        time: '10:00'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res.data);
  } catch(err) {
    console.error(err.response ? err.response.data : err.message);
  }
}
run();
