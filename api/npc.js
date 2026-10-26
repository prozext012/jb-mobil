// Vercel Serverless Function: /api/npc
// All SynoxCloud requests run on the server, not directly from browser code.
const BASE = 'https://api.synoxcloud.xyz';
const PROVIDERS = ['unlimited-ai', 'gemma-ai', 'asynt-ai', 'algolia'];
function extractText(data) {
  if (typeof data === 'string') return data;
  if (!data || typeof data !== 'object') return '';
  const direct = data.reply || data.text || data.response || data.message || data.answer || data.content || data.result;
  if (typeof direct === 'string') return direct;
  if (data.choices?.[0]?.message?.content) return data.choices[0].message.content;
  if (data.data) return extractText(data.data);
  return '';
}
function makePrompt(body) {
  const { message = '', context = {}, history = [] } = body;
  const role = context.role === 'seller' ? 'penjual mobil bekas' : 'pembeli mobil bekas';
  const c = context.car || {};
  const transcript = history.slice(-8).map(m => `${m.role === 'assistant' ? 'NPC' : 'Pemain'}: ${String(m.content || '').slice(0, 700)}`).join('\n');
  return `Kamu NPC ${role} dalam game tycoon dealer mobil bernama Auto Lot. Berbahasa Indonesia santai, natural, singkat (maksimal 3 kalimat), dan konsisten sebagai karakter. Negosiasikan dengan wajar, jangan mengklaim transaksi sudah terjadi. Jangan mengubah saldo, stok, atau status game.\nKONTEKS GAME: ${JSON.stringify({role:context.role,car:c,cash:context.cash,reputation:context.reputation,day:context.day})}\nRIWAYAT:\n${transcript}\nPESAN PEMAIN: ${String(message).slice(0,1000)}\nBalas hanya dialog NPC. Jika pembeli, tawar di bawah harga pasang secara masuk akal. Jika penjual, coba tawarkan sedikit di atas nilai wajar dan siap negosiasi.`;
}
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Gunakan POST.' });
  try {
    const body = req.body || {};
    if (!body.message || typeof body.message !== 'string') return res.status(400).json({ error: 'Pesan wajib diisi.' });
    const prompt = makePrompt(body);
    const session = String(body.session || 'autolot-' + (body.context?.role || 'npc')).replace(/[^\w-]/g, '').slice(0, 80);
    const errors = [];
    for (const provider of PROVIDERS) {
      try {
        let response;
        if (provider === 'gemma-ai') {
          response = await fetch(`${BASE}/ai-chat/gemma-ai`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({message:prompt,sessionId:session,deepSearch:false,apikey:process.env.SYNOXCLOUD_API_KEY || 'FREE'}) });
        } else {
          const param = provider === 'algolia' ? 'text' : provider === 'asynt-ai' ? 'text' : 'prompt';
          const url = new URL(`${BASE}/ai-chat/${provider}`);
          url.searchParams.set(param, provider === 'algolia' ? prompt.slice(0,1000) : prompt);
          if (provider === 'unlimited-ai') url.searchParams.set('session', session);
          if (provider === 'asynt-ai') url.searchParams.set('session', session);
          if (provider === 'algolia') url.searchParams.set('system', 'Kamu NPC negosiasi mobil bekas di game Auto Lot. Jawab singkat dalam Bahasa Indonesia.');
          url.searchParams.set('apikey', process.env.SYNOXCLOUD_API_KEY || 'FREE');
          response = await fetch(url, { method:'GET', headers:{'Accept':'application/json,text/plain'} });
        }
        const raw = await response.text();
        let data; try { data = JSON.parse(raw); } catch { data = raw; }
        if (!response.ok) { errors.push(`${provider}: HTTP ${response.status}`); continue; }
        const reply = extractText(data);
        if (!reply) { errors.push(`${provider}: format respons belum dikenali`); continue; }
        return res.status(200).json({ reply, provider });
      } catch (e) { errors.push(`${provider}: ${String(e.message || e).slice(0,120)}`); }
    }
    return res.status(502).json({ error: 'Semua endpoint AI gagal atau format respons tidak dikenali.', details: errors });
  } catch (e) { return res.status(500).json({ error: 'Kesalahan server.', details: String(e.message || e) }); }
};
