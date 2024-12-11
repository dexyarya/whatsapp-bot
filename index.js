const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inisialisasi klien WhatsApp
const client = new Client({
    authStrategy: new LocalAuth()
});

// Generate QR code untuk autentikasi
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('QR code telah dihasilkan, pindai dengan aplikasi WhatsApp Anda.');
});

// Ketika klien siap digunakan
client.on('ready', () => {
    console.log('Klien siap digunakan!');
    sendMessages();
});

// Fungsi untuk mengirim pesan sebanyak 10 kali
const sendMessages = () => {
    const number = 'Nomor tujuan@c.us';
    const message = 'Aku Sayang Kamu Tapi Kamu Sayang Dia';
    for (let i = 1; i <= 200; i++) {
        client.sendMessage(number, message).then(response => {
            console.log(`Pesan ${i} berhasil dikirim:`, response);
        }).catch(err => {
            console.error(`Gagal mengirim pesan ${i}:`, err);
        });
    }
};

// Inisialisasi klien
client.initialize();
