const admin = require('firebase-admin');

// 避免重复初始化
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Vercel 环境变量里换行可能被转义，需要还原
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const db = admin.database();

module.exports = async (req, res) => {
  // CORS 头，允许跨域调用
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '卡密不存在或已失效' });
  }

  const { card, deviceId } = req.body || {};
  const cardUpper = (card || '').trim().toUpperCase();

  // 统一错误处理：任何异常都返回相同提示
  const fail = () => res.status(200).json({ success: false, message: '卡密不存在或已失效' });

  if (!cardUpper || cardUpper.length !== 16 || !deviceId) {
    return fail();
  }

  try {
    const snapshot = await db.ref('authCodes/' + cardUpper).once('value');
    const data = snapshot.val();

    if (!data) return fail();
    if (data.status === '已解绑') return fail();
    if (data.status === '已使用' && data.deviceId && data.deviceId !== deviceId) return fail();
    if (data.type !== 'permanent' && data.expireTime && data.expireTime > 0 && data.expireTime < Date.now()) return fail();

    // 绑定或放行
    if (data.status === '未使用' || data.status === '已解绑') {
      await db.ref('authCodes/' + cardUpper).update({
        status: '已使用',
        deviceId: deviceId,
        activateTime: new Date().toLocaleString('zh-CN'),
      });
    } else if (data.status === '已使用' && data.deviceId === deviceId) {
      // 同设备复用，直接通过
    } else {
      return fail();
    }

    return res.status(200).json({ success: true, message: '验证成功' });
  } catch (e) {
    console.error('verify error:', e);
    return fail();
  }
window.initMainUI = function() {
    const mainUI = document.getElementById('mainUI');
    if (!mainUI) return;
    mainUI.innerHTML = '<div class="window-header">yyszx</div><div class="main-body"><div class="sidebar">...</div><div class="content-area">...</div></div>';
    // 绑定事件等...
};
