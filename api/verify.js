const express = require('express');
const app = express();
app.use(express.json());

// 简单的模拟数据
const validCards = {
    "123456": { success: true, msg: "验证通过" }
};

app.post('/verify', (req, res) => {
    const { card, deviceId } = req.body;
    
    // 模拟校验逻辑
    if (validCards[card]) {
        console.log("验证成功");
        // ✅ 关键点：只发送 JSON，绝不涉及 HTML 页面
        return res.json({ success: true, message: "验证成功" }); 
    } else {
        return res.json({ success: false, message: "卡密错误" });
    }
});

// ✅ 关键点：导出应用
module.exports = app;
