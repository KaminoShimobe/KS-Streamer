const Discord = require("discord.js");
const TwitchBot = require('twitch-bot');
const mysql = require("mysql");
const prefix = "&";
const collect = new Set();

const Bot = new TwitchBot({
  username: 'KS_Streamer',
  oauth: process.env.TWITCH,
  channels: ['Kamino_Shimobe']
})

Bot.on('join', channel => {
  console.log(`Joined channel: ${channel}`)
  });
  
  Bot.on('part', channel => {
  console.log(`Bot left ${channel}`);
})

Bot.on('error', err => {
  console.log(err)
})

Bot.on('message', chatter => {
  if(chatter.message === '!help' || chatter.message.indexOf("help") != -1 || chatter.message.indexOf("Help") != -1) {
    Bot.say('Commands: !help \n !discord \n !dice');
   
  }	
	
  if(chatter.message === '!discord' || chatter.message.indexOf("discord") != -1 || chatter.message.indexOf("Discord") != -1 || chatter.message.indexOf("Discord?") != -1 || chatter.message.indexOf("discord?") != -1) {
    Bot.say('Join our ranch! We got da horses in da back! https://discord.gg/khQuZ62')
  }

  if(chatter.message === '!dice') {
	  var die1 = Math.floor(Math.random() * 6) + 1;
	  var die2 = Math.floor(Math.random() * 6) + 1;
    Bot.say('You rolled a ' + die1 + ' and  a ' + die2 + '!');
  }		
//   if(chatter.message === '!spotify' || chatter.message.indexOf("spotify") != -1 || chatter.message.indexOf("Spotify") != -1 || chatter.message.indexOf("Spotify?") != -1 || chatter.message.indexOf("spotify?") != -1) {
//     Bot.say('Join our ranch! We got da horses in da back! https://discord.gg/khQuZ62')
//   }

if(chatter.username === 'Kamino_Shimobe' || chatter.display_name === 'Kamino_Shimobe' || chatter.username === 'psytician' || chatter.display_name === 'Psytician' || chatter.username === 'falsevibrato8' || chatter.display_name === 'falsevibrato8'){
  if(chatter.message === '!toggle'){
		con.query(`SELECT * FROM spotify WHERE id = 'steelBarnBot'`, (err, rows) => {
		if(err) throw err;
		let sql;

		let accept = rows[0].accept;

		if(rows.length < 1) {
			sql = `INSERT INTO spotify (accept) VALUES (${true})`;
			con.query(sql, console.log);
			Bot.say(`Accepting spotify requests!`);
			return;
		} else {
			if(accept == true){
				sql = `UPDATE spotify SET accept = ${false} WHERE id = 'steelBarnBot'`;
				con.query(sql, console.log);
				Bot.say(`Not accepting spotify requests!`);
			} else if(accept == false){
				sql = `UPDATE spotify SET accept = ${true} WHERE id = 'steelBarnBot'`;
				con.query(sql, console.log);
				Bot.say(`Accepting spotify requests!`);
			}

		}


		});	
	}
}

let twitchArray = chatter.message.split(" ");


  
})


const bot = new Discord.Client({disableEveryone: true})

var con_fig = {
	host: "us-cdbr-iron-east-02.cleardb.net",
	user: "ba70974f187526",
	password: process.env.MY_SQL,
	database: "heroku_2433a99852a1991",
	port: 3306
};

var con;

function handleDisconnect() {
con = mysql.createConnection(con_fig);
con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  }); 	

process.on('uncaughtException', function (err) {
    console.log(err);
	
}); 
	


con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
       throw err;                                 // server variable configures this)
    }
});
       }
handleDisconnect();

bot.on("ready", async () => {

	console.log(`${bot.user.username} is ready!`);
	
	bot.user.setPresence({ status: 'online', game: { name: '&help' } });

	

	try {

		let link = await bot.generateInvite(["ADMINISTRATOR"]);

		console.log(link);

	}	catch(e) {

		console.log(e.stack);

	}
//


});

bot.on("message", async message => {
	
	let messageArray = message.content.split(" ");

	let command = messageArray[0];

	let args = messageArray.slice(1);

});	

bot.login(process.env.BOT_TOKEN);
