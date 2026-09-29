// pages/api/ws.js
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.headers.get('upgrade') !== 'websocket') {
    return new Response('Not a WebSocket', { status: 400 });
  }

  const { 0: client, 1: server } = new WebSocketPair();
  server.accept();

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
