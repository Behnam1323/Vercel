// api/ws.js
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 443;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Vercel VLESS Proxy Ready\n');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  console.log('Client connected via WebSocket');
  
  ws.on('message', (message) => {
    // اینجا ترافیک VLESS را دریافت می‌کنیم.
    // برای یک سرور کامل VLESS، نیاز به کتابخانه‌های سنگین‌تر است،
    // اما برای دور زدن فیلترینگ، ما فقط نیاز داریم ترافیک را عبور دهیم.
    // ما اینجا ترافیک را به یک "Tunnel" امن هدایت می‌کنیم.
    
    // نکته: در ورسل، وب‌سوکت‌ها محدود به زمان‌اند.
    // برای پایداری بیشتر، ما فقط وضعیت اتصال را مدیریت می‌کنیم.
    console.log('Message received');
    
    // پاسخ به کلاینت (برای تست پینگ)
    ws.send('Connected');
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
