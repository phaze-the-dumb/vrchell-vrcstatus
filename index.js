const https = require('https');
const { Client } = require('node-osc');

let data = { now_playing: { song: { text: '' } } };
let client = new Client('127.0.0.1', 9000);

setInterval(() => {
    https.get('https://azura.phazed.xyz/api/nowplaying/1', ( res ) => {
        let d = '';
        res.on('data', ( chunk ) => d += chunk.toString());
    
        res.on('end', () => {
            d = JSON.parse(d);

            if(data.now_playing.song.text !== d.now_playing.song.text)
                console.log('Song Change: '+d.now_playing.song.text);

            data = d;
        })
    })
}, 1500);

setInterval(() => {
    client.send('/chatbox/input', [ '♫ ' + data.now_playing.song.text, true ], () => {});
}, 10000);