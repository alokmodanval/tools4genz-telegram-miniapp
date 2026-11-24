// Cloudflare Pages Function: /api/order
// Handles automated order delivery directly to Telegram Admin

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const data = await context.request.json();
    const env = context.env || {};

    const botToken = env.TELEGRAM_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'CONFIG_MISSING',
          message: 'Telegram Bot Token ya Admin Chat ID configure nahi hai.',
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const {
      orderType = 'Instant Portfolio (₹19 Flash Deal)',
      amount = '₹19',
      name = 'Anonymous',
      phone = 'N/A',
      instagram = 'N/A',
      telegram = 'N/A',
      role = '',
      websiteType = '',
      domain = '',
      skills = '',
      bio = '',
      description = '',
      github = '',
      referenceUrl = '',
      screenshot = null,
      telegramUser = null,
    } = data;

    // Current Indian Standard Time (IST)
    const now = new Date();
    const istTime = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
    }).format(now);

    // Escape HTML for Telegram HTML mode
    const escapeHtml = (str) =>
      String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const clientTgInfo = telegramUser
      ? `👤 <b>Telegram Account:</b> ${escapeHtml(telegramUser.first_name || '')} ${escapeHtml(telegramUser.last_name || '')} (@${escapeHtml(telegramUser.username || 'no_username')}) [ID: <code>${telegramUser.id}</code>]\n`
      : '';

    const captionSummary = `🚨 <b>NEW ORDER RECEIVED!</b> 🚨
━━━━━━━━━━━━━━━━━━━━
📦 <b>Package:</b> ${escapeHtml(orderType)}
💰 <b>Amount:</b> ${escapeHtml(amount)} (UPI: 9016138307@ptyes)

👤 <b>Client Name:</b> ${escapeHtml(name)}
📞 <b>WhatsApp / Phone:</b> <code>${escapeHtml(phone)}</code>
📸 <b>Instagram:</b> ${escapeHtml(instagram || 'N/A')}
📱 <b>Telegram Input:</b> ${escapeHtml(telegram || 'N/A')}
${clientTgInfo}
🌐 <b>Domain / Subdomain:</b> <code>${escapeHtml(domain || 'None')}</code>
🎯 <b>Category / Role:</b> ${escapeHtml(role || websiteType || 'General')}
🛠 <b>Skills:</b> ${escapeHtml(skills || 'N/A')}
📝 <b>Details / Requirements:</b>
${escapeHtml(bio || description || 'N/A')}
🔗 <b>Ref / GitHub:</b> ${escapeHtml(github || referenceUrl || 'N/A')}

⏰ <b>Order Time:</b> ${istTime} (IST)
━━━━━━━━━━━━━━━━━━━━
⚡️ <i>Tools4Genz Telegram Mini App</i>`;

    // If a screenshot was uploaded as base64 data URL
    let photoSent = false;
    if (screenshot && typeof screenshot === 'string' && screenshot.startsWith('data:image/')) {
      try {
        const matches = screenshot.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
        if (matches) {
          const mimeType = matches[1];
          const base64Data = matches[2];
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: mimeType });

          const formData = new FormData();
          formData.append('chat_id', chatId);
          formData.append('photo', blob, 'receipt.jpg');
          // Telegram caption limit is 1024 chars
          const shortCaption = captionSummary.length <= 1000 
            ? captionSummary 
            : `🚨 <b>NEW ORDER: ${escapeHtml(orderType)}</b>\n👤 <b>Name:</b> ${escapeHtml(name)}\n📞 <b>Phone:</b> ${escapeHtml(phone)}\n💰 <b>Amount:</b> ${escapeHtml(amount)}\n⏰ <b>Time:</b> ${istTime}`;
          formData.append('caption', shortCaption);
          formData.append('parse_mode', 'HTML');

          const photoRes = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
            method: 'POST',
            body: formData,
          });

          const photoData = await photoRes.json();
          if (photoData.ok) {
            photoSent = true;
            // If caption was truncated, send the full text as follow-up message
            if (captionSummary.length > 1000) {
              await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: captionSummary,
                  parse_mode: 'HTML',
                }),
              });
            }
          } else {
            console.warn('sendPhoto failed, falling back to sendMessage:', photoData);
          }
        }
      } catch (err) {
        console.warn('Screenshot processing error:', err);
      }
    }

    // If photo was not sent, send text message
    if (!photoSent) {
      const msgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: captionSummary,
          parse_mode: 'HTML',
        }),
      });

      const msgData = await msgRes.json();
      if (!msgData.ok) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'TELEGRAM_API_ERROR',
            details: msgData.description,
          }),
          { status: 502, headers: corsHeaders }
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Order alert successfully delivered to Telegram!',
        timestamp: istTime,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown server error',
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
