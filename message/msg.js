/*

• Base : Ainul 
• Bot By : Ainul 
• Kalau Mau Recode Minimal Kasih Thanks To Goblok Jangan Asal Comot Gw Kasih Babi Lu

*/

"use strict";
const {
	downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('../lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("../lib/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('../lib/respon-list');
const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('../lib/setproses');
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('../lib/setdone');
const { addAfkUser, checkAfkUser, getAfkReason, getAfkTime, getAfkId, getAfkPosition } = require('../lib/afk');
const { addRespons, checkRespons, deleteRespons } = require('../lib/respon');
const { webp2mp4File } = require("../lib/convert")
const msgFilter = require("../lib/antispam");

const fs = require ("fs");
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const imgbb = require("imgbb-uploader");
const xfar = require('xfarr-api');
const axios = require("axios");
const hxz = require("hxz-api");
const ra = require("ra-api");
const kotz = require("kotz-api");
const yts = require("yt-search");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");

// Exif
const Exif = require("../lib/exif")
const exif = new Exif()

const { uploadFileUgu, AnonFiles, TelegraPh } = require('../lib/uploader.js') 
// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./message/response.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'));
let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'));
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'));
let responDB = JSON.parse(fs.readFileSync('./database/respon.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(conn, msg, m, setting, store, welcome, _afk) => {
	try {
		let { ownerNumber, ownerName, botName, footer } = setting
		let { allmenu } = require('./help')
		const { type, quotedMsg, mentioned, now, fromMe } = msg
		if (msg.isBaileys) return
        let d = new Date
        let locale = 'id'
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		const tanggal = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		var fildt = dt == 'Selamat Pagi Kak' ? dt + '🌝' : dt == 'Selamat Siang Kak' ? dt + '🌞' : dt == 'Selamat Sore Kak' ? dt + '🌝' : dt + '🌚'
        const ucapanWaktu = fildt.charAt(0).toUpperCase() + fildt.slice(1)
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const footernya = setting.footer
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
                const toJSON = j => JSON.stringify(j, null,'\t')
		if (conn.multi) {
			var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
		} else {
			if (conn.nopref) {
				prefix = ''
			} else {
				prefix = conn.prefa
			}
		}
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
		const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber.includes(sender)
		const pushname = msg.pushName
		const isNan = args[1]
		const q = chats.slice(command.length + 1, chats.length)
		const body = chats.startsWith(prefix) ? chats : ''
		const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender)
		const isUser = pendaftar.includes(sender)
		const isAntiLink = isGroup ? antilink.includes(from) : false
		const isAntiWaMe = isGroup ? antiwame.includes(from) : false
        const isWelcome = isGroup ? welcome.includes(from) ? true : false : false
        const isAfkOn = checkAfkUser(sender, _afk)
		const pp_bot = fs.readFileSync(setting.pathimg)

        const fimage = {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },message: { "imageMessage": { "title":`${ownerName}`, "h": `Hmm`,'seconds': '359996400', 'caption': `*_✘ BALASAN MENFESS ✘_*`, 'jpegThumbnail': pp_bot}}}
        const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `𝐂𝐫𝐞𝐚𝐭𝐞𝐝 𝐁𝐲 𝐀𝐢𝐧𝐮𝐥`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': pp_bot, thumbnail: pp_bot,sendEphemeral: true}}}
		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
		async function downloadAndSaveMediaMessage (type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			}
		}
		const sendFileFromUrl = async (from, url, caption, options = {}) => {
		    let mime = '';
		    let res = await axios.head(url)
		    mime = res.headerd["content-type"]
		    let type = mime.split("/")[0]+"Message"
		    if (mime.split("/")[0] === "image") {
		       var img = await getBuffer(url)
		       return conn.sendMessage(from, { image: img, caption: caption }, options)
		    } else if (mime.split("/")[0] === "video") {
		       var vid = await getBuffer(url)
		       return conn.sendMessage(from, { video: vid, caption: caption }, options)
		    } else if (mime.split("/")[0] === "audio") {
		       var aud = await getBuffer(url)
		       return conn.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
		    } else {
		       var doc = await getBuffer(url)
		       return conn.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
		    }
		}
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}
		function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
		function monospace(string) {
            return '```' + string + '```'
        }
		function randomNomor(min, max = null) {
		  if (max !== null) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  } else {
			return Math.floor(Math.random() * min) + 1
		  }
		}
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = conn.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
		      return res
 		    }
		}
		const reply = (teks) => {
			conn.sendMessage(from, { text: teks }, { quoted: msg })
		}
		const textImg = (teks) => {
			return conn.sendMessage(from, { text: teks, jpegThumbnail: pp_bot }, { quoted: msg })
		}
		const sendMess = (hehe, teks) => {
			conn.sendMessage(hehe, { text, teks })
		}
		const buttonWithText = (from, text, footer, buttons) => {
			return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
		}
		
		const buttonsDefault = [
		    { urlButton: { displayText: `My Web`, url : `${setting.link}` } },
		]
        
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

		// Auto Read & Presence Online
		conn.readMessages([msg.key])
		conn.sendPresenceUpdate('available', from)
		
		// Auto Registrasi
		if (isCmd && !isUser) {
		  pendaftar.push(sender)
		  fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
		}
		
		// Store
        if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
            var get_data_respon = getDataResponList(from, chats, db_respon_list)
            if (get_data_respon.isImage === false) {
                conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
                    quoted: msg
                })
            } else {
                conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
                    quoted: msg
                })
            }
        }
		
		// Antispam
        msgFilter.ResetSpam(conn.spam)

		const spampm = () => {
            console.log(color('[ SPAM ]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))
            msgFilter.addSpam(sender, conn.spam)
            reply(`Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik`)
        }
        const spamgr = () => {
            console.log(color('[ SPAM ]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
            msgFilter.addSpam(sender, conn.spam)
            reply(`Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik`)
        }
        
        if (isCmd && msgFilter.isFiltered(sender) && !isGroup) return spampm()
        if (isCmd && msgFilter.isFiltered(sender) && isGroup) return spamgr()
        if (isCmd && args[0].length > 1 && !isOwner) msgFilter.addFilter(sender)
        
        //Resize
         const reSize = async(buffer, ukur1, ukur2) => {
             return new Promise(async(resolve, reject) => {
             let jimp = require('jimp')
             var baper = await jimp.read(buffer);
             var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
             resolve(ab)
             })
             }
             
             // Anti link
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (chats.includes(`https://chat.whatsapp.com`)) {
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                await conn.sendMessage(from, { delete: msg.key })
                let number = sender
      conn.groupParticipantsUpdate(from, [number], "remove")
            }
        }
        
        if (isGroup && isAntiWaMe && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (chats.includes(`https://wa.me/`)) {
                reply(`*「 WAME DETECTOR 」*\n\nSepertinya kamu mengirimkan link WaMe, maaf kamu akan di kick`)
                await conn.sendMessage(from, { delete: msg.key })
                let number = sender
      conn.groupParticipantsUpdate(from, [number], "remove")
            }
        }                    
                        
  //TIME
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')  
 if(time2 < "23:59:00"){
var ucapanWaktu2 = 'Selamat Malam 🌌'
 }
 if(time2 < "19:00:00"){
var ucapanWaktu2 = 'Selamat Sore 🌃'
 }
 if(time2 < "18:00:00"){
var ucapanWaktu2 = 'Selamat Sore 🌅'
 }
 if(time2 < "15:00:00"){
var ucapanWaktu2 = 'Selamat Siang 🌞'
 }
 if(time2 < "11:00:00"){
var ucapanWaktu2 = 'Selamat Pagi 🌄'
 }
 if(time2 < "05:00:00"){
var ucapanWaktu2 = 'Selamat Pagi 🌄'
 } 
 
		if (chats.startsWith("> ") && isOwner) {
		console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
		  const ev = (sul) => {
            var sat = JSON.stringify(sul, null, 2)
            var bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return textImg(bang)
          }
          try {
           textImg(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
          } catch (e) {
           textImg(util.format(e))
          }
		} else if (chats.startsWith("$ ") && isOwner) {
        console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
          exec(chats.slice(2), (err, stdout) => {
		    if (err) return reply(`${err}`)
		    if (stdout) reply(`${stdout}`)
		  })
        } else if (chats.startsWith("x ") && isOwner) {
	    console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
		 try {
	       let evaled = await eval(chats.slice(2))
		   if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
			reply(`${evaled}`)
		 } catch (err) {
		   reply(`${err}`)
		 }
		}
		
		// Logs;
		if (!isGroup && isCmd && !fromMe) {
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}
		
		function triggerSticker() {
            try {
                for (let x = 0; x < responDB.length; x++) {
                    if (msg.message.stickerMessage.fileSha256.toString('hex') == responDB[x].hex) {
                        return responDB[x].balasan;
                    }
                }
            } catch {
                return false;
            }
        }
        switch (command || triggerSticker()) {
			// Main Menu
			case prefix+'helpmenu':
case prefix+'help':
case prefix+'menu':
const imagemenu = await getBuffer(`https://telegra.ph/file/6800a03d9e0a8119090eb.jpg`) 
const textmenu = `${ucapanWaktu2} @${sender.split("@")[0]} , Click Button Di Bawah Untuk Melihat List Menu Bot\n\n*INFO BOT*\n*Liblary :* Baileys-MD\n*Name Bot :* ${setting.botName}\n*Owner Name :* ${setting.ownerName}\n\n*INFO USER*\n*Name :* ${pushname}\n*Tag :* @${sender.split("@")[0]}\n\n*DATE INFO*\n*Tanggal :* ${tanggal}\n*Waktu :* ${jam}`
var butt = [{buttonId: `${prefix}listmenu`, buttonText: { displayText: `List Menu` }, type: 1 }]
conn.sendMessage(from, { caption: textmenu, buttons: butt, image: imagemenu, footer: footer, mentions: [sender] }, { quoted: fkontak })
break
case prefix+'listmenu':
const imagelistm = await getBuffer(`https://telegra.ph/file/6800a03d9e0a8119090eb.jpg`) 
const textlist = `*[ MAIN MENU ]*
*[ X ]* ${prefix}owner
*[ X ]* ${prefix}ping
*[ X ]* ${prefix}runtime
*[ X ]* ${prefix}script
*[ X ]* ${prefix}donasi
*[ X ]* ${prefix}rules
*[ X ]* ${prefix}gcbot
*[ X ]* ${prefix}tqto

*[ STORE MENU ]*
*[ X ]* ${prefix}mlp
*[ X ]* ${prefix}ffp
*[ X ]* ${prefix}struktur
*[ X ]* ${prefix}list
*[ X ]* ${prefix}addlist
*[ X ]* ${prefix}dellist
*[ X ]* ${prefix}update
*[ X ]* p
*[ X ]* d

*[ GROUP MENU ]*
*[ X ]* ${prefix}linkgrup
*[ X ]* ${prefix}setppgrup
*[ X ]* ${prefix}setnamegc
*[ X ]* ${prefix}setdesc
*[ X ]* ${prefix}revoke
*[ X ]* ${prefix}hidetag
*[ X ]* ${prefix}add <nomor>
*[ X ]* ${prefix}kick <tag>
*[ X ]* ${prefix}promote <tag>
*[ X ]* ${prefix}demote <tag>
*[ X ]* ${prefix}group open/close
*[ X ]* ${prefix}welcome enable/disable
*[ X ]* ${prefix}afk

*[ DOWNLOADER MENU ]*
*[ X ]* ${prefix}ttnowm <url>
*[ X ]* ${prefix}ttaudio <url>
*[ X ]* ${prefix}ytmp4 <url>
*[ X ]* ${prefix}ytmp3 <url>

*[ CONVERTED MENU ]*
*[ X ]* ${prefix}tourl
*[ X ]* ${prefix}stiker
*[ X ]* ${prefix}smeme
*[ X ]* ${prefix}attp
*[ X ]* ${prefix}ttp
*[ X ]* ${prefix}tts
*[ X ]* ${prefix}nulis

*[ FUN MENU ]*
*[ X ]* ${prefix}truth
*[ X ]* ${prefix}dare
*[ X ]* ${prefix}apakah <pertanyaan>
*[ X ]* ${prefix}bisakah <pertanyaan>
*[ X ]* ${prefix}dimanakah <pertanyaan>
*[ X ]* ${prefix}kapankah <pertanyaan>
*[ X ]* ${prefix}tololcek
*[ X ]* ${prefix}wibucek
*[ X ]* ${prefix}gantengcek
*[ X ]* ${prefix}cantikcek
*[ X ]* ${prefix}ceksifat <nama>

*[ TOOLS MENU ]*
*[ X ]* ${prefix}ai
*[ X ]* ${prefix}menfess nomor|pesan
*[ X ]* ${prefix}miku
*[ X ]* ${prefix}zodiak
*[ X ]* ${prefix}artinama
*[ X ]* ${prefix}translate <Eng To Ind>
*[ X ]* ${prefix}translate <Eng To Ind>
*[ X ]* ${prefix}lirik
*[ X ]* ${prefix}pinterest
*[ X ]* ${prefix}ktpmaker
*[ X ]* ${prefix}hackermaker
*[ X ]* ${prefix}nickff
*[ X ]* ${prefix}nickml
*[ X ]* ${prefix}cekig <usr>
*[ X ]* ${prefix}cektiktok <usr>

*[ MEME MENU ]*
*[ X ]* ${prefix}meme
*[ X ]* ${prefix}darkjoke
*[ X ]* ${prefix}creatmeme
*[ X ]* ${prefix}creatmeme2
*[ X ]* ${prefix}creatmeme3

*[ QUOTED MENU ]*
*[ X ]* ${prefix}katabijak
*[ X ]* ${prefix}puisi
*[ X ]* ${prefix}dilan
*[ X ]* ${prefix}pantun
*[ X ]* ${prefix}gombal
*[ X ]* ${prefix}senja
*[ X ]* ${prefix}faktaunik
*[ X ]* ${prefix}taugasih
*[ X ]* ${prefix}brokenhome
*[ X ]* ${prefix}cuaks

*[ SOUND MENU ]*
*[ X ]* ${prefix}galau
*[ X ]* ${prefix}kane

*[ OWNER MENU ]*
*[ X ]* ${prefix}broadcast <text>
*[ X ]* ${prefix}bc <text>
*[ X ]* ${prefix}sendsession
*[ X ]* ${prefix}exif
*[ X ]* ${prefix}join <url>
*[ X ]* ${prefix}leave
*[ X ]* ${prefix}block <number>
*[ X ]* ${prefix}unblock <number>
*[ X ]* ${prefix}setppbot
*[ X ]* ${prefix}setcmd
*[ X ]* ${prefix}delcmd`
var butt = [{buttonId: `${prefix}owner`, buttonText: { displayText: `OWNER` }, type: 1 }, {buttonId: `${prefix}donasi`, buttonText: { displayText: `DONASI` }, type: 1}, {buttonId: `${prefix}rules`, buttonText: { displayText: `RULES` }, type: 1}]
conn.sendMessage(from, { caption: textlist, image: imagelistm, buttons: butt, footer: footer }, { quoted: fkontak })
break
            case prefix+'runtime':
			case prefix+'rt':
			    reply(runtime(process.uptime()))
			    break
			case prefix+'speed':
			case prefix+'ping':
			    let timestamp = speed();
                            let latensi = speed() - timestamp
                            textImg(`Kecepatan Respon ${latensi.toFixed(4)} Second`)
		            break
			case prefix+'owner':
			    for (let x of ownerNumber) {
			      sendContact(from, x.split('@s.whatsapp.net')[0], `${ownerName}`, msg)
			    }
			    break
	        // Converter & Tools Menu
			case prefix+'sticker': case prefix+'stiker': case prefix+'s':
				if (isImage || isQuotedImage) {
		           var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			       var buffer = Buffer.from([])
			       for await(const chunk of stream) {
			          buffer = Buffer.concat([buffer, chunk])
			       }
			       var rand1 = 'sticker/'+getRandom('.jpg')
			       var rand2 = 'sticker/'+getRandom('.webp')
			       fs.writeFileSync(`./${rand1}`, buffer)
			       ffmpeg(`./${rand1}`)
				.on("error", console.error)
				.on("end", () => {
				  exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				    conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
					fs.unlinkSync(`./${rand1}`)
			            fs.unlinkSync(`./${rand2}`)
			          })
				 })
				.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				.toFormat('webp')
				.save(`${rand2}`)
			    } else if (isVideo || isQuotedVideo) {
				 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				 var buffer = Buffer.from([])
				 for await(const chunk of stream) {
				   buffer = Buffer.concat([buffer, chunk])
				 }
			     var rand1 = 'sticker/'+getRandom('.mp4')
				 var rand2 = 'sticker/'+getRandom('.webp')
			         fs.writeFileSync(`./${rand1}`, buffer)
			         ffmpeg(`./${rand1}`)
				  .on("error", console.error)
				  .on("end", () => {
				    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				      conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
					  fs.unlinkSync(`./${rand1}`)
				      fs.unlinkSync(`./${rand2}`)
				    })
				  })
				 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				 .toFormat('webp')
				 .save(`${rand2}`)
                } else {
			       reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
			    }
                break
			// Owner Menu
			case prefix+'exif':
			    if (!isOwner) return reply(mess.OnlyOwner)
			    var namaPack = q.split('|')[0] ? q.split('|')[0] : q
                var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
                exif.create(namaPack, authorPack)
				reply(`Sukses membuat exif`)
				break
case prefix+'mysesi':
case prefix+'sendsesi':
case prefix+'session':
case prefix+'sendsession':
if (!isOwner) return reply(mess.OnlyOwner)
var setting = JSON.parse(fs.readFileSync('./config.json'));
var anumu = await fs.readFileSync(`./${setting.sessionName}.json`)
conn.sendMessage(from, { document: anumu, mimetype: 'document/application', fileName: 'session.json'}, {quoted: fkontak } )
reply(`*Note :*\n_Session Bot Bersifat Untuk Pribadi Dari Owner Maupun Bot, Tidak Untuk User Bot Ataupun Pengguna Bot._`)
reply(`_Sedang Mengirim Document_\n_Nama Session : ${setting.sessionName}.json_\n_Mohon Tunggu Sebentar..._`)
			break
case prefix+'bc': case prefix+'broadcast':
			    if (!isOwner) return reply(mess.OnlyOwner)
			if (!q && !isImage && !isQuotedImage) return reply(`Kirim Gambar Dengan Caption ${command} text\nExample : ${command} Hallo`)
if ( isImage || isQuotedImage ) {
var media = await downloadAndSaveMediaMessage("image", `brotkes.jpeg`)
var data = await store.chats.all()
for (let i of data) {
conn.sendMessage(i.id, { caption: `「 *${botName.toUpperCase()} BROADCAST* 」\n\nTeks : ${q}`, image: fs.readFileSync(`brotkes.jpeg`), mentions: [sender]})
await sleep(1000)
}
reply(`Sukses mengirim pesan siaran kepada ${data.length} chat`)
} else {
		            if (args.length < 2) return reply(`Kirim Perintah ${command} teks\nContoh : ${command} ${setting.ownerName}`)
                            var data = await store.chats.all()
                            for (let i of data) {
                               conn.sendMessage(i.id, { text: `「 *${botName.toUpperCase()} BROADCAST* 」\n\n${q}`, mentions: [sender]})
                               await sleep(1000)
                                  }
                               reply(`Sukses mengirim pesan siaran kepada ${data.length} chat`)
                                  }
                           break
	case prefix+'join':
			    if (!isOwner) return reply(mess.joinGroup)
				if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
				if (!isUrl(args[1])) return reply(mess.error.Iv)
				var url = args[1]
			    url = url.split('https://chat.whatsapp.com/')[1]
				var data = await conn.groupAcceptInvite(url)
				reply(jsonformat(data))
				break
       case prefix+'block':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah *${command} nomer`)
                const block = args.join(" ")
                await conn.updateBlockStatus(args[1] + '@s.whatsapp.net', "block")
                reply(`Sukses Block Target`)
                break
            case prefix+'unblock':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah *${command} nomer`)
                const unblock = args.join(" ")
                await conn.updateBlockStatus(args[1] + '@s.whatsapp.net', "unblock")
                reply(`Sukses Unblock Target`)
                break
            case prefix+'leave':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (!isGroup) return reply(mess.OnlyGrup)
				conn.groupLeave(from)
			    break
case prefix+'setpp': case prefix+'setppbot':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (isImage || isQuotedImage) {
                addCountCmd('#setppbot', sender, _cmd)
                var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
                if (args[1] == '\'panjang\'') {
                    var { img } = await generateProfilePicture(media)
                    await conn.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type:'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [
                        {
                            tag: 'picture',
                            attrs: { type: 'image' },
                            content: img
                        }
					    ]
                    })
					fs.unlinkSync(media)
					reply(`Sukses`)
				} else {
					var data = await conn.updateProfilePicture(botNumber, { url: media })
			        fs.unlinkSync(media)
				    reply(`Sukses`)
				}
            } else {
                reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
            }
            break
case prefix+'setcmd':
            if (!isOwner && !fromMe) return reply(mess.OnlyPrem)
            if (!isQuotedSticker) return reply('Reply stickernya..')
            if (!q) return reply(`Masukan balasannya...\nContoh: ${prefix}setcmd #menu`)
            if (checkRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), responDB) === true) return reply('Key hex tersebut sudah terdaftar di database!')
            addRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), q, sender, responDB)
            reply(`*Key:* ${msg.quotedMsg.stickerMessage.fileSha256.toString('hex')}\n*Action:* ${q}\n\nBerhasil di set`)
            break
        case prefix+'delcmd':
            if (!isOwner && !fromMe) return reply(mess.OnlyPrem)
            if (!isQuotedSticker) return reply('Reply stickernya..')
            if (!deleteRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), responDB)) return reply('Key hex tersebut tidak ada di database')
            deleteRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), responDB)
            reply(`Berhasil remove key hex ${msg.quotedMsg.stickerMessage.fileSha256.toString('hex')}`)
            break
// Store Menu
case prefix+'list':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
            var arr_rows = [];
            for (let x of db_respon_list) {
                if (x.id === from) {
                    arr_rows.push({
                        title: x.key,
                        rowId: x.key
                    })
                }
            }
            var arr_result = ``;
            for (let x of db_respon_list) {
                if (x.id === from) {
   arr_result += `*➳* ${x.key}\n`
            
                }
            }
            var arr_result2 = `${ucapanWaktu2} ${pushname}\nTanggal : ${tanggal}\nWaktu : ${jam}\n\n*LIST ${groupName}*\n${arr_result}`
             conn.sendMessage(from, { text: arr_result2 })
            break
case prefix+'addlist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]                
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage("image", `${pushname}.jpeg`)
                 var njay = await imgbb(setting.imgbb, media)
                        addResponList(from, args1, args2, true, `${njay.display_url}`, db_respon_list)
                        reply(`Sukses menambahkan list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
            } else {
                addResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses menambahkan list message dengan key : *${args1}*`)
            }
            break
        case prefix+'dellist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
            if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
            delResponList(from, q, db_respon_list)
            reply(`Sukses delete list message dengan key *${q}*`)
            break
        case prefix+'updatelist': case prefix+'update':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage("image", `${pushname}.jpeg`)
                 var njay = await imgbb(setting.imgbb, media)
                        updateResponList(from, args1, args2, true, `${njay.display_url}`, db_respon_list)
                        reply(`Sukses update list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
            } else {
                updateResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses update respon list dengan key *${args1}*`)
            }
            break
case 'P': case 'p':
if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isQuotedMsg) return reply(`Silakan Reply Pesanannya`)
            let proses = `O━• *Transaksi Proses* •━O\n\n*🎉 Status : Proses*\n*📆 ${tanggal}*\n*⏰ ${jam}*\n\n*📝 Pesanan :*\n${quotedMsg.chats}\n\n*📜 Pesanan @${quotedMsg.sender.split("@")[0]} Pending*\n━O━O━••••••••••••━O━O━`
            const getTextP = getTextSetProses(from, set_proses)
            if (getTextP !== undefined) {
                mentions(getTextP.replace('pesan', quotedMsg.chats).replace('nama', quotedMsg.sender.split("@")[0]).replace('jam', jam).replace('tanggal', tanggal), [quotedMsg.sender], true);
            } else {
                mentions(proses, [quotedMsg.sender], true)
            }
break
case 'd': case 'D':
if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(messAdmin)
            if (!isQuotedMsg) return reply(`Silakan Reply Pesanannya`)
            let sukses = `O━• *Transaksi Sukses* •━O\n\n*🎉 Status : Sukses*\n*📆 ${tanggal}*\n*⏰ ${jam}*\n\n*📝 Pesanan :*\n${quotedMsg.chats}\n\n*📜 Pesanan @${quotedMsg.sender.split("@")[0]} Sudah Sukses*\n━O━O━••••••••••••━O━O━`
            const getTextD = getTextSetDone(from, set_done);
            if (getTextD !== undefined) {
                mentions(getTextD.replace('pesan', quotedMsg.chats).replace('nama', quotedMsg.sender.split("@")[0]).replace('jam', jam).replace('tanggal', tanggal), [quotedMsg.sender], true);
            } else {
                mentions(sukses, [quotedMsg.sender], true)
            }
            break
case prefix+'gcbot':
case prefix+'botgc':
conn.sendMessage(from, { text : `*Group Store 🛒 :*\n_https://chat.whatsapp.com/H7FzxBeMU4L7FwuIbyxbtO_\n\n*Group Bot 🤖 :*\n_https://chat.whatsapp.com/DZJmylHJPdYBKGlieXW7v6_`, footer: footer }, { quoted: msg })
break
case prefix+'sewa': case prefix+'sewabot':
const sewa = `_${ucapanWaktu2} ${pushname}_\n\n*Sewa ${setting.botName}*\n\n*• 1 Minggu :* _Rp 10.000_\n*• 1 Bulan :* _Rp 25.000_\n\n*NOTE :* _Bot Akan Di Sewakan Secara Free Kalau Khusus Store , Kalau Untuk Fun Tidak Free_\n\nJika Anda Ingin Menghubungi Owner Silahkan Ketik #owner`
conn.sendMessage(from, { text : sewa }, { quoted: fkontak }) 
break
//proses2
case prefix+'donasi':
case prefix+'donate':
case prefix+'sedekah':
const donasip = await getBuffer(`https://telegra.ph/file/9a573ec6a43e76700096a.jpg`)
const donasit = `┌─「 Donasi • Pulsa 」
│ • *Indosat:* [ ${setting.indosatp} ]
❏────

┌─「 Donasi • E-Wallet 」
│ • *Dana:* [ ${setting.danap} ]
│ • *Gopay:* [ ${setting.gopayp} ]
│ • *Ovo:* [ ${setting.ovop} ]
│ • *Shopee* : [ ${setting.shopeep} ]
│ • *Saweria:* ${setting.saweriap}
❏────`
var butt = [{buttonId: `${prefix}owner`, buttonText: { displayText: `OWNER` }, type: 1}]
conn.sendMessage(from, { caption: donasit, image: donasip, buttons: butt,footer: footer }, { quoted: fkontak })
break
case prefix+'rules':
const rulesnya = `
• *Kebijakan Privasi:*
1. Ainul Bot tidak akan merekam data riwayat chat user.
2. Ainul Bot tidak akan menyebarkan nomor users.
3. Ainul Bot tidak akan menyimpan media yang dikirimkan oleh users.
4. Ainul Bot tidak akan menyalah gunakan data data users.
5. Owner Ainul Bot berhak melihat data riwayat chat users.
6. Owner Ainul Bot berhak melihat status users.
7. Owner Ainul Bot dapat melihat riwayat chat, dan media yang dikirimkan users.

• Jika ada bug/eror di website kami saya mohon untuk Report nya, tanpa biaya dan aman

_Cara penggunaan Ainul Bot Agar terhindar dari Suspand_

• *Peraturan Ainul Bot:*
1. Users dilarang menelpon maupun memvideo call nomor bot.
2. Users dilarang mengirimkan berbagai bug, virtex, dll ke nomor bot.
3. Users diharap tidak melakukan spam dalam penggunaan bot.
4. Users dilarang menambahkan nomor bot secara illegal, untuk menambahkan silahkan hubungi Owner.
5. Users diharap untuk tidak menyalah gunakan fitur fitur bot.

• *Note:*
1. Jika ada yang menjual/beli/sewa bot atas nomor ini, harap segera hubungi owner!
2. Jika ingin donasi bisa langsung aja ya social payment Dana 
3. jika ingin membeli scrip bot Whatsapp bisa langsung Hubungi ke no Whatsapp: wa.me/6285754202785
3. Ketik .sewa Jika Ingin SewaBot 

•Agar terhindar dari Suspand/Ban kalian bisa membaca juga di Peraturan kami.

•Perlu kalian tahu bahwa kami menjaga Privasi dari data-data anda!

• *Syarat Ketentuan Ainul Bot:*

1. Ainul Bot akan keluar dari group jika ada salah satu member melanggar peraturan.
2. Ainul Bot dapat mem-ban users secara sepihak terlepas dari users salah atau tidak.
3. Ainul Bot tidak akan bertanggungjawab atas apapun yang users lakukan terhadap fitur bot.
4. Ainul Bot akan memberlakukan hukuman: block atau ban terhadap users yang melanggar peraturan.
5. Ainul Bot bertanggung jawab atas kesalahan fatal dalam programing maupun owner.
`
var butt = [{buttonId: `${prefix}listmenu`, buttonText: { displayText: `BACK TO MENU` }, type: 1}, {buttonId: `${prefix}owner`, buttonText: { displayText: `OWNER` }, type: 1}]
conn.sendMessage(from, { text: rulesnya, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'script':
case prefix+'scripts':
case prefix+'sc':
const scriptp = await getBuffer(`https://telegra.ph/file/0d15529c9770cecc1787d.jpg`)
const sct = ` 
*———「 SCRIPT 」———*

*Harga :*
*➠ No Enc :* _Rp80.000_
*➠ Enc :* _Rp35.000_

_Jika Anda Berminat Beli Script Ini Hubungi Nomor Di Bawah Ini :_
*https://wa.me/6285754202785*
`
var butt = [{buttonId: `${prefix}listmenu`, buttonText: { displayText: `BACK TO MENU` }, type: 1 }]
conn.sendMessage(from, { caption: sct, image: scriptp, buttons: butt, footer: footer }, { quoted: fkontak })
break
//proses3
case prefix+'mlp':
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q.includes(".")) return reply(`Penggunaan ${command} ID|SERVER|PRODUK\n\nContoh : ${command} 12345678|1234|86`)
var ml = await fetchJson(`https://api.lolhuman.xyz/api/mobilelegend/${q.split(".")[0]}/${q.split(".")[1]}?apikey=${setting.lolhuman}`)
reply(`*[ Transaksi Proses ]*\n\n*» ID :* ${q.split(".")[0]} (${q.split(".")[1]})\n*» Nick :* ${ml.result}\n*» Produk :* ${q.split(".")[2]}💎\n*» Status :* Pending\n*» Order Date :* ${tanggal} - ${jam}\n\nPesanan Sedang di proses, Mohon untuk ditunggu ya!`)
setTimeout(() => {
reply(`*[ Transaksi Sukses ]*\n\n*» ID :* ${q.split(".")[0]} (${q.split(".")[1]})\n*» Nick :* ${ml.result}\n*» Produk :* ${q.split(".")[2]}💎\n*» Status :* Sukses\n*» Order Date :* ${tanggal} - ${jam}\n\nPesanan Anda Berhasil`)
}, 30000)
break
case prefix+'ffp':
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q.includes(".")) return reply(`Penggunaan ${command} ID.PRODUK\n\nContoh : ${command} 12345678.140`)
var ff = await fetchJson(`https://api.lolhuman.xyz/api/freefire/${q.split(".")[0]}?apikey=${setting.lolhuman}`)
reply(`*[ Transaksi Proses ]*\n\n*» ID :* ${q.split(".")[0]}\n*» Nick :* ${ff.result}\n*» Produk :* ${q.split(".")[1]}💎\n*» Status :* Pending\n*» Order Date :* ${tanggal} - ${jam}\n\nPesanan Sedang di proses, Mohon untuk ditunggu ya!`)
setTimeout(() => {
reply(`*[ Transaksi Sukses ]*\n\n*» ID :* ${q.split(".")[0]}\n*» Nick :* ${ff.result}\n*» Produk :* ${q.split(".")[1]}💎\n*» Status :* Sukses\n*» Order Date :* ${tanggal} - ${jam}\n\nPesanan Anda Berhasil`)
}, 30000)
break
//fun
case prefix+'katabijak':
var bijakkey = await fetchJson(`https://api.lolhuman.xyz/api/random/katabijak?apikey=SGWN`)
var butt = [{buttonId: `${prefix}katabijak`, buttonText: { displayText: `NEXT` }, type: 1}]
conn.sendMessage(from, { text: `*_${bijakkey.result}_*`, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'puisi':
var puisikey = await fetchJson(`https://api.lolhuman.xyz/api/random/puisi?apikey=SGWN`)
var butt = [{buttonId: `${prefix}puisi`, buttonText: { displayText: `NEXT` }, type: 1}]
conn.sendMessage(from, { text: `\`\`\`${puisikey.result}\`\`\``, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'dilan':
var dilankey = await fetchJson(`https://api.lolhuman.xyz/api/quotes/dilan?apikey=SGWN`)
var butt = [{buttonId: `${prefix}dilan`, buttonText: { displayText: `NEXT` }, type: 1}]
conn.sendMessage(from, { text: `\`\`\`${dilankey.result}\`\`\``, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'sad':
const sad = ['"Hujan tak pernah tahu untuk apa ia jatuh. Tapi air mata selalu tau untuk siapa ia jatuh."','"Seribu kata maaf yang kau keluarkan dari mulutmu, tak akan mampu untuk mengobati setitik luka dalam hatiku."','"Keluarga bahagia itu pilihan."',' "Kebahagiaan keluarga bukan terletak pada apa yang dicapai tetapi sikap hati terhadap apa yang dicapai."','"Beberapa orang yang susah dijauhi adalah anggota keluarga. Tapi sering kali justru mereka yang paling ingin kita jauhi."','"Pengkhianatan dari keluarga itu adalah luka yang paling dalam."','"Jika menyakitiku bisa membuatmu bahagia, maka lakukanlah sesuka hatimu."','"Seseorang terkadang berpura-pura bahagia agar orang yang dia sayang tahu bahwa dia baik-baik saja."','"Seharusnya, keluarga adalah tempat perlindungan kita. Seringnya justru keluarga menjadi tempat kita menemukan rasa sakit hati terdalam."','"Andai suatu saat nanti, sudah bukan aku lagi yang kau genggam. Ku harap dia menjadi yang terbaik untukmu di masa depan."','"Aku ini sabar. Tapi lebih baik kau jangan menguji kesabaranku."','"Jauh lebih gampang memaafkan seorang musuh daripada memaafkan keluarga."','"Hal terpenting di dunia ini adalah sebuah keluarga dan cinta kasih."','"Aku pernah kecewa dan aku pernah terluka. Tapi di balik semua, aku yakin dan percaya iu adalah cara Tuhan untuk membuatku dewasa."','"Jangan berubah karena seseorang, kamu akan sakit hati dan kecewa. Berubah karena Allah, kamu akan bahagia."','"Ketika kamu merasa lelah dan kecewa, maka saat itu kamu sedang belajar tentang kasih sayang."','"Penderitaan adalah berkah. Terdapat makna tersembunyi di dalamnya."','"Sesunguhnya di balik kesusahan ada kemudahan, di balik kesedihan ada kebahagiaan."','"Seperti mati terbunuh namun tetap hidup dalam sebuah penyesalan."','"Kesabaran itu adalah sesuatu yang terpuji kecuali, termasuk kepada anggota keluarga."','"Percaya pada diri sendiri, meski mungkin saat ini aku sedang bersedih. Karena penyemangat terbesar dalam hidupku adalah diriku sendiri."','"Aku berusaha tegar di depanmu, berusaha tersenyum dan tertawa untukmu, agar kamu selalu tahu, bahwa hati ini tidak sakit."','"Orang bilang darah itu lebih kental dari air. Tapi sering kali hanya air yang ada ketika kita butuh. Sementara darah entah ada di mana."','"Jika kesabaran tak cukup menyadarkan, mungkin kehilangan akan menyadarkan."','"Kadang aku ingin menyapamu, tapi aku terlalu takut untuk sakit hati dan kecewa atas pengabaianmu."','"Bila ingin dicintai, cobalah untuk mencintai terlebih dahulu."','"Kalau saya memperlakukanmu menyerupai caramu memperlakukanku. Kamu akan membenciku."']
var butt = [{buttonId: `${prefix}sad`, buttonText: { displayText: `NEXT` }, type: 1 }]
conn.sendMessage(from, { text : `${pickRandom(sad)}`, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'brokenhome':
const broken = ['kamu adalah anak yang kuat dan kamu seseorang yang sudah di pilih untuk menjalani kehidupan ini,semangat terus kamu orang yang kuat untuk menjalaninya','bukannya kurang bersyukur,tapi terkadang lelah dengan keadaan rumah:)','aku akan menunggu sampai dimana titik untuk kembali, jika kembali hanya sebuah mimpi maka biarkan lah aku bermimpi untuk selamanya','Mereka semua hanya ingin dimengerti tapi tidak bisa mengerti kita sebagai anaknya','ku kira rumah tempatuntuk pulang,tapi aku salah\nrumah bagiku adalah tempat dimana mental ku di hajar habis habisan','Kenapa aku tidak seperti anak yg lain nya? , bahagia mendapatkan kasih sayang dari kedua orangtua yang adil , aku juga ingin seperti mereka.','walaupun nenek ku tidak bekerja tapi mereka bisa mengasih uang ke cucu nya','saya bangga dengan diri saya sendiri, karena bisa memalsukan diri agar tetap terlihat tegar meskipun hati berantakan;)','Aku punya keluarga, tapi aku tidak punya yg namanya harmonis dalam keluarga','setiap anak ingin keluarga yang sempurna dan harmonis,namun tidak semua anak memilikinya','ada anak yang setiap harinya mencoba untuk kuat,tapi pada hari itu dia juga akhirnya merenung di malam hari,karena menahan semua yang terjadi terhadap dirinya','andai orang tua ku mengerti perasaan diri ku','kata nya orang tua adalah support terbaik di saat lemah, tapi nyatanya orang tua adalah penghancur mental yang sangat kuat']
var butt = [{buttonId: `${prefix}brokenhome`, buttonText: { displayText: `NEXT` }, type: 1 }]
conn.sendMessage(from, { text : `${pickRandom(broken)}`, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'senja':
const senja = ["Senja selalu cantik kecuali saat kau patah hati.",
  "Aku masih rindu. Namun senja tak ingin lama bertamu.",
  "Ada yang tak tenggelam ketika senja datang, yakni rasa.",
  "Karena senja selalu menerima langit apa adanya.",
  "Setiap senja selalu menjanjikan kita awal yang baru.",
  "Senja telah mengajarkanku apa arti dari mengikhlaskan.",
  "Biar lelah, tapi dia tetap indah. Itulah senja.",
  "Senja tak pernah salah, hanya kenangan yang membuatnya basah.",
  "Hanya senja yang tau cara berpamitan dengan indah.",
  "Senja, perpaduan yang sungguh indah bagi alam semesta.",
  "Selepas senja, aku kembali menjadi manusia yang menutupi air mata dengan gelak tawa.",
  "Senjaku mulai menepi ke peraduannya.",
  "Karena senja tak pernah memintamu menunggu.",
  "Entah mana yang lebih indah, senja yang mulai memerah atau senyummu yang mulai merekah.",
  "Senja tak pernah membenci awan kelabu yang sering menutupinya.",
  "Jadilah seperti senja yang kehadirannya selalu membuat ketenangan dan kepergiannya selalu membuat kerinduan.",
  "Kamu seperti senja,terasa menyenangkan namun tak bertahan lama.",
  "Aku hanya dapat menikmati kehangatan senja yang tak akan pernah untuk menikmati kehangatan pelukanmu.",
  "Senja telah mengajarkan ku apa arti dari mengikhlaskan.",
  "Kamu bagaikan senja di sore hari, indah sesaat kemudian menghilang.",
  "Senja mengajarkan kita bahwa keindahan tak harus datang lebih awal.",
  "Senja tak pernah salah, hanya kenangan yang membuatnya basah.",
  "Kenyataanya senja tetaplah senja. Dia tak punya rasa, dia memberi indah sesaat kepada penikmatnya, lalu pergi begitu saja.",
  "Di antara senja dan keheningan tempat ini, mengingatmu menjadi kesibukan kecil yang membahagiakan.",
  "Di ujung senja yang sudah hampir hilang kali ini aku masih menanti sebuah kabar dan ku tak tahu harus berapa lama ku menunggu.",
  "Untuk luka yang terhapus senja, untuk duka yang makin meraja, yakinlah hati agar membaja, bisikan lembut dengan senyuman manja, Insyaallah bersama Allah semuanya akan baik-baik saja.",
  "Saat senja menyapa, aku menyadari bahwa masih banyak hal indah yang Tuhan ciptakan selain Kamu.",
  "Demi matahari senja yang menggantung manis manja di cakrawala, demi kebaikan dan ketulusan yang telaten diberikan semesta, dan demi ragam nama-nama Tuhan baik yang akrab maupun asing di telinga kita, sesungguhnya, manusia, adalah mahkluk yang merugi. Kecuali, ia yang mau belajar pada masa silam, berbuat yang terbaik di masa sekarang, dan menyiapkan segala sesuatu di masa depan, dengan keyakinan paling yakin pada terwujudnya sebuah impian.",
  "Tuhan, bersama tenggelamnya matahari senja ini, redakanlah kekecewaan dan kemarahan di hati ini. Sabarkanlah aku. Aamiin.",
  "Nikmat Allah mana yang kau dustakan disenja ini wahai saudara-saudaraku semua.",
  "Di tengah angin senja yang mendesak, aku merasakan kekuasaan waktu, yang tanpa pandang bulu mengubah segala-galanya.",
  "Terkadang senja mengingatkan pada rumah, pada orang-orang yang membuat hati kita rindu untuk pulang.",
  "Salah satu nikmat Allah yang sampai detik ini bisa kurasakan adalah masih bisa bernapas dan menghirup segarnya udara senja.",
  "Salam senja dan Magrib. Doa kita kepada yang maha kuasa hanya taubat jawabannya, dosa kita kepada sesama berminta maaf penawarnya.",
  "Gelombang adzan mendayu meminang senja. Di sanalah, Tuhan melahirkan segala rindu.",
  "Engkau terkadang datang seperti jingga di kala senja, datang dengan keindahan berlalu menyisakan kegelapan.",
  "Senja: Mengajarkan kita bahwa yang indah pasti akan tenggelam.",
  "Senja pergi secara perlahan, karena ia tahu pergi secara tiba-tiba hanya menyakiti siapapun yang menikmatinya.",
  "Walau senja tinggalkan keindahan dan pergi, ia selalu datang kembali di esok hari. Tak seperti kamu yang lebih indah dari senja tapi pergi entah kemana.",
  "Ku mencintai kau seperti senja. Dengan keindahannya, tanpa durasinya.",
  "Jangan mengulangi kesalahan yang sama, karena masih banyak kesalahan kesalahan lain yang perlu dicoba.",
  "Terima kasih senja, kau telah menampakkan bahwa perpisahan tak semuanya menyakitkan. Dan kepergian tampak begitu indah tanpa kehangatan.",
  "Senja itu seperti kita, singkat dan bahagia.",
  "Aku hanyalah penikmat kehangatan senja yang tak akan bisa menikmati kehangatan pelukanmu.",
  "Hari ini aku belajar dari senja bahwa yang indah dan mempesona akan hilang dan tenggelam pada waktunya.",
  "Tanaman palsuku mati karena aku tidak berpura pura menyiramnya.",
  "Jangan rindu berat, kamu nggak akan kuat. Biar aku saja yang merindukanmu sekalipun bertambah berat badanku.",
  "Bermimpilah setinggi langit, jika kamu terjatuh berarti tidurmu kurang ke tengah.",
  "Dusk is proof that no matter what happens, everyday can end beautifully.",
  "From the twilight I learned that every beautiful things had to go through all the painful things.",
  "Twilight drops her curtain down, and pins it with a star. Lucky Maud Montgomery.",
  "Dusk teaches us that life is not always bright and shining.",
  "Twilight comes in a beautiful way. As beautiful as God ways in meet us.",
  "Every sunset bring a promise for a new dawn. -Ralph Waldo Emerson",
  "Dusk teaches us to appreciate all the great things the sun gives us.",
  "Don't forget that beautiful twilight needs blackened clouds.",
  "And dusk makes us understand the meaning of the word 'willing'.",
  "Twilight fell: The sky turned to a light, dusky purple littered with tiny silver stars. J.K. Rowling",
  "Pengagum senja, penyesap kopi, penikmat rindu, penimba ilmu, peninggi badan, pemanjat sutet, pembuka simontok, penyembah tutup botol.",
  "Tangannya menjadi pengganti tanganku untuk menuntunmu' Pundaknya menjadi pengganti pundakku untukmu bersandar. Biarlah gemercik gerimis, carik senja, secangkir teh, dan bait lagu menjadi penggantimu.",
  "Mulai mempertanyakan alam raya, galaksi, planet-planet dan eksistensi saya di muka bumi ketika pagi-pagi belum juga ingin buang air besar.",
  "Jodoh tak akan ke mana-mana terlebih dahulu sebelum akhirnya menetap.",
  "Jatuh hati tidak pernah bisa memilih. Tuhan memilihkan. Kita hanyalah korban. Kecewa adalah konsekuensi, bahagia adalah bonus.",
  "Hujan dan gebetan itu mirip. Ada yang mengaku suka, tapi hanya memandangnya dari tempat duduk yang hangat, berkata-kata romantis tanpa pernah mau bersinggungan. Ada yang betulan suka, mengalahkan rasa tidak nyaman, langsung berinteraksi dengannya meski berisiko sakit.",
  "Enak atau tidaknya ucapan selamat malam dan selamat pagi itu tergantung siapa yang mengucapkan.",
  "Denganmu, basa-basi terasa berisi.",
  "Absurd sekali, kita. Cerita berjam-jam, lalu hilang kabar berhari-hari. Merindu diam-diam, hingga tidak lagi saling mencari.",
  "Aku lelah sembunyi, lelah merindukanmu dalam sunyi. Tanganku jangan dijabat, baiknya digenggam saja. Tak cuma jadi sahabat, jadi kekasihmu juga.",
  "Jangan pernah lupa, bahwa awan menghitam adalah yang membuat senja terlihat sempurna.",
  "Meski senja tiba di ujung mata, rindu enggan tinggalkan kita, tak peduli dengan siapa menanti malam, rindu ini senantiasa menyapa.",
  "Ketika senja mulai tenggelam, ku mulai menyadari kamu yang paling berarti, dan ketika sinar matahari menyapa ku sadari kamu hanya mimpi.",
  "Senjaku berlari mengejar ketinggalannya, menyusuri setapak di tepian jurang menganga, di bawahnya riuh ombak berirama lara.",
  "Jika kamu senja, maka aku jingga. Muncul bersama, hilang pun juga.",
  "Matahari yang tenggelam akan mengajarkan pada kita, agar bisa menghargai apa yang diberikan matahari untuk kita.",
  "Senja begitu cepat berganti, dan sampai saat ini kau tetap kunanti.",
  "Senja memang begitu indah, namun cahaya mentari tetap tak tergantikan, meski dengan lilin yang bersinar sangat terang sekalipun.",
  "Saat jingga bersetubuh dengan gelap, sepasang mata sibuk kemasi air matanya; seakan takut, senja mencuri rindu miliknya.",
  "Senja mengajarkan pada kita, bahwa kehidupan tak selalu berjalan dengan cemerlang dan bersinar."]
var butt = [{buttonId: `${prefix}senja`, buttonText: { displayText: `NEXT` }, type: 1 }]
  conn.sendMessage(from, { text : `*_${pickRandom(senja)}_*`, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'faktaunik':
var faktakey = await fetchJson(`https://api.lolhuman.xyz/api/random/faktaunik?apikey=SGWN`) 
var butt = [{buttonId: `${prefix}fakta`, buttonText: { displayText: `NEXT` }, type: 1 }]
  conn.sendMessage(from, { text: `*_${faktakey.result}_*`, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'apakah':
if(!q) return reply('Masukan Pertanyaan')
const apakah = ['Ya', 'Mungkin iya', 'Mungkin', 'Mungkin tidak', 'Tidak', 'Tidak mungkin']
conn.sendMessage(from, { text : `*Pertanyaan :* ${q}\n*Jawaban :* _${pickRandom(apakah)}_`, footer: footer }, { quoted: fkontak })
break
case prefix+'bisakah':
if(!q) return reply('Masukan Pertanyaan')
const bisakah = ['Iya','Bisa','Tentu saja bisa','Tentu bisa','Sudah pasti','Sudah pasti bisa','Tidak','Tidak bisa','Tentu tidak','tentu tidak bisa','Sudah pasti tidak']
conn.sendMessage(from, { text : `*Pertanyaan :* ${q}\n*Jawaban :* _${pickRandom(bisakah)}_`, footer: footer }, { quoted: fkontak })
break
case prefix+'dimanakah':
case prefix+'dimana':
if(!q) return reply('Masukan Pertanyaan')
const dimana = ['di neraka','di surga','di mars','di tengah laut','di dada :v','di hatimu >///<']
conn.sendMessage(from, { text : `*Pertanyaan :* ${q}\n*Jawaban :* _${pickRandom(dimana)}_`, footer: footer }, { quoted: fkontak })
break
case prefix+'taugasih':
const taugasih = ["Tahukah Anda seekor capung bisa terbang dengan kecepatan 40kph (25mph)",
"Tahukah Anda bahwa semua burung hantu bertelur putih?",
"Tahukah Anda bahwa Hawaii secara resmi menjadi bagian dari AS pada 14 Juni 1900",
"Tahukah Anda bahwa rata-rata orang tertawa 10 kali sehari?",
"Tahukah Anda bahwa diameter Jupiter adalah 152.800 km (88.700 mil)",
"Tahukah Anda bahwa warna sikat gigi yang paling populer adalah biru",
"Tahukah Anda bahwa harimau memiliki kulit belang serta bulu",
"Tahukah Anda bahwa ngengat tidak punya perut",
"Tahukah Anda bahwa hamburger ditemukan pada tahun 1900",
"Tahukah Anda bahwa aichmophobia adalah ketakutan akan jarum dan benda runcing",
"Tahukah Anda bahwa kuku jari tangan tumbuh lebih cepat daripada kuku kaki",
"Tahukah Anda kata *hampir* adalah yang terpanjang dalam bahasa Inggris dengan semua huruf dalam urutan abjad",
"Tahukah Anda bahwa iatrofobia adalah ketakutan akan dokter",
"Tahukah Anda bahwa membanting pintu mobil Anda dulunya ilegal di Swiss",
"Tahukah Anda bahwa mamalia terkecil di dunia adalah kelelawar bumblebee dari Thailan",
"Tahukah Anda bahwa singa memberi makan setiap 3 hingga 4 hari sekali",
"Tahukah Anda bahwa cangkangnya 12% dari berat telur",
"Tahukah Anda bahwa landak rata-rata memiliki 30.000 duri",
"Tahukah Anda bahwa jeruk bali mendapatkan namanya dari cara ia tumbuh dalam kelompok seperti anggur di pohon anggur",
"Tahukah Anda bahwa 45% orang menggunakan obat kumur setiap hari",
"Tahukah Anda bahwa umur tupai adalah 9 tahun",
"Tahukah Anda bahwa Anda dapat membedakan jenis kelamin kuda dari giginya (kebanyakan jantan memiliki 40, betina 36)",
"Tahukah Anda 10% dari pasokan makanan dunia dikonsumsi oleh serangga",
"Tahukah kamu awan terbang lebih tinggi di siang hari daripada di malam hari",
"Tahukah Anda bahwa Empire State Building di New York memiliki berat lebih dari 365.000 ton",
"Tahukah Anda Antartika terdiri dari 98% es dan 2% batu tandus",
"Tahukah Anda 90% orang bergantung pada jam alarm untuk bangun",
"Tahukah Anda bahwa kopi adalah minuman paling populer di seluruh dunia dengan lebih dari 400 miliar cangkir dikonsumsi setiap tahun",
"Tahukah Anda bahwa Bumi disambar petir lebih dari 100 kali setiap detik",
"Tahukah Anda bahwa rata-rata orang memiliki 10.000 selera?",
"Tahukah Anda bahwa sel darah merah diproduksi di sumsum tulang?",
"Tahukah Anda bahwa 11% orang kidal",
"Tahukah kamu setiap tahun matahari kehilangan 360 juta ton"]
var butt = [{buttonId: `${prefix}taugasih`, buttonText: { displayText: `NEXT` }, type: 1 }]
conn.sendMessage(from, { text : `_${pickRandom(taugasih)}_`, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'tololcek':
const tolol = ['Tolol Level : 4%\n\nAMAN BANGET!',
'Tolol Level : 7%\n\nMasih Aman',
'Tolol Level : 12%\n\nAman Kok',
'Tolol Level : 22%\n\nHampir Aman',
'Tolol Level : 27%\n\nTolol dikit',
'Tolol Level : 35%\n\nTolol ¼',
'Tolol Level : 41%\n\nDah lewat dri Aman',
'Tolol Level : 48%\n\nSetengah Tolol',
'Tolol Level : 56%\n\nLu Tolol juga',
'Tolol Level : 64%\n\nLumayan Tolol',
'Tolol Level : 71%\n\nHebatnya ketololan lu',
'Tolol Level : 1%\n\n99% LU GAK TOLOL!',
'Tolol Level : 77%\n\nGak akan Salah Lagi dah tololnya lu',
'Tolol Level : 83%\n\nDijamin tololnyan',
'Tolol Level : 89%\n\nTolol Banget!',
'Tolol Level : 94%\n\nSetolol Om Deddy😂',
'Tolol Level : 100%\n\nLU ORANG TERTOLOL YANG PERNAH ADA!!!',
'Tolol Level : 100%\n\nLU ORANG TERTOLOL YANG PERNAH ADA!!!',
'Tolol Level : 100%\n\nLU ORANG TERTOLOL YANG PERNAH ADA!!!',
'Tolol Level : 100%\n\nLU ORANG TERTOLOL YANG PERNAH ADA!!!']
conn.sendMessage(from, { text : `${pickRandom(tolol)}`, footer: footer }, { quoted: fkontak })
break
case prefix+'wibucek':
const wibu = ['Wibu Level : 4%\n\nMasih Aman Lah Yaa!',
'Wibu Level : 7%\n\nMasih Aman',
'Wibu Level : 12%\n\nAman Kok',
'Wibu Level : 22%\n\nHampir Aman',
'Wibu Level : 27%\n\nWibu dikit',
'Wibu Level : 35%\n\nWibu ¼',
'Wibu Level : 41%\n\nDah lewat dri Aman',
'Wibu Level : 48%\n\nSetengah Wibu',
'Wibu Level : 56%\n\nLu Wibu juga',
'Wibu Level : 64%\n\nLumayan Wibu',
'Wibu Level : 71%\n\nPasti Lu Punya Seribu Waifu',
'Wibu Level : 1%\n\n99% LU GAK Wibu!',
'Wibu Level : 77%\n\nGak akan Salah Lagi dah Wibunya lu',
'Wibu Level : 83%\n\nDijamin Sepuhnya Wibu',
'Wibu Level : 89%\n\nFix Wibu Elite!',
'Wibu Level : 94%\n\nUdah Elite Sih Ini😂',
'Wibu Level : 100%\n\nBAU BAWANGNYA SAMPE SINI CUY!!!',
'Wibu Level : 100%\n\nBAU BAWANGNYA SAMPE SINI CUY!!!',
'Wibu Level : 100%\n\nBAU BAWANGNYA SAMPE SINI CUY!!!',
'Wibu Level : 100%\n\nBAU BAWANGNYA SAMPE SINI CUY!!!']
conn.sendMessage(from, { text : `${pickRandom(wibu)}`, footer: footer }, { quoted: fkontak })
break
case prefix+'gantengcek':
const ganteng = ['📮Ganteng Level : 4%\n\nINI MUKA ATAU SAMPAH?!','📮Ganteng Level : 7%\n\nSerius ya Bro,, Lu ampir mirip kayak Monyet!','📮Ganteng Level : 12%\n\nMakin lama liat muka lo gw bisa muntah!','📮Ganteng Level : 22%\n\nMungkin karna lo sering liat berbuat maksiat😂','📮Ganteng Level : 27%\n\nKeknya bakal susah dapet jodoh lu,, berdoa aja','📮Ganteng Level : 35%\n\nYang sabar ya ayang','📮Ganteng Level : 41%\n\nSemoga diberkati mendapat jodoh','📮Ganteng Level : 48%\n\nDijamin cewek susah deketin lo','📮Ganteng Level : 56%\n\nLu Setengah Ganteng :v','📮Ganteng Level : 64%\n\nCukuplah','📮Ganteng Level : 71%\n\nLumayan Ganteng juga lu ya','📮Ganteng Level : 1%\n\nAWOAKAK BURIQQQ!!!','📮Ganteng Level : 1%\n\nAWOAKAK BURIQQQ!!!','📮Ganteng Level : 1%\n\nAWOAKAK BURIQQQ!!!','📮Ganteng Level : 1%\n\nAWOAKAK BURIQQQ!!!','📮Ganteng Level : 77%\n\nGak akan Salah Lagi dah Om','📮Ganteng Level : 83%\n\nDijamin Cewek gak akan kecewa Om','📮Ganteng Level : 89%\n\nCewek2 pasti bakalan pingsan klo ngeliat lo!','📮Ganteng Level : 94%\n\nAARRGGHHH!!!','📮Ganteng Level : 100%\n\nLU EMANG COWOK TERGANTENG, KAYA PACARNYA MIKU']
conn.sendMessage(from, { text : `${pickRandom(ganteng)}`, footer: footer }, { quoted: msg })
break
case prefix+'cantikcek':
const cantik = ['Cantik Level : 4%\n\nINI MUKA ATAU SAMPAH?!',
'Cantik Level : 7%\n\nSerius ya,, Lu ampir mirip kayak Monyet!',
'Cantik Level : 12%\n\nMakin lama liat muka lo gw bisa muntah!',
'Cantik Level : 22%\n\nMungkin karna lo sering liat berbuat maksiat😂',
'Cantik Level : 27%\n\nKeknya bakal susah dapet jodoh lu,, berdoa aja',
'Cantik Level : 35%\n\nYang sabar ya ayang',
'Cantik Level : 41%\n\nSemoga diberkati mendapat jodoh',
'Cantik Level : 48%\n\nDijamin cowok susah deketin lo',
'Cantik Level : 56%\n\nLu Setengah Cantik :v',
'Cantik Level : 64%\n\nCukuplah',
'Cantik Level : 71%\n\nLumayan cantik juga lu ya',
'Cantik Level : 1%\n\nAWOAKAK BURIQQQ!!!',
'Cantik Level : 1%\n\nAWOAKAK BURIQQQ!!!',
'Cantik Level : 1%\n\nAWOAKAK BURIQQQ!!!',
'Cantik Level : 1%\n\nAWOAKAK BURIQQQ!!!',
'Cantik Level : 77%\n\nGak akan Salah Lagi dah neng',
'Cantik Level : 83%\n\nDijamin cowok gak akan kecewa neng',
'Cantik Level : 89%\n\ncowok2 pasti auto salfok klo ngeliat lo!',
'Cantik Level : 94%\n\nAARRGGHHH!!!',
'Cantik Level : 100%\n\nLU EMANG CEWEK TERCANTIK YANG PERNAH GW LIAT!!!']
conn.sendMessage(from, { text : `${pickRandom(cantik)}`, footer: footer }, { quoted: fkontak })
break
case prefix+'kapan':
case prefix+'kapankah':
if(!q) return reply('Masukan Pertanyaan')
const kapan = ['1','2','3','4','5','6','7','8','9','10']
const kapankah = ['Detik lagi','Menit Lagi','Jam lagi','Hari lagi','Minggu lagi','Bulan lagi','Tahun lagi','Abad lagi']
conn.sendMessage(from, { text : `*Pertanyaan :* ${q}\n*Jawaban :* _${pickRandom(kapan)} ${pickRandom(kapankah)}_`, footer: footer }, { quoted: fkontak })
break
case prefix+'ceksifat':
if(!q) return reply(`Masukan Nama\nContoh : ${commamd} Ainul Bot`) 
const ab = ['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%']
const abb = ['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%']
const orang = ['Baik Hati','Sombong','Pelit','Dermawan','Rendah Hati','Rendah Diri','Pemalu','Penakut','Pengusil','Cengeng']
const selalu = ['Rajin','Malas','Membantu','Ngegosip','Jail','Gak jelas','Shoping','Chattan sama Doi','Chattan di WA karna Jomblo','Sedih','Kesepian','Bahagia','ngocok tiap hari']
const cerdas = ['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%']
const nakal = ['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%']
const berani = ['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%']
const takut = ['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%']
conn.sendMessage(from, { text: `*———「 CEK SIFAT 」———*\n\n*Nama :* ${q}\n*Akhlak Baik :* ${pickRandom(ab)}\n*Akhlak Buruk :* ${pickRandom(abb)}\n*Orang Yang :* ${pickRandom(orang)}\n*Selalu :* ${pickRandom(selalu)}\n*Kecerdasan :* ${pickRandom(cerdas)}\n*Kenakalan :* ${pickRandom(nakal)}\n*Keberanian :* ${pickRandom(berani)}\n*Ketakutan :* ${pickRandom(takut)}`, footer: footer }, { quoted: fkontak })
break
case prefix+'gombal':
const gombal = ['Satu titik dua koma, kamu cantik nomor WA nya berapa?','Kamu itu seperti kata sandi, kalau hilang panik nyarinya','Aku nggak tahu mana yang lebih memesona hari ini, cuacanya atau kamu yang lagi chatan sama aku saat ini?','Seandainya aku ini gelas, aku pengen deh kamu yang jadi airnya. Soalnya cuma kamu yang bisa mengisi kekosongan hidup aku','Aku punya kemoceng buat kamu nih. Buat bersihin hati kamu dari nama-nama cowok yang udah nyakitin kamu','Kalau aku jadi pejabat kayaknya aku bakalan gagal deh. Gimana mau mikirin rakyat, kalau pikiran aku udah habis buat mikirin kamu','Kamu itu sama seperti kemerdekaan. Sama-sama harus diperjuangkan','Kamu seperti Instagram, lebih banyak yang like daripada comment. Kayak aku ke kamu, banyak yang suka tapi nggak berani ngomong','Semenjak lihat kamu aku tuh jadi sakit mata, karena semua yang aku lihat jadi hitam putih. Cuma kamu doang yang berwarna','Nama kamu diganti sama Google aja ya. Soalnya semua yang aku cari ada di kamu','Burung Irian burung Cendrawasih. Daripada kamu sendirian, mending kita memadu kasih','Meskipun kamu dari ujung lautan ngelempar senyum, tapi langsung masuk ke hati aku.','Aku boleh minta tolong? Tolong ambilin hati aku yang udah jatuh di kamu.','Kalau ngobrol sama kamu tuh aku harus bawa tali tau. Karena setiap kamu senyum, hati aku jatuh terlalu dalam','Seandainya kamu jadi upil, aku yang akan jadi kelingkingnya. Aku akan mencari kamu sampai dapat.','Kemarin aku kirim foto kamu ke lembaga antariksa loh! Biar apa coba? Biar mereka tahu kalau ada yang lebih indah dari bintang-bintang di langit','Main ular tangga sekarang sudah nggak zaman. Tahu nggak kenapa bisa gitu? Karena sekarang zamannya membangun rumah tangga bersamamu','Sekarang itu aku nggak bisa ikat tali sepatu. Tahu nggak alasannya kenapa? Soalnya aku terlalu sibuk ngikat kamu di hatiku','Apa persamaan matahari dan rasa cintaku padamu? Sama-sama terbit setiap hari dan akan berakhir sampai kiamat','Melihat kamu itu seperti melihat polisi di pinggir jalan. Kamu tahu alasannya apa? Karena sama-sama bikin deg-degan','Apa bedanya cuaca sama kamu? Kalau cuaca boleh mendung hingga berkabut asap, tetapi mencintaimu tetap aku yang paling siap','Tahu nggak kalau cintaku padamu itu sama kayak roda kereta api? Karena selamanya nggak akan pernah kempes','Tahu nggak apa bedanya kamu sama planet Saturnus? Kalau Saturnus cincinnya dari asteroid, kalau kamu cincinnya dari aku','Apa bedanya kamu sama tempat angker? Kalau tempat angker menguji nyali, tapi kalau kamu menguji iman.','Apa bedanya kamu sama buku? Kalau buku jendela dunia, kalau kamu duniaku','Kamu tahu kepanjangan ngabuburit? Ngajak kamu buru-buru married','Kamu tahu istilah nasi sudah menjadi bubur? Seperti itulah perasaanku kepadamu, dulunya sayang sekarang sudah jadi cinta','Kamu pasti cita-citanya ingin jadi guru ya? Soalnya kamu selalu mengajariku untuk selalu mencintaimu','Tahu nggak bedanya kamu sama motor itu apa? Kalau motor butuh bensin biar bisa jalan, kalau aku butuh kamu biar bisa hidup','Kamu itu orang yang paling kasar dalam hidupku. Karena kamu selalu maksa otakku untuk mikirin kamu terus','Matahari itu pusat tatasurya, kalau kamu itu pusat perhatianku','Aku sudah sangat siap kalau Senin harus bangun pagi, apalagi bangun rumah tangga sama kamu','Rumus matematika sama fisika itu memang susah dihafalin, beda sama kamu. Kalau kamu gampang banget buat diingat susah buat dilupain','Aku nggak pernah merasakan gempa bumi sampai kamu benar-benar mengguncang duniaku.','Aku tahu aku butuh makanan sehat sebagai penyeimbang tubuh. Tapi, aku juga butuh kamu sebagai penyeimbang hidupku','Ada tiga hal di dunia yang nggak bisa aku hitung, yaitu jumlah bintang di langit, ikan di lautan, dan cintaku padamu','Laut yang paling dalam dan luas itu cuma lautan cintaku untukmu','Kamu jangan dekat-dekat sama tanaman berbunga yah. Ntar bunganya layu. Soalnya malu kalah cantik sama kamu.','Cintaku ke kamu tuh seperti kuku, akan tumbuh terus sampai mati meskipun berkali-kali dipotong atau disakiti.']
var butt = [{buttonId: `${prefix}gombal`, buttonText: { displayText: `NEXT` }, type: 1 }]
conn.sendMessage(from, { text : `${pickRandom(gombal)}`, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'pantun':
var pantunkey = await fetchJson(`https://api.lolhuman.xyz/api/random/pantun?apikey=SGWN`)
var butt = [{buttonId: `*_${prefix}pantun_*`, buttonText: { displayText: `NEXT` }, type: 1 }]
conn.sendMessage(from, { text : `${pantunkey.result}`, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'cuaks':
const cuaks = ['Game Elite\nNgaji Sulit\nCuaks','Di Suruh Pacar Elit\nDi Suruh Ortu Sulit\nCuaks','Bergadang Elit\nSholat Subuh Sulit\nCuaks','HP Elit\nKuota Sulit\nCuaks','Bahagiain Pacar Elit\nBahagiain Ortu Sulit\nCuaks','Top Up Elit\nSedekah Sulit\nCuaks','Kerumah Pacar Elit\nKe Masjid Sulit\nCuaks','Kerumah Pacar Elit\nKe Gereja Sulit\nCuaks','Mainnya Jago\nNgajinya Iqro\nCuaks','Makan Elit\nBersihin Piring Sulit\nCuaks','Pacaran Elit\nLima Waktu Sulit\nCuaks','Nongkrong Elit\n24434 Sulit\nCuaks','Di Panggil Ayang Elit\nDi Panggil Buat Sholat Sulit\nCuaks']
var butt = [{buttonId: `${prefix}cuaks`, buttonText: { displayText: `NEXT` }, type: 1 }]
conn.sendMessage(from, { text : `${pickRandom(cuaks)}`, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'truth':
const truth = ['Kapan terakhir kali kamu berbohong?','Kapan terakhir kali kamu menangis?','Kapan terakhir kali kamu kentut?','Apa ketakutan terbesarmu?','Apa hal yang membuatmu senang orang tuamu tidak mengetahuinya? ','Apa hal terburuk yang pernah kamu lakukan? ','Apa rahasia yang tidak pernah kamu ceritakan kepada siapa pun? ','Siapa selebriti yang pertama kali bikin kamu naksir? ','Apakah kamu pernah melanggar hukum? ','Apa hal paling memalukan yang pernah kamu lakukan? Kapan? ','Apa hal yang paling membuatmu merasa insecure? ','Apa hal paling menjijikkan yang pernah kamu lakukan? ','Apa kebiasaan terburukmu? ','Apa penyesalan terburukmu? ','Kenapa kamu putus dengan mantan yang sebelumnya? ','Siapa orang yang terakhir kamu hubungi di WhatsApp? ','Apa yang paling kamu benci dari dirimu? ','Apa yang kamu lakukan saat bertemu dengan orang yang membencimu? ','Siapa orang terakhir yang kamu stalk di media sosial? ','Siapa orang yang diam-diam kamu sukai? ']
var butt = [{buttonId: `${prefix}dare`, buttonText: { displayText: `DARE` }, type: 1 }, {buttonId: `${prefix}truth`, buttonText: { displayText: `TRUTH` }, type: 1 }]
conn.sendMessage(from, { text : `${pickRandom(truth)}`, buttons: butt, footer: footer }, { quoted: fkontak })
break
case prefix+'dare':
const dare = ['Biarkan orang lain membuat status menggunakan akun sosial mediamu. ','Cium salah satu kaus kaki ','Peragakan salah satu orang di antara kita sampai ada yang bisa menebak siapa orang yang diperagakan. ','Tirukan seorang selebriti sampai ada yang bisa menebak. ','Bertingkahlah seperti ayam ','Biarkan satu orang menggambar tato di wajahmu. ','Gunakan penutup mata lalu raba muka salah satu di antara kita sampai kamu bisa menebak siapa orang itu. ','Ungkapkan perasaanmu kepada gebetanmu.','Push up 20 kali.','Kayang selama satu menit.','Plank selama satu menit. ','Biarkan salah satu di antara kita merias wajahmu menggunakan make up. ','Telepon seorang teman dan katakan selamat ulang tahun sambil menyanyikan lagu. ','Tunjukkan gerakan dance terbaikmu. ','Ulangi setiap perkataan orang yang ada di sampingmu ','Nyanyikan sebuah lagu dengan nama seseorang ','Kirim fotomu yang paling jelek. ','Beri 10 pujian yang tulus kedapa teman mu ','Bicara selama 3 menit tanpa berhenti. ']
var butt = [{buttonId: `${prefix}truth`, buttonText: { displayText: `TRUTH` }, type: 1 }, {buttonId: `${prefix}dare`, buttonText: { displayText: `DARE` }, type: 1 }]
conn.sendMessage(from, { text : `${pickRandom(dare)}`, buttons: butt, footer: footer }, { quoted: fkontak })
break
case 'halo':
case 'hallo':
case 'hai':
case 'haii':
case 'hola':
case 'holla':
case 'hollaaa':
case 'bot':
case 'hi':
case 'helo':
case 'hello':
case 'pe':
case 'pee':
case 'peee':
var butt = [{buttonId: `${prefix}menu`, buttonText: { displayText: `MENU` }, type: 1 }]
conn.sendMessage(from, { text : `${ucapanWaktu2} @${sender.split("@")[0]} Ada Yang Bisa Saya Bantu? Click Button Di Bawah Untuk Melihat Menu Fitur Bot`, buttons: butt, footer: footer, mentions: [sender] }, { quoted: fkontak })
break
case prefix+'galau':
if (args.length < 2) return reply(`Silahkan Pilih Lagu Galaunya 1-22\nContoh ${command} 3`) 
conn.sendMessage(from, {audio: fs.readFileSync(`./sound/galau/${args[1]}.mp3`), mimetype: 'audio/mp4', ptt: true}, {quoted: fkontak })
break
case prefix+'kane':
if (args.length < 2) return reply(`Silahkan Pilih Lagu kanenya 1-16\nContoh ${command} 3`) 
conn.sendMessage(from, {audio: fs.readFileSync(`./sound/kane/${args[1]}.mp3`), mimetype: 'audio/mp4', ptt: true}, {quoted: fkontak })
break
case prefix+'meme':
case prefix+'memes':
var bahanmeme = await getBuffer(`https://api.lolhuman.xyz/api/meme/memeindo?apikey=SGWN`) 
var butt = [{buttonId: `${prefix}meme`, buttonText: { displayText: `NEXT` }, type: 1 }]
conn.sendMessage(from, { caption: `AkwoakAkwoak`, image: bahanmeme, buttons: butt, footer: footer }, { quoted: fkontak }) 
break
case prefix+'darkjokes':
case prefix+'darkjoks':
case prefix+'dk':
var bahandark = await getBuffer(`https://api.lolhuman.xyz/api/meme/darkjoke?apikey=SGWN`) 
var butt = [{buttonId: `${prefix}dk`, buttonText: { displayText: `NEXT` }, type: 1 }]
conn.sendMessage(from, { caption: `Kurang Gelap?`, image: bahandark, buttons: butt, footer: footer }, { quoted: fkontak })
break
// Group Menu
			case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				var url = await conn.groupInviteCode(from).catch(() => reply(messErr))
			    url = 'https://chat.whatsapp.com/'+url
				reply(`*[ Link Grup ${groupName} ]*\n${url}`)
				break
			case prefix+'setppgrup': case prefix+'setppgc':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (isImage || isQuotedImage) {
            var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
            if (args[1] == '\'panjang\'') {
            	var { img } = await generateProfilePicture(media)
            	await conn.query({
                    tag: 'iq',
                    attrs: {
                        to: from,
                        type:'set',
                        xmlns: 'w:profile:picture'
                    },
                    content: [
                    {
                        tag: 'picture',
                        attrs: { type: 'image' },
                        content: img
                    } 
                    ]
                })
                fs.unlinkSync(media)
            	reply(`Sukses`)
            } else {
                await conn.updateProfilePicture(from, { url: media })
                .then( res => {
                    reply(`Sukses`)
                    fs.unlinkSync(media)
                }).catch(() => reply(messErr))
            }
            } else {
			    reply(`Kirim/balas gambar dengan caption ${command}`)
            }
            break
			case prefix+'setnamegrup': case prefix+'setnamegc':
			    if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await conn.groupUpdateSubject(from, q)
			    .then( res => {
				  reply(`Sukses`)
				}).catch(() => reply(messErr))
			    break
			case prefix+'setdesc': case prefix+'setdescription':
			    if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await conn.groupUpdateDescription(from, q)
			    .then( res => {
			      reply(`Sukses`)
				}).catch(() => reply(messErr))
				break
			case prefix+'revoke':
			    if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				await conn.groupRevokeInvite(from)
			    .then( res => {
				  reply(`Sukses menyetel tautan undangan grup ini`)
				}).catch(() => reply(messErr))
				break
			case prefix+'hidetag':
			case prefix+'h':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
			    let mem = [];
		        groupMembers.map( i => mem.push(i.id) )
				conn.sendMessage(from, { text: q ? q : '', mentions: mem })
			    break
case prefix+'add':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (groupMembers.length == 1024) return reply(`Anda tidak dapat menambah peserta, karena Grup sudah penuh!`)
            var mems = []
            groupMembers.map( i => mems.push(i.id) )
            var number;
            if (args.length > 1) {
                number = q.replace(/[^0-9]/gi, '')+"@s.whatsapp.net"
                var cek = await conn.onWhatsApp(number)
                if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
                if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                conn.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = quotedMsg.sender
                var cek = await conn.onWhatsApp(number)
                if (cek.length == 0) return reply(`Peserta tersebut sudah tidak terdaftar di WhatsApp`)
                if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                conn.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Kirim perintah ${command} nomer atau balas pesan orang yang ingin dimasukkan`)
            }
            break
        case prefix+'kick':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            var number;
			if (mentionUser.length !== 0) {
                number = mentionUser[0]
                conn.groupParticipantsUpdate(from, [number], "remove")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = quotedMsg.sender
                conn.groupParticipantsUpdate(from, [number], "remove")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
            }
            break
        case prefix+'promote': case prefix+'pm':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
                .catch(() => reply(messErr))
            } else if (isQuotedMsg) {
                conn.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
                .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
                .catch(() => reply(messErr))
            } else {
                reply(`Tag atau balas pesan member yang ingin dijadikan admin`)
            }
            break
        case prefix+'demote':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
                .catch(() => reply(messErr))
            } else if (isQuotedMsg) {
                conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
                .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
                .catch(() => reply(messErr))
            } else {
                reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa`)
            }
            break
         case prefix+'group': case prefix+'grup':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (args.length < 2) return reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
                   if (args[1] == "close") {
                     conn.groupSettingUpdate(from, 'announcement')
                     reply(`O━• *Group Close* •━O\n\n*📜 Group Telah Di Tutup Oleh Admin ${pushname}*\n\n*🎊 Group Close*\n*📆 ${tanggal}*\n*⏰ ${jam}*\n\n━O━O━••••••••••••━O━O━`)
                   } else if (args[1] == "open") {
                     conn.groupSettingUpdate(from, 'not_announcement')
                     reply(`O━• *Group Open* •━O\n\n📜 *Group Telah Di Buka Oleh Admin ${pushname}*\n\n*🎊 Group Open*\n*📆 ${tanggal}*\n*⏰ ${jam}*\n\n━O━O━••••••••••••━O━O━`)
                   } else {
                     reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
                   }
                   break
           case prefix+'welcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (args.length === 1) return reply(`Pilih enable atau disable`)
            if (args[1].toLowerCase() === "enable") {
                if (isWelcome) return reply(`Udah aktif`)
                welcome.push(from)
                fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                reply('Sukses mengaktifkan welcome di grup ini')
            } else if (args[1].toLowerCase() === "disable") {
                var posi = welcome.indexOf(from)
                welcome.splice(posi, 1)
                fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                reply('Sukses menonaktifkan welcome di grup ini')
            } else {
                reply(`Pilih enable atau disable`)
            }
            break
          case prefix+'antilink':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (args.length === 1) return reply(`Pilih enable atau disable`)
                   if (args[1].toLowerCase() === 'enable') {
                     if (isAntiLink) return reply(`Udah aktif`)
                     antilink.push(from)
                     fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                     reply('Antilink grup aktif')
                   } else if (args[1].toLowerCase() === 'disable') {
                     if (!isAntiLink) return reply(`Udah nonaktif`)
                     let anu = antilink.indexOf(from)
                     antilink.splice(anu, 1)
                     fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                     reply('Antilink grup nonaktif')
                   } else {
                     reply(`Pilih enable atau disable`)
                   }
                   break
                   case prefix+'antiwame':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (args.length === 1) return reply(`Pilih enable atau disable`)
                   if (args[1].toLowerCase() === 'enable') {
                     if (isAntiWaMe) return reply(`Udah aktif`)
                     antilink.push(from)
                     fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
                     reply('Antiwame aktif')
                   } else if (args[1].toLowerCase() === 'disable') {
                     if (!isAntiWaMe) return reply(`Udah nonaktif`)
                     let anu = antiwame.indexOf(from)
                     antiwame.splice(anu, 1)
                     fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
                     reply('Antiwame nonaktif')
                   } else {
                     reply(`Pilih enable atau disable`)
                   }
                   break
case prefix+'afk':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (isAfkOn) return reply('afk sudah diaktifkan sebelumnya')
                   if (body.slice(100)) return reply('Alasanlu kepanjangan')
                   let reason = body.slice(5) ? body.slice(5) : 'Nothing.'
                   addAfkUser(sender, Date.now(), reason, _afk)
                   mentions(`@${sender.split('@')[0]} sedang afk\nAlasan : ${reason}`, [sender], true)
                   break
case prefix+'ai':
case prefix+'openai':
if (args.length < 2) return reply(`Hai adakah yang bisa saya bantu??`)
reply(mess.wait)
var ainulbot = await fetchJson(`https://api.lolhuman.xyz/api/openai?apikey=SGWN&text=${q}&user=user-unique-id`)
const ainulbott = `${ainulbot.result}`
conn.sendMessage(from, { text: ainulbott, footer: footer }, { quoted: fkontak })
break
case prefix+'miku':
case prefix+'simi':
if (args.length < 2) return reply(`Haloooo Simi Disini Ada Yang Bisa Di Bantu?`)
var mikunya = await fetchJson(`https://api.lolhuman.xyz/api/simi?apikey=SGWN&text=${q}`)
const mikuhh = `${mikunya.result}`
conn.sendMessage(from, { text: mikuhh, footer: footer }, { quoted: msg })
break
case prefix+'artinama':
if (args.length < 2) return reply(`Masukan Namanya`)
reply(mess.wait) 
var artinya = await fetchJson(`https://api.lolhuman.xyz/api/artinama?apikey=SGWN&nama=${q}`) 
const nama = `${artinya.result}`
conn.sendMessage(from, { text: nama, footer: footer }, { quoted: fkontak }) 
break
case prefix+'lirik':
if (args.length < 2) return reply(`Lirik Lagu Apa?`)
reply(mess.wait) 
var lirikkey = await fetchJson(`https://api.lolhuman.xyz/api/lirik?apikey=SGWN&query=${q}`)
const liriknya = `${lirikkey.result}`
conn.sendMessage(from, { text: liriknya, footer: footer }, { quoted: fkontak })
break
case prefix+'zodiak':
if (args.length < 2) return reply(`Masukan Zodiak Anda`)
reply(mess.wait) 
var zodiakkey = await fetchJson(`https://api.lolhuman.xyz/api/zodiak/${q}?apikey=SGWN&query`)
const zodiaknya = `${zodiakkey.result}`
conn.sendMessage(from, { text: zodiaknya, footer: footer }, { quoted: fkontak })
break
case prefix+'pin': 
case prefix+'pinterest':
if(!q) return reply('Masukan Query')
reply(mess.wait) 
var pinkey = await fetchJson(`https://api.lolhuman.xyz/api/pinterest?apikey=SGWN&query=${q}`) 
conn.sendMessage(from, { image: { url: `${pinkey.result}` }, caption: `*pinterest:* ${q}` }, { quoted: fkontak })
break
case prefix+'ktpmaker':
if (!isOwner && !fromMe) return reply(mess.OnlyPrem)
if (!q.includes("|")) return reply(`contoh : ${command} 6285754202785|Kalimantan Selatan|Banjarmasin|Ainul|Banjarmasin 31 Januari 2008|Laki - Laki|Banua Anyar|RT 2/RW 1|Banua Anyar|Kalimantan Selatan|Atheis|Jomblo Dari Lahir|Main Hp|Indo Ori No Kw|Kiamat|https://telegra.ph/file/3823c46c582773cf9d7bb.jpg`) 
reply('Tunggu Sebentar Beb Lagi Di Buatin Nih KTP Buat Kamu') 
var ktpkey = await getBuffer(`https://api.lolhuman.xyz/api/ktpmaker?apikey=SGWN&nik=${q.split("|")[0]}&prov=${q.split("|")[1]}&kabu=${q.split("|")[2]}&name=${q.split("|")[3]}&ttl=${q.split("|")[4]}&jk=${q.split("|")[5]}&jl=${q.split("|")[6]}&rtrw=${q.split("|")[7]}&lurah=${q.split("|")[8]}&camat=${q.split("|")[9]}&agama=${q.split("|")[10]}&nikah=${q.split("|")[11]}&kerja=${q.split("|")[12]}&warga=${q.split("|")[13]}&until=${q.split("|")[14]}&img=${q.split("|")[15]}`) 
conn.sendMessage(from, { caption: `Nih Kak KTP Anda`, image: ktpkey }, { quoted: fkontak })
break
case prefix+'struktur':
if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(messAdmin)
if (!q.includes("|")) return reply(`Contoh : ${command} produk|ID|jumlah|username|refid|waktu`) 
var strukkey = await getBuffer(`https://api.lolhuman.xyz/api/creator/invoice?apikey=SGWN&produk=${q.split("|")[0]}&id=${q.split("|")[1]}&jumlah=${q.split("|")[2]}&username=${q.split("|")[3]}&refid=${q.split("|")[4]}&waktu=${q.split("|")[5]}`)
conn.sendMessage(from, { caption: `Orderan Selesai`, image: strukkey }, { quoted: fkontak })
break
case prefix+'nulis':
if (args.length < 2) return reply(`Mau Nulis Apa?`)
reply(mess.wait) 
var nuliskey = await getBuffer(`https://api.lolhuman.xyz/api/nulis?apikey=SGWN&text=${q}`) 
conn.sendMessage(from, { caption: `Lain Kali Jangan Malas Nulis`, image: nuliskey }, { quoted: fkontak })
break
case prefix+'tiktokaudio':
case prefix+'ttaudio':
if (args.length < 2) return reply(`Masukan urlnya`)
reply(mess.wait)
var tiktokaudiokey = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=SGWN&url=${q}`)
conn.sendMessage(from, { audio: tiktokaudiokey, mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break
case prefix+'tiktoknowm':
if (args.length < 2) return reply(`Masukan urlnya`)
reply(mess.wait)
var tiktoknowmkey = await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=SGWN&url=${q}`)
conn.sendMessage(from, { caption: `*Caption :* ${tiktoknowmkey.result.title}\n*Author :* ${tiktoknowmkey.result.author.nickname}`, video: { url: `${tiktoknowmkey.result.link}` } }, { quoted: fkontak })
break
case prefix+'attp':
if (args.length < 2) return reply(`Masukan Text`)
var attpkey = await getBuffer(`https://api.lolhuman.xyz/api/attp?apikey=SGWN&text=${q}`)
conn.sendMessage(from, { sticker: attpkey }, { quoted: fkontak })
break
case prefix+'ttp':
if (args.length < 2) return reply(`Masukan Text`)
var ttpkey = await getBuffer(`https://api.lolhuman.xyz/api/ttp?apikey=SGWN&text=${q}`)
conn.sendMessage(from, { sticker: ttpkey }, { quoted: fkontak })
break
case prefix+'tts':
if (!isOwner && !fromMe) return reply(mess.OnlyPrem)
if (args.length < 2) return reply(`Masukan Text`)
var ttskey = await getBuffer(`https://api.lolhuman.xyz/api/gtts/id?apikey=SGWN&text=${q}`) 
conn.sendMessage(from, { audio: ttskey, mimetype: 'audio/mp4', ptt: true }, { quoted: fkontak })
break
case prefix+'creatmeme':
if (!q.includes("|")) return reply(`Contoh : ${command} sama teman|sama ayank|sama keluarga`)
reply(mess.wait) 
var cmemekey = await getBuffer(`https://api.lolhuman.xyz/api/meme3?apikey=SGWN&text1=${q.split("|")[0]}&text2=${q.split("|")[1]}&text3=${q.split("|")[2]}`)
conn.sendMessage(from, { caption: 'Nih Kak', image: cmemekey }, { quoted: fkontak })
break
case prefix+'creatmeme2':
if (args.length < 2) return reply(`Masukan Text`)
reply(mess.wait) 
var cmemeekey = await getBuffer(`https://api.lolhuman.xyz/api/meme5?apikey=SGWN&text=${q}`) 
conn.sendMessage(from, { caption: 'Nih Kak', image: cmemeekey }, { quoted: fkontak })
break
case prefix+'creatmeme3':
if (!q.includes("|")) return reply(`Contoh : ${command} sama yang nyata|sama yang fiksi`)
reply(mess.wait) 
var cmemeeekey = await getBuffer(`https://api.lolhuman.xyz/api/meme8?apikey=SGWN&text1=${q.split("|")[0]}&text2=${q.split("|")[1]}`)
conn.sendMessage(from, { caption: 'Nih Kak', image: cmemeeekey }, { quoted: fkontak }) 
break
case prefix+'hackermaker':
if (args.length < 2) return reply(`Masukan Text`)
var hackkey = await getBuffer(`https://api.lolhuman.xyz/api/ephoto1/anonymhacker?apikey=SGWN&text=${q}`)
conn.sendMessage(from, { caption: 'Nih Kak', image: hackkey }, { quoted: fkontak })
break
case prefix+'nickff':
if (args.length < 2) return reply(`Masukan ID Game`)
var ffkey = await fetchJson(`https://api.lolhuman.xyz/api/freefire/${q}?apikey=SGWN`)
conn.sendMessage(from, { text: `Hasil Search ID FREE FIRE : ${q}\nNick : ${ffkey.result}`, footer: footer }, { quoted: fkontak })
break
case prefix+'nickml':	 
if (!q.includes("|")) return reply(`Contoh : ${command} 1234567|1234`)
var mlkey = await fetchJson(`https://api.lolhuman.xyz/api/mobilelegend/${q.split("|")[0]}/${q.split("|")[1]}?apikey=SGWN`)
conn.sendMessage(from, { text: `Hasil Search MOBILE LEGENDS : ${q.split("|")[0]} (${q.split("|")[1]})\nNick : ${mlkey.result}`, footer: footer }, { quoted: fkontak })
break
case prefix+'cekapi':
if (args.length < 2) return reply(`Masukan User Name LolHuman`)
var apikeynya = await fetchJson(`https://api.lolhuman.xyz/api/checkapikey?apikey=${q}`)
const hasilapikey = `• *ɴᴀᴍᴇ:* ${apikeynya.result.username}
• *ᴛᴏᴛᴀʟ ʜɪᴛ:* ${apikeynya.result.requests}
• *ʜɪᴛ ᴛᴏᴅᴀʏ:* ${apikeynya.result.today}
• *ᴀᴄᴄᴏᴜɴᴛ:* ${apikeynya.result.account_type}
• *ᴇxᴘɪʀᴇᴅ:* ${apikeynya.result.expired}`
conn.sendMessage(from, { text: hasilapikey, footer: footer }, { quoted: fkontak }) 
break
case prefix+'cekig':
if (args.length < 2) return reply(`Masukan User Name Instagram`)
var cekigkey = await fetchJson(`https://api.lolhuman.xyz/api/stalkig/${q}?apikey=SGWN`)
const hasilcekig = `*ɴᴀᴍᴇ:* ${cekigkey.result.username}
*ᴘᴏꜱᴛ:* ${cekigkey.result.posts}
*ꜰᴏʟʟᴏᴡᴇʀꜱ:* ${cekigkey.result.followers}
*ꜰᴏʟʟᴏᴡɪɴɢ:* ${cekigkey.result.following}
*ʙɪᴏ:* ${cekigkey.result.bio}`
reply(hasilcekig) 
break
case prefix+'cektiktok':
if (args.length < 2) return reply(`Masukan User Name TikTok`)
var cektiktokkey = await fetchJson(`https://api.lolhuman.xyz/api/stalktiktok/${q}?apikey=SGWN`) 
const hasilcektiktok = `*ᴜꜱᴇʀ ɴᴀᴍᴇ:* ${cektiktokkey.result.username}
*ɴɪᴄᴋ ɴᴀᴍᴇ:* ${cektiktokkey.result.nickname}
*ʙɪᴏ:* ${cektiktokkey.result.bio}
*ꜰᴏʟʟᴏᴡᴇʀꜱ:* ${cektiktokkey.result.followers}
*ꜰᴏʟʟᴏᴡɪɴɢ:*  ${cektiktokkey.result.followings}
*ʟɪᴋᴇ:* ${cektiktokkey.result.likes}
*ᴠɪᴅᴇᴏ:* ${cektiktokkey.result.video}`
reply(hasilcektiktok) 
break 
case prefix+'tourl':
case prefix+'upload':
if (isImage || isQuotedImage) {
reply(mess.wait)
let media = await downloadAndSaveMediaMessage('image', `./tmp/${sender}`)
let tph = await TelegraPh(media)
reply(tph)
} else if (isVideo || isQuotedVideo) {
reply(mess.wait)
let media = await downloadAndSaveMediaMessage('video', `./tmp/${jam}`)
let tph = await TelegraPh(media)
conn.sendMessage(from, { text: `*📮 LINK :*\n${tph}\n*📛 EXPIRED :* No Expiry Date` }, { quoted: fkontak })
} else {
reply(`Kirim/reply gambar/video dengan caption *${prefix+command}*`)
}
break
case prefix+'smeme':
if (!q.includes("|")) return reply(`Anda Bisa Kirim Foto Dengan Text : Tes|Doang`)
if (isImage || isQuotedImage) {
reply(mess.wait)
let mediameme = await downloadAndSaveMediaMessage('image', `./tmp/${sender}`)
let tph = await TelegraPh(mediameme)
var smemekey = await getBuffer(`https://api.lolhuman.xyz/api/stickermeme?apikey=SGWN&texttop=${q.split("|")[0]}&textbottom=${q.split("|")[1]}&img=${tph}`)
conn.sendMessage(from, { sticker: smemekey, packname : `Ainul Bot`, author: `By Ainul` }, { quoted: fkontak })
}
break
case prefix+'yta':
case prefix+'ytmp3':
if(!q) return reply('Masukan Link')
reply(mess.wait) 
var ytakey = await fetchJson(`https://api.lolhuman.xyz/api/ytaudio2?apikey=SGWN&url=${q}`)
conn.sendMessage(from, { caption : `*${ytakey.result.title}*\n\n*Size :* ${ytakey.result.size}`, image: { url: `${ytakey.result.thumbnail}` } }, { caption: msg }) 
conn.sendMessage(from, { audio: { url: `${ytakey.result.link}` }, mimetype: 'audio/mp4', ptt: false }, { quoted: fkontak })
break
case prefix+'ytv':
case prefix+'ytmp4':
if(!q) return reply('Masukan Link')
reply(mess.wait) 
var ytvkey = await fetchJson(`https://api.lolhuman.xyz/api/ytvideo2?apikey=SGWN&url=${q}`) 
conn.sendMessage(from, { caption: `*${ytvkey.result.title}*`, image: { url: `${ytvkey.result.thumbnail}` } }, { quoted: msg }) 
conn.sendMessage(from, { caption : 'Nih Video Nya', video: { url: `${ytvkey.result.link}` } }, { quoted: fkontak }) 
break
case prefix+'jadianime':
if (!isOwner && !fromMe) return reply(mess.OnlyPrem)
if (isImage || isQuotedImage) {
reply(mess.wait)
let mediajadi = await downloadAndSaveMediaMessage('image', `./tmp/${sender}`)
let tph = await TelegraPh(mediajadi)
var animekey = await getBuffer(`https://api.lolhuman.xyz/api/imagetoanime?apikey=SGWN&img=${tph}`) 
conn.sendMessage(from, { caption: 'Nih Kak', image: animekey }, { quoted: fkontak }) 
}
break
case prefix+'timeout': 
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
reply('Bot Akan Kirim Pesan 5 Detik')
setTimeout(() => {
reply('Oke 5 Detik')
}, 5000)
break
case prefix+'tqto':
case prefix+'thanksto':
const gambartqto = await getBuffer(`https://telegra.ph/file/0e15a17b163babdceb831.jpg`) 
const texttqto = `*BIG THANKS TO*
*========================*
Thanks To
• Arif
wa.me/62895347198105
• Cahyo
wa.me/6282138188516
• Christian ID
wa.me/6285921165857
`
conn.sendMessage(from, { caption: texttqto, image: gambartqto }, { quoted: fkontak }) 
break
case prefix+'send':
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Contoh : ${prefix+command} 6285754202785|Halo Owner`)
let [nmr, psn] = q.split("|")
if (!nmr) return reply(`Masukan Nomor\n\nContoh : ${prefix+command} 6285754202785|Halo Owner`)
if (!psn) return reply(`Masukan Pesan\n\nContoh : ${prefix+command} 6285754202785|Halo Owner`)
conn.sendMessage(nmr + '@s.whatsapp.net', { text: psn }, { quoted: null })
reply(`Sukses Send Pesan Ke Nomor ${nmr}`)
break
case prefix+'menfess':
if (!q) return reply(`Contoh : ${prefix+command} 6285754202785|Halo Owner`)
let [nmmr, pssn] = q.split("|")
if (!nmmr) return reply(`Masukan Nomor\n\nContoh : ${prefix+command} 6285754202785|Halo Owner`)
if (!pssn) return reply(`Masukan Pesan\n\nContoh : ${prefix+command} 6285754202785|Halo Owner`)
var gambarmen = await getBuffer(`https://telegra.ph/file/ae7be9b1d954dd9829ec8.jpg`) 
var butt = [{buttonId: `${prefix}menu`, buttonText: { displayText: `MENU BOT` }, type: 1}]
conn.sendMessage(nmmr + '@s.whatsapp.net', { caption: `Hai Saya Bot WhatsApp, Ada Pesan Dari Seseorang Nih Buat Kamu\n\n--------------------------->\n\n💌 Pesan : ${pssn}\n\n--------------------------->`, image: gambarmen, buttons: butt,  footer: 'PENGIRIM RAHASIA\nAnda Ingin Mengirim Pesan Ke Pacar/Sahabat/Teman/Mangan?\nTapi Tidak Ingin Tahu Siapa Pengirimnya?\nKamu Bisa Menggunakan Bot Ini\nContoh : .menfess nomor|pesan\n\nContoh : .menfess 62xxxxxxxxxxx|halooo'}, { quoted: null })
reply(`Sukses Mengirim Pesan Ke Nomor ${nmmr}\n\n💌 Isi Pesan : ${pssn}`)
break
case prefix+'translate':
case prefix+'tr':
if (!q) return reply(`Masukan Text Berbahasa Inggris`)
var trkey = await fetchJson(`https://api.lolhuman.xyz/api/translate/auto/id?apikey=SGWN&text=${q}`)
const trhasil = `*From* : ${trkey.result.from}
*To* : ${trkey.result.to}
*Original* : ${trkey.result.original}
*translated* : ${trkey.result.original}`
conn.sendMessage(from, { text: trhasil }, { quoted: fkontak }) 
break
case prefix+'translate2':
case prefix+'tr2':
if (!q) return reply(`Masukan Text Berbahasa Indonesia`)
var trkeyy = await fetchJson(`https://api.lolhuman.xyz/api/translate/auto/en?apikey=SGWN&text=${q}`)
const trhasill = `*From* : ${trkey.result.from}
*To* : ${trkeyy.result.to}
*Original* : ${trkeyy.result.original}
*translated* : ${trkeyy.result.original}`
conn.sendMessage(from, { text: trhasill }, { quoted: fkontak }) 
break
case prefix+'qc':
if (!isOwner && !fromMe) return reply(mess.OnlyPrem)
if (!q.includes("|")) return reply(`Contoh : .qc https://telegra.ph/file/906e9b761c9f92fed2de6.jpg|ada ada saja`) 
reply(mess.wait)
var qckey = await getBuffer(`https://api.lolhuman.xyz/api/bubblechat?apikey=SGWN&avatar=${q.split("|")[0]}&name=${q.split("|")[1]}&text=${q.split("|")[2]}`) 
conn.sendMessage(from, { caption: 'Nih Kak', image: qckey }, { quoted: fkontak }) 
break
			default:
			if (!isGroup && isCmd) {
				reply(`Command belum tersedia, coba beberapa hari kedepan yaa! _^`)
			}
		}
	} catch (err) {
		console.log(color('[ERROR]', 'red'), err)
	}
}
