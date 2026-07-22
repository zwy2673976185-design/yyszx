// api/verify.js
const express = require('express');
const app = express();
// 解析前端传过来的 JSON 数据
app.use(express.json());

// 简单的模拟数据库（一机一码逻辑）
// 实际生产环境请使用专业的数据库如 MongoDB 或 Redis
const validCards = {
    "ABCDEF1234567890": { deviceId: "DEV_TEST00000001", expires: "2099-12-31" },
    // 你可以在这里添加更多测试卡密
};

// 卡密验证接口
app.post('/verify', (req, res) => {
    try {
        const { card, deviceId } = req.body;

        // 1. 基础校验
        if (!card || !deviceId) {
            return res.status(400).json({ success: false, message: '参数缺失' });
        }

        // 2. 卡密是否存在
        if (!validCards[card]) {
            return res.status(200).json({ success: false, message: '卡密不存在或已失效' });
        }

        // 3. 一机一码校验
        if (validCards[card].deviceId !== "DEV_TEST00000001" && validCards[card].deviceId !== deviceId) {
            return res.status(200).json({ success: false, message: '卡密已被其他设备绑定' });
        }

        // 4. 验证成功
        console.log(`验证成功 - 设备: ${deviceId}, 卡密: ${card}`);
        return res.status(200).json({ success: true, message: '验证成功' });

    } catch (error) {
        console.error("服务器内部错误:", error);
        return res.status(500).json({ success: false, message: '服务器内部错误' });
    }
});

// Vercel Serverless Function 的默认导出
module.exports = app;
