// api/notify.js — Vercel Serverless Function
// ส่งข้อความไปยัง Line OA ผ่าน Messaging API

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { message } = req.body
  if (!message) return res.status(400).json({ error: 'message is required' })

  const TOKEN = process.env.VITE_LINE_CHANNEL_ACCESS_TOKEN
  if (!TOKEN) return res.status(500).json({ error: 'LINE token not configured' })

  try {
    // ดึง User ID ของ Admin จาก Line OA
    // ต้องใช้ userId ของคนที่ follow OA ไว้
    const userId = process.env.LINE_ADMIN_USER_ID

    if (!userId) {
      // ถ้ายังไม่มี userId ให้ broadcast ไปหาทุกคนที่ follow OA แทน
      const broadcastRes = await fetch('https://api.line.me/v2/bot/message/broadcast', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{
            type: 'text',
            text: message,
          }]
        }),
      })

      if (!broadcastRes.ok) {
        const err = await broadcastRes.text()
        return res.status(500).json({ error: err })
      }

      return res.status(200).json({ ok: true, method: 'broadcast' })
    }

    // ส่งหาคนเดียว (Admin)
    const pushRes = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: userId,
        messages: [{
          type: 'text',
          text: message,
        }]
      }),
    })

    if (!pushRes.ok) {
      const err = await pushRes.text()
      return res.status(500).json({ error: err })
    }

    return res.status(200).json({ ok: true, method: 'push' })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}