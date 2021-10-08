/*
Copyright (C) 2021 Queen Amdi.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Queen Amdi - Black Amda
මේක copy කරන උබේ අම්මා වේස බඩුවක්. මකබැවියන් copy ගහන හුට්ටිගේ පුතා.
මේක උස්සන් ගියොත් උබ රෙනකොට වැටිච්ච අවජාතකයෙක් - COnfirmed!!
*/

//Basic requirements
const Amdi = require('../events');
const QueenAmdi = require('queenamdi-public-1');
const {MessageType} = require('@adiwajshing/baileys');
const axios = require('axios');

// Config Checker
const Config = require('../config');

// Strings
const Language = require('../language');
const Lang = Language.getString('tiktok');
let LOL = Config.WORKTYPE == 'public' ? false : true


Amdi.applyCMD({ pattern: 'tiktok ?(.*)', fromMe: LOL, desc: Lang.TIKTOK_DESC,  deleteCommand: false}, (async (message, match) => {
    
    const tkurl = match[1]
    
      if (!tkurl) return await message.client.sendMessage(message.jid,Lang.NEED_WORD, {quoted: message.data});

      var apikey = await QueenAmdi.api()
    
        await axios
          .get('https://api.lolhuman.xyz/api/tiktok3?apikey=' + apikey.key + `&url=${tkurl}`)
          .then(async (response) => {
              const {
                result,
                status,
              } = response.data
    
              var downloading = await message.client.sendMessage(message.jid,Lang.DLOAD_TK,MessageType.text, {quoted: message.data});
              const profileBuffer = await axios.get(result, {responseType: 'arraybuffer'})
    
              const msg = `${status}`
    
        if (msg === '500') { await message.client.sendMessage(message.jid,Lang.INVALID_TK,MessageType.text, {quoted: message.data})}
              
        if (msg === '200') {
          var uploading = await message.client.sendMessage(message.jid,Lang.UPLOADING_TK,MessageType.text, {quoted: message.data});
          await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true});
          await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {caption: Config.CAP, quoted: message.data, thumbnail: thumb })
          return await message.client.deleteMessage(message.jid, {id: uploading.key.id, remoteJid: message.jid, fromMe: true})
          }})
          .catch(
            async (err) => await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {quoted: message.data}),
          )
}))

const thumb = "iVBORw0KGgoAAAANSUhEUgAAAjwAAAI8CAYAAAD1D3GaAAAAAXNSR0IArs4c6QAAIABJREFUeF7t3QusLVddP/C5rSZqpIVq1IgBWojPSFuM79iXRGPUPoiKT/rwAQbhthAjmAht1YBGLS0+UbltSRQ1WlpfMSilVaPGhNIaHyikreIjGukDjImS239+O677nzN3Zs/M3jN771nrs5Ob294ze2atz2+dM9+zZs3sY1VVPVV5ESBAgAABAgQyFjgm8GRcXV0jQIAAAQIEVgICj4FAgAABAgQIZC8g8GRfYh0kQIAAAQIEBB5jgAABAgQIEMheQODJvsQ6SIAAAQIECAg8xgABAgQIECCQvYDAk32JdZAAAQIECBAQeIwBAgQIECBAIHsBgSf7EusgAQIECBAgIPAYAwQIECBAgED2AgJP9iXWQQIECBAgQEDgMQYIECBAgACB7AUEnuxLrIMECBAgQICAwGMMECBAgAABAtkLCDzZl1gHCRAgQIAAAYHHGCBAgAABAgSyFxB4si+xDhIgQIAAAQICjzFAgAABAgQIZC8g8GRfYh0kQIAAAQIEBB5jgAABAgQIEMheQODJvsQ6SIAAAQIECAg8xgABAgQIECCQvYDAk32JdZAAAQIECBAQeIwBAgQIECBAIHsBgSf7EusgAQIECBAgIPAYAwQIECBAgED2AgJP9iXWQQIECBAgQEDgMQYIECBAgACB7AUEnuxLrIMECBAgQICAwGMMECBAgAABAtkLCDzZl1gHCRAgQIAAAYHHGCBAgAABAgSyFxB4si+xDhIgQIAAAQICjzFAgAABAgQIZC8g8GRfYh0kQIAAAQIEBB5jgAABAgQIEMheQODJvsQ6SIAAAQIECAg8xgABAgQIECCQvYDAk32JdZAAAQIECBAQeIwBAgQIECBAIHsBgSf7EusgAQIECBAgIPAYAwQIECBAgED2AgJP9iXWQQIECBAgQEDgMQYIECBAgACB7AUEnuxLrIMECBAgQICAwGMMECBAgAABAtkLCDzZl1gHCRAgQIAAAYHHGCBAgAABAgSyFxB4si+xDhIgQIAAAQICjzFAgAABAgQIZC8g8GRfYh0kQIAAAQIEBB5jgAABAgQIEMheQODJvsQ6SIAAAQIECAg8xgABAgQIECCQvYDAk32JdZAAAQIECBAQeIwBAgQIECBAIHsBgSf7EusgAQIECBAgIPAYAwQIECBAgED2AgJP9iXWQQIECBAgQEDgMQYIECBAgACB7AUEnuxLrIMECBAgQICAwGMMECBAgAABAtkLCDzZl1gHCRAgQIAAAYHHGCBAgAABAgSyFxB4si+xDhIgQIAAAQICjzFAgAABAgQIZC8g8GRfYh0kQIAAAQIEBB5jgAABAgQIEMheQODJvsQ6SIAAAQIECAg8xgABAgQIECCQvYDAk32JdZAAAQIECBAQeIwBAgQIECBAIHsBgSf7EusgAQIECBAgIPAYAwQIECBAgED2AgJP9iXWQQIECBAgQEDgMQYIECBAgACB7AUEnuxLrIMECBAgQICAwGMMECBAgAABAtkLCDzZl1gHCRAgQIAAAYHHGCBAgAABAgSyFxB4si+xDhIgQIAAAQICjzFAgAABAgQIZC8g8GRfYh0kQIAAAQIEBB5jgAABAgQIEMheQODJvsQ6SIAAAQIECAg8xgABAgQIECCQvYDAk32JdZAAAQIECBAQeIwBAgQIECBAIHsBgSf7EusgAQIECBAgIPAYAwQIECBAgED2AgJP9iXWQQIECBAgQEDgMQYIECBAgACB7AUEnuxLrIMECBAgQICAwGMMECBAgAABAtkLCDzZl1gHCRAgQIAAAYHHGCBAgAABAgSyFxB4si+xDhIgQIAAAQICjzFAgAABAgQIZC8g8GRfYh0kQIAAAQIEBB5jgAABAgQIEMheQODJvsQ6SIAAAQIECAg8xgABAgQIECCQvYDAk32JdZAAAQIECBAQeIwBAgQIECBAIHsBgSf7EusgAQIECBAgIPAYAwQIECBAgED2AgJP9iXWQQIECBAgQEDgMQYIECBAgACB7AUEnuxLrIMECBAgQICAwGMMECBAgAABAtkLCDzZl1gHCRAgQIAAAYHHGCBAgAABAgSyFxB4si+xDhIgQIAAAQICjzFAgAABAgQIZC8g8GRfYh0kQIAAAQIEBB5jgAABAgQIEMheQODJvsQ6SIAAAQIECAg8xgABAgQIECCQvYDAk32JdZAAAQIECBAQeIwBAgQIECBAIHsBgSf7EusgAQIECBAgIPAYAwQIECBAgED2AgJP9iXWQQIECBAgQEDgMQYIECBAgACB7AUEnuxLrIMECBAgQICAwGMMECBAgAABAtkLCDzZl1gHCRAgQIAAAYHHGCBAgAABAgSyFxB4si+xDhIgQIAAAQICjzFAgAABAgQIZC8g8GRfYh0kQIAAAQIEBB5jgAABAgQIEMheQODJvsQ6SIAAAQIECAg8xgABAgQIECCQvYDAk32JdZAAAQIECBAQeIwBAgMFjh07Vj311FMDt27fbIp9bNUAbyZAgEChAgJPoYXX7WECAsowp6m24j2VpP0QINAUEHiMCQIzCziJnw7MZOZBZ/cECJwmIPAYFAR2INA8wZd8wr/mmmuqq6++ulP9hhtuqN773vfuoCoOQYBASQICT0nV1lcCByBw4403Vq9//es7W3LZZZdV9957b1VyKDyAMmkCgewEBJ7sSqpDUwi8+93vXu1myCLlthNzvC/+ve/14IMPVtdff33fZll9/TnPeU4Vf9Irwk39demll1bJP6uO6wwBAnsVEHj2yu/ghyRQDy4RWFLYGRJcNu3HfffdV11yySWn3l7irEYzVAo8m44m7yNAYJ2AwGN8EGgRqJ+EYxbmrrvuqs4444zWGZ/m5ZkIMWnWoi0sxYzO2WefvTpqM/CUWAyBp8Sq6zOB3QsIPLs3d8QFCKST8KOPPlpdcMEF1eOPP97Z6uYJ+6abbqpinUp6NWdtrrzyylWA6go8XbM8m87+bPq+XZWp6RczXhEE9/E6dKswWUIb91E7xyTQJyDw9An5elEC6WSSTsJdMzDNy191pGbgaQLGCT3NAG0zw5PLiW8pMzx1767/3uU3Sy7136WZY5UtIPCUXX+97xDoCzz1t/XN8EwZeMac5NK2Y95Tb+um7xs7qDYJPLtq29i+dG2/tPZO1W/7IXBIAgLPIVVDW3Yu0HUiOtTAs48T6twn6zGBZ+62DB2AY9sxZvtDmD0a6mA7AksSEHiWVC1t3ZnAIQSeWOtz/vnnn7qLK9YSPf3pT189lC/WFL3jHe+o7r777uqRRx7pdImTZyyq7rq9/vbbb69inVK8YiF1LKiOS25xnPgT+45bxOPvO+64Yxb/vsATt7AfP358tZYq2njhhReealO0bdN2Rf+uuOKKVX/TrfLxd/JN+17nG++NP/U+1ANLXN5Mr9ju4osvPvX/4R7+617RnnhPjIVob2rnmDEwS9HslMACBQSeBRZNk+cXSM+BiTu04mS77jX2klacuN/0pjetdhknrvpzeNLJPZ5GHCe4Ia9rr7127Ylz3bOE0kP+4snH0abmMevPE4q2xrGmfgpyegRAuqMtLVqOttxyyy1VWKx7RY3iPesWlqf3xzEiNEVNw32IcQTL6Hfb/vseopj6FH04ceLEkW6sW781tO9phxH6oj9DDIaMKdsQyFFA4Mmxqvq0E4HmAud00L5Fy0PD05NPPrk6SUbAiFmGOAlGWEozP/X9XHXVVasZn7ZX/Y6x5i308cybCAD190aAiOCVbp1v7rMvYI3Fb5vhiT7Hwu7ob3pFQKjPkNSPEzNd4dL3in7FHXL1/Ua9ov9xzGQc4S9m19IrvhZWzUCRZnhiu2c/+9mnhbMYI21hJ7bvCjxTt7HPxNcJlCIg8JRSaf2cTWDsDM/QwNN1QowgEl+rn5DjRPyMZzyjt4/NtkZQilAVl1dihqD+hOM029T2JOi4rDTVTE9b4EmBI4JMBLb6sSLYxKWgFMjSLFRXm1IwjTAT/au7rQtvEYLikld6xXsj9HS90t139Vmx2L75JOl6gKs/dDL+Pdr4wAMPHHkSdVcbY9twGNPG3gFiAwIZCwg8GRdX13YjsOvAE72qP8sn9XJICGm2NU7iEZTqMx5Ntfplm3Qyv+eee46caLeRbrYpzeSsCyPR3ggG9Vdc1ll3+StCVP3yZN/2bcdYN5NWf9xAfWbovPPOWx03Zunq63sipDZDYwSY+ger3nnnnad90Gp9H23H9KTqbUaj9+YsIPDkXF1924nArgNP16W0IZea2tbznHvuuWsXPgdinKzjkk39FTMMTzzxxNbG9TalQDWkLxEWmpedIvS1vWK26uGHHz7ypSHBIB0jtastgKSdtoWPuCwZl+GGzIa1tXFIiG069AW5rQtmBwQWKiDwLLRwmn04AlMGnvolpeaC5maP4zLUs571rFP/PGTtULOtQ9e+pHUo9cs162Y7xlRnSJvabutuWzCcFgmvm6WKr8UxzzzzzN4Ph23OuETwixmbtuDYFniGBLfU1uYMVITJIYuqY8zU1zZt8zDLMXWzLYGlCQg8S6uY9h6cwJSBZ0znmie6TQLP0NDSNvsQgaN+2/WYtte37bstvWu/bQGjK/A0re6///7OBdD1440JVW3t6fr8tbY+1WdqwiTa2Fzj0/a+MW3ctEbeRyAHAYEnhyrqw14FDiHwRBtuvvnmI5/h1YayabhIsyL1fU41k7Bpm9oCRtflua5ZpBSQum7dHxMmxgSwIbW59dZbjzyyoGuQj2njXr9RHJzAngUEnj0XwOGXL3AIgScUI/DUbztvuww0JFx0fSRFc63IIQaernU5zX7Hpal1DxRMozICVHPtUgpJTd9tAk/bDNrQNqaHEda/k7pmupb/3aYHBDYXEHg2t/NOAiuBKQNP/RbquN04TrbpVui+yxtD1ouMCTzN8sbt1fU29N2mPXR4DGlT277aAkbbJ6233W01tG3N7eIZRV13tG0TeOrvra+TGtrO+numCqJDj207AksREHiWUintPFiBKQNP/LYei1frz1ZJHY+TbXrwXYSNWEhcn30YctfR0HDRNjs01+LYoW1qDoB1t2T33boddzL1faxDM3jE/8dC4q47rqYKPKmffW2sty/6e/LkydVt7223ux/sN4+GEdihgMCzQ2yHylNgqsATz19pnoTjt/UIQBE2UthJJ/NmAGmb3WiKbxou2mayht7h1Vf1Tds09Bk0cafTY489dqQZQxZ497V7iktaaR9ts1DbtnHMB5b29dXXCeQgIPDkUEV92KvANoEnnZTaLmn03QUVgeeiiy5a/VYfr21nePpOkNv0c12B5g48bWFt3fN0mm3tc0nbbzPD09ZGz9PZ67e1g2coIPBkWFRd2o3AmM/S6jtp1p/3EgHgoYceWvv04+hhc4Zn28CzTq3tZD70lva+auwi8DQXXMeC4FiQPOVr28DTfLhjtLnrQYr1dveNrSn7aF8Eliwg8Cy5etp+EAJTzHw0T3ZDfrvfZeCJu7/qH0Ia8PGRFFN8OvcuAk/zoX7R/ghscVmu65b0dYOrLWRsG3iaDzkcOmt3EN8EGkFgAQICzwKKpImHLTBF4GnuIz64Mk7I617NkDTnDE98LEMsqE6vIYFsaNV2EXi6Pueq7RPQh7a7ud22gaerjUNmecz4bFo17ytJQOApqdr6OovAHIGn63JGmllom7GYK/Ckj5Wo4w35/K2h2LsIPNGW5oxY/FsEy7idf8hMVQS+dc/u2TbwdLUxZn7iE+uHfG5ZXxuH1sR2BHIUEHhyrKo+7VRgisDTdjK+4YYbVndoNS+fxMkv/sTJt/4ZSnMEnjiBxqeS1z/TKbVrKuRdBZ7oSwTJs88++0jTwzEu18WsVdsrAl98PdoZsy1d4WjTwFOvb9ytFXfmnXXWWaPbmB46GfuIcGRtz1Qj1H5yERB4cqmkfswmUD9xxIm//gnd8bV4IF/9Fb+Rp9vLhz4X5corr6zuuuuu0/oQMxARhuJEHSeyCDpx4o7QEX8fP3781Huuu+666sSJE2sdmuGi/rDC5gkyjhdtmutSVmrorgJPHC9CSfSp60M56x/emrZP7YwQEe+f+jk8Tfd4PEF8rEQzmKV29LUx6jbkKdKzfcPYMYEDFRB4DrQwmnWYAm2/xfe1dOiTb9sWrbbtO62fSZ+h1PZk3q6PFmhboBsn8PpzfuKYEcCaTxTe9rkw9b4MXSjc1o+22bB6eKrfph/2zWNFv2Kxcv2T5vtq+I//+I+rh0E2w07b51h17WuMX7Qxwm7zYy3WtfPRRx9d1a0rkPX10dcJ5C4g8OReYf2bVGDOwBMNTZdP0omuHmbihBYzPHEiTNs2Z3TS9kMDT+xz3Uk1ZjUiHMTlkilnDaYOPG2hr+8SX1iHZ33GrjlYwieCaFxabLuUNVfgSe0Y08bmXXSTDnw7I5CBgMCTQRF1IT+B+A0//qRFqPFb+xS/ubddPkqXy+J46VJPmvGZ4piHXp3oc5rNikCbPpqh6yMa+tbG9H19E4/UxvR3alvcPRehzIsAgX4BgaffyBYEdi6QTprNv7dtyNj1MmmmaOiMzLbt63r/VCGibz99X5+rf2m/+z7+3P2zfwL7FBB49qnv2AR2LDA28Oy4eYMPd8jB4JDbNhjYhgQyFBB4MiyqLhHoEsgl8BxihXcVdHZ1nEM01iYC2wgIPNvoeS+BmQTmOqn1BZ65jjsT06jdHnLfDrlto5BtTOCABQSeAy6OphHoEtj0BNkXeIaIb3rsIfte0jYcllQtbSVQVQKPUUAgc4G44yoFnbgLqf6Ku7DS7dbxMMMS7srKvNy6R4BAh4DAY2gQyFxg6B1Wfc+tyZxJ9wgQyFxA4Mm8wLpHIM3qpODT9VDC+mwPNQIECOQmIPDkVlH9IUCAAAECBE4TEHgMCgIEfLK2MUCAQPYCAk/2JdZBAgQIECBAQOAxBggQIECAAIHsBQSe7EusgwQIECBAgIDAYwwQIECAAAEC2QsIPNmXWAcJECBAgAABgccYIECAAAECBLIXEHiyL7EOEiBAgAABAgKPMUCAAAECBAhkLyDwZF9iHSRAgAABAgQEHmOAAAECBAgQyF5A4Mm+xDpIgAABAgQICDzGAAECBAgQIJC9gMCTfYl1kAABAgQIEBB4jAECBAgQIEAgewGBJ/sS6yABAgQIECAg8BgDBAgQIECAQPYCAk/2JdZBAgQIECBAQOAxBggQIECAAIHsBQSe7EusgwQIECBAgIDAYwwQIECAAAEC2QsIPNmXWAcJECBAgAABgccYIECAAAECBLIXEHiyL7EOEiBAgAABAgKPMUCAAAECBAhkLyDwZF9iHSRAgAABAgQEHmOAAAECBAgQyF5A4Mm+xDpIgAABAgQICDzGAAECBAgQIJC9gMCTfYl1kAABAgQIEBB4jAECBAgQIEAgewGBJ/sS6yABAgQIECAg8BgDBAgQIECAQPYCAk/2JdZBAgQIECBAQOAxBggQIECAAIHsBQSe7EusgwQIECBAgIDAYwwQIECAAAEC2QsIPNmXWAcJECBAgAABgccYIECAAAECBLIXEHiyL7EOEiBAgAABAgKPMUCAAAECBAhkLyDwZF9iHSRAgAABAgQEHmOAAAECBAgQyF5A4Mm+xDpIgAABAgQICDzGAAECBAgQIJC9gMCTfYl1kAABAgQIEBB4jAECBAgQIEAgewGBJ/sS6yABAgQIECAg8BgDBAgQIECAQPYCAk/2JdZBAgQIECBAQOAxBggQIECAAIHsBQSe7EusgwQIECBAgIDAYwwQmEHg2LFj1VNPPTXDnu1yyQLGxZKrp+1LFxB4ll5B7d+7wJCT2JBt9t4RDSBAgEDGAgJPxsXVtcMREHgOpxZLaYkxs5RKaedSBASepVRKOxcjsM2J6id+4ieqV7/61af19bHHHqs+9KEPVeecc85BO6TLeIfezn0hvuxlL6t+4Rd+YaPDbzOuNjqgNxHITEDgyaygunN4Ak972tOqJ598cuOGRYiIk51X/gJnnXVW9eEPfzj/juohgT0ICDx7QHfIcgS2DTvlSOlpCrYxZj7ykY8AIUBgYgGBZ2JQuytbYMidWVPM2Eyxj7krtYQ2zm0wxf7N7k2haB8EqkrgMQoIbCkwJOSsO8QmwWCT92zZTW+fWaCvph/4wAeq5z3veTO3wu4J5Csg8ORbWz2bUWDbkDNj0+y6IAGzPwUVW1e3FhB4tia0gxIFBJ4Sq354fRZ4Dq8mWnS4AgLP4dZGyw5M4MSJE9U111yzalXf5YcDa7rmZC5QDz7pv4XyzIuue6MFBJ7RZN5QmoATR2kVX25/x8z4eK7Pcuus5ZsJCDybuXlXAQLphCDwFFDsTLp4++23V9dee20mvdENAtMKCDzTetpbZgLCTmYFLaA77uYqoMi6uJGAwLMRmzflLiDo5F7hMvo35hJXGSJ6WbKAwFNy9fW9VUDYMTByEhB6cqqmvmwjIPBso+e9WQjUF28KO1mUVCcaAin0WKhsaJQsIPCUXP3C+t72w17YKWwQFNzd5q3rwn3Bg6HQrgs8hRa+9G43w48f/qWPiDL67/JWGXXWy3YBgcfIyF6gbxpf2Ml+COhgTcDlLcOhVAGBp9TK6/dKQNgxEEoRqD8d3ExPKVXXz7qAwGM8FCsg7BRbeh2vqkroMQxKExB4Squ4/prZMQYI/J+A0GMolCQg8JRUbX0VdowBAi3reaAQKEFA4CmhyoX30a3nhQ8A3e8U8NlbBkdJAgJPSdXW11OLlOsLOLEQKF3Apa3SR0AZ/Rd4yqizXlZVdfLkSQs1jQQCLQIvfelLq7e85S1sCGQtIPBkXV6dqwsIPMYDgW4BszxGR+4CAk/uFdY/z9oxBggMEBB4BiDZZNECAs+iy6fxfQLxQzxmdpova3j65Hy9VAHBp9TK599vgSf/Ghffw64HDAo9xQ8NAP/3tPHmB4uCIZCjgMCTY1X16ZSApykbDASGCfjoiWFOtlqugMCz3Npp+QABgWcAkk0INGZ6XNYyJHIUEHhyrKo+rQSEHQOBwDiBNMsj8Ixzs/UyBASeZdRJKwcKeKryQCibEVgj0BZ46t9b8AgsUUDgWWLVtLlX4IILLqgeeOCB3u1sQIBAu4BZHiMjNwGBJ7eK6o/LWcYAgQkEBJ4JEO3ioAQEnoMqh8ZMIWDtzhSK9kGg8lEsBkFWAgJPVuXUmRAQeIwDAtMIxKXhBx98cJqd2QuBPQsIPHsugMNPLyDwTG9qj+UKdF3asoi53DGx1J4LPEutnHa3Crz//e+vnvvc59IhQGAiAWt5JoK0m70LCDx7L4EGTClgdmdKTfsiYB2PMZCPgMCTTy31xPodY4DALAJmeWZhtdMdCwg8OwZ3uHkFzPDM62vvZQoIPGXWPbdeCzy5VbTg/rz4xS+u3v72t6/u0vIDuuCBoOuTC/h+mpzUDvcgIPDsAd0hpxcwszO9qT0SSAICj7GQg4DAk0MV9cGzd4wBAjMKCDwz4tr1zgQEnp1RO9CcAmZ45tS179IFBJ7SR0Ae/Rd48qhj8b0QeIofAgBmFBB4ZsS1650JCDw7o3agOQUEnjl17bt0AYGn9BGQR/8FnjzqWHwvBJ7ihwCAGQUEnhlx7XpnAgLPzqgdaE4BgWdOXfsuXUDgKX0E5NF/gSePOhbfC4Gn+CEAYEYBgWdGXLvemYDAszNqB5pTQOCZU9e+SxcQeEofAXn0X+DJo47F90LgKX4IAJhRQOCZEdeudyYg8OyM2oHmFBB45tS179IFBJ7SR0Ae/Rd48qhj8b0QeIofAgBmFBB4ZsS1650JCDw7o3agOQUEnjl17bt0AYGn9BGQR/8FnjzqWHwvBJ7ihwCAGQUEnhlx7XpnAgLPzqgdaE4BgWdOXfsuXUDgKX0E5NF/gSePOhbfC4Gn+CEAYEYBgWdGXLvemYDAszNqB5pTQOCZU9e+SxcQeEofAXn0X+DJo47F9yICT/zxg7n4oQBgBgHfVzOg2uXOBQSenZM74FwCr3jFK6rbbrttrt3bL4FiBQSeYkufVccFnqzKWWZn4odxuqRV/9sP6TLHg15PL+B7aXpTe9y9gMCze3NHnFGgvpbHJa4Zoe26GAFhp5hSZ99RgSf7EpfVQYuXy6q33s4vUA889dnU+Y/sCASmFRB4pvW0tz0LCDx7LoDDL0pgyCyowLOokmrsGgGBx/DISkDgyaqcOnMAAi5pHUARNGESAYFnEkY7OSQBoeeQqqEtSxcQeJZeQe1PAgKPsZCdgMCTXUl1aE8Cws6e4B12FgGBZxZWO92ngMCzT33HzkXA2p1cKqkfZniMgawFnvnMZ1Yf/OAHs+6jzhGYSqC5eDn+/4wzzphq9/ZD4CAEzPAcRBk0Yg4BMz1zqNpnjgJtd2u5nJVjpcvuk8BTdv2z7r3Ak3V5dW4Cga7b0h955JHq3HPPneAIdkHgcAQEnsOphZZsILDuQWgCzwag3kKgqnwIr1GQpYDAk2VZdSoJCD3GAoHxAi5njTfzjsMXEHgOv0ZaOFKg7cNER+7C5gSKFRB2ii199h0XeLIvcf4drAec5iWuM888s/roRz+aP4IeEphIQOCZCNJuDk5A4Dm4kmjQ1AIua00tan85C0Tg8SGhOVe43L4JPOXWvqiexw/wkydPFtVnnSXQJdB2d1Y8d8cvB8ZMzgICT87V1bcjAn6YGxAE2gXuu+++6pJLLsFDIGsBgSfr8upcXUDgMR4ItAu4jGVklCAg8JRQZX08JRChp+tha5gIlCDQHP8WKZdQdX0MAYHHOChOwExPcSXX4Q6BtktZFiwbLrkKCDy5Vla/jgg0b123gNkAKU3A52WVVnH9bQoIPMZEkQJmeYose3GdXnf51qWs4oZD8R0WeIofAmUDCD5l17/U3gs7pVa+7H4LPGXXv/jeCzzFD4EsAfpmdqzTybLsOtUjIPAYIkULCDxFl7+4zpvZKa5ShLoYAAAgAElEQVTkOlwTEHgMBwJV5QmzRkH2AsJO9iXWQTM8xgCBYQJme4Y52eqwBdyNddj10br9CZjh2Z+9Ix+IQFrP8La3va369m//9gNplWYQmEbAzM40jvayfAGBZ/k11IOJBFLweeELX1i9853vnGivdkNgNwLrZnYsUt5NDRzlsAUEnsOuj9btUcAlrj3iO/QgAXdjDWKyEYGVgMBjIBBYIyD0GB5LFHAZa4lV0+a5BQSeuYXtf/ECQs/iS3jQHZj6w2yFnYMut8btUUDg2SO+Qy9L4BWveEV12223dTZ66hPXsnS0dhOBqcbMK1/5yurNb37zJk3wHgLFCAg8xZRaR6cSMOMzlaT9JIFNg4/ZHGOIwHABgWe4lS0JrAT6ZnowEdiVwLrA486sXVXBcZYiIPAspVLaeZACZnsOsixZN8qsTtbl1bkZBQSeGXHtujwBAai8mu+ix2NDjtmdXVTFMZYmIPAsrWLau3eBISeTN7zhDdVrXvOavbdVA5YpcPz48bUL5JfZK60msF8BgWe//o6eqUAKRWZ8Mi3wzN2K8TMkWM/cDLsnkJWAwJNVOXXm0AUEoEOv0G7b98Y3vrF67Wtfe+qgQs5u/R2tLAGBp6x66y0BAgQIEChSQOApsuw6TYAAAQIEyhIQeMqqt94eiIBLFwdSiANrhnFxYAXRnKwEBJ6syqkzBAgsSaAecISdJVVOW5coIPAssWraTIAAAQIECIwSEHhGcdmYAAECBAgQWKKAwLPEqmkzAQIECBAgMEpA4BnFZWMCBAgQIEBgiQICzxKrps0ECBAgQIDAKAGBZxSXjQkQIECAAIElCgg8S6yaNhMgQIAAAQKjBASeUVw2JkCAAAECBJYoIPAssWraTIAAAQIECIwSEHhGcdmYAAECBAgQWKKAwLPEqmkzAQIECBAgMEpA4BnFZWMCBAgQIEBgiQICzxKrps0ECBAgQIDAKAGBZxSXjQkQIECAAIElCgg8S6yaNhMgQIAAAQKjBASeUVw2JkCAAAECBJYoIPAssWraTIAAAQIECIwSEHhGcdmYAAECBAgQWKKAwLPEqmkzAQIECBAgMEpA4BnFZWMCBAgQIEBgiQICzxKrps0ECBAgQIDAKAGBZxSXjQkQIECAAIElCgg8S6yaNhMgQIAAAQKjBASeUVw2JkCAAAECBJYoIPAssWraTIAAAQIECIwSEHhGcdmYAAECBAgQWKKAwLPEqmkzAQIECBAgMEpA4BnFZWMCBAgQIEBgiQICzxKrps0ECBAgQIDAKAGBZxSXjQkQIECAAIElCgg8S6yaNhMgQIAAAQKjBASeUVw2JkCAAAECBJYoIPAssWraTIAAAQIECIwSEHhGcdmYAAECBAgQWKKAwLPEqmkzAQIECBAgMEpA4BnFZWMCBAgQIEBgiQICzxKrps0ECBAgQIDAKAGBZxSXjQkQIECAAIElCgg8S6yaNhMgQIAAAQKjBASeUVw2JkCAAAECBJYoIPAssWraTIAAAQIECIwSEHhGcdmYAAECBAgQWKKAwLPEqmkzAQIECBAgMEpA4BnFZWMCuxU4diy+Ravqqaee2u2BHY3AFgLG7RZ43jqbgMAzG60djxGIH5BO6mPEbEvgMAS6vnd9Tx9GfbTi/wsIPEYDAQIECBAgkL2AwJN9iZfRwdJ/G7zmmmuqq6++urNYd9xxR3X77bcvo5gLamXXuLvvvvuqkydPnupJ/RLNgw8+WF1//fUL6uW8Tb333ns7D/DQQw9Vx48fn7cB9k5goIDAMxDKZgTmFLjxxhur17/+9Z2HuOmmm6rYxmsegWbwqV9ejf9OgSeOHmHokksumachC9xr26XoZJasSv+FZoFlzbLJAk+WZdWppQk85znPqeJPejV/axZ4dlvReqBJs2/Nk/huW3S4RwurFGiaM5XC4eHWrcSWCTwlVl2fD16g+VuzwLO/kjVn35zEu2vBan/j1JH7BQSefiNb7Ejg1ltvrZ7//OefOlqJayXSb8oCz44GXcdh6pdgnMSH14LVcCtb7l5A4Nm9uSN2CLz73e+uLr744lNf7ftNemnrAsa09xACT2rvunaP6dNSB37OJ/Ep6iccLnVkl9dugae8mh9sj+uBJ074999//6jFoVP88D4UnE0Dz5TPRBnrOXb7Taz7jtH39U2OOXXgabZxmzZv895NLPreM7VV3/F8ncAYAYFnjJZtZxUYO8Mza2P2vPNNA8+czT60k+ucfa3v+xBO4kuZZTsEq12NC8dZnoDAs7yaZdviEgNP14lsysAzZVCZ68Q7VRun2s+2gWeOdizhG1/gWUKVym2jwFNu7XfW864f/nEbdv1he3FLa/3W7IcffriKB+61vWJ9TwSkvtcFF1xQXXHFFatLYxEiLr300urxxx+v3vve967e+o53vGP1XJX0/3372/brT3/606uLLrqoetGLXlQ9+9nPXvU39Tn6E22LNjUfMjj2Lq3YZ6yHin6nY8TfySz6G/8dfY9jtr3WPRco3aL96KOPbv1AxOY4aLYl2hiv+vqu+jbNNpx99tmrBwNG35/xjGdU559//qq+jzzySBW3+8eYeuKJJwaXcoqTePQxjcMYA6kmzXrcfffdg9tV3zD2GfuP8X7hhReuxnq6tT76HP2NcRX7T/UeG8rS91J8D9XrEa7xJ/oS/Yrv4/TqW4e3UWe9icCGAgLPhnDeNkxg3Q/V+MH5rne9a9iOGlv1BYD4YR8n7KEPiIsf1rHPISFqowZX1erBgfHU2Tg5db2aD7lL2/X1N20X+77llluOnHTWtTdOfnF3XNtDDfs+26xvndWb3vSmI0/ZrT+8r96mqNG6p/VG3+PVFcDqJ9U42Ub/1xlHn2+44YbBQW2bwBMBIN6/7inadYsIDrF9Cvp9oSTsYkxdeeWVg4Zl7P+qq64aFfAj6IRp+l7qGqNtDRB4BpXFRjsSEHh2BO0wpwv0nejWma0LAM0TVPx2G/+WZjViBiDC1rXXXltdfvnlRw4TMwMRAKZ8xcn3rrvuOhK+YlYi2hQBK05C8Yrt4uQSJ69XvvKVR57uOyTwxExG7K9+so++xL+l2aPYf4SC+BMO6RU2afYr/VsKQVGnNLuSTnYphETbuz7yImbo6jN2caKNWYbmqz4rkAJh1CwCU7xSCE0n3Hp74uvppNoWTKK/9X7G9qkPMRMyZGZv08AT7Yy6D63HWWeddarm0efw6pp9i340v3/STFf0Kd6XZpFiTNcN4mvR99i+L9TGODlx4sSRkkUYi9rU7WLsxfiJY8XMZXoJPFP+JLGvbQUEnm0FvX+wQN9vq1Os4WmenOJZPhFsHnjggdZ2tv1AHxIuBne6qlYnhjghpFe0KU5W605mY9fwxIk9ZknqJ9fod1cYie3j8saznvWsU+0Koxe84AWnda0tmNbDQltdY/9N8whf6z6DKtr+2GOPrY4fbWubtYhjxUxPfbYnTqpxAo5wEbbxtfqloa5Zlhhv6fLMunoODTx1h+h/7L8eYvrqEf2I7dOrr33NunSN29SWeujp8q07RHvf+ta3HqEJr3WzoEOtxnz/2JbAVAICz1SS9rO1wKaBJ51oYhai+cP4vPPOq2KmYd0rTsQxo1J/Df3tv6/Tzcs6MXMRJ+B1YSf2OTbw1ENVvPfmm2/u/eytMaGk2Z64JJRmYNoM2j4bLGYU6jM+zfdFwInQEq914aC57+h7hKUIDPX1I839x+xSrHOpv84999xTM2xdtRx7Eo+2RNir93Vdf9Jx2+qxLnw3x/u6bZvjMMZfrG/qekXbow/1AP2qV71qdWlrinDY933j6wTmEBB45lC1z40ENg086WDN5/jceeedp50A22Yj4od6XJqp/wYc0/brTp5DOhj7jbBVP2kMnT0aE3ias1RDQ1X0Ifr5kpe85FR34kQYIaAZyGL2qL4eqm+GIE6WcQJvvtYFyfpJeV0QaQtTQy6dtAWK66677sglm7bxMTbwNLd/8sknV5d56qZds51x+ag+7pr1qL+vPsPTF3Lb1sut+2UgZgbr6476wmqq81irId9HtiEwlYDAM5Wk/WwtsE3gaTuZ9U2/1xvc/A04TiDnnHNO70zMkN9264s8I/wMuUNoTOCJsFZfNzEmrIXbe97zniPrhWL2Jma96m2IS1H13+7XzRDE7ECaVYu21E+czZmh+gk8haS+k2vzpBrtvOyyywYtOK9b9YWETU/iYVO/lNV3Ka8+htrGcdvsULjFZdL6LFtYN9fbpH3Xa5L+rev7o23btjHRNvYFnq1/DNrBjAICz4y4dj1OYJvA0/Zbf9tdQV2/WbetU+laZNvXq3SMtrU7bbMebfsbGnjGnMi62t0MTM3Zm+hPCkb18NacrUn9roejpnfXTEx9/U4EhDjBdi2obVun1XTtqnPfGNt2hmfb4B01isDUNttYb1vferghY6or8LStaxt6iVfg6fvp4Ov7FBB49qnv2EcE+k5G67ia763PEgw5OdRPuOk48dtznHg3fTVP2GN+0x8aeJozL9HW5omsr/9Nu67Zm+aJuD5b0zZTk4JTLCSufyhsrB1pXjKrr9/pC5rNk2rf4t56/ZqXPYd8fMmYk3iqRz0YtgWLdTVp1iMCaVzi63r11Te97+TJk0dm8roCT/NyVry/65ECzTaNsdr0+8r7CGwqIPBsKud9kwtsE3iaJ+MhazqaHWiGjE32kfY5dgFqX1u61v60zWwN/W08HXPo7Fhz0W/bOp64tJZus0+BqHkCbQs09UuKfSfXbU6qm7x3zHviDrF0O3/ybQt46755mpdXxwSOdfttju+uwNP8PozAOnRmcozV5D9A7JBAj4DAY4gcjMA2gaf+w7zvgXhdHW5e2tkm8LRdIuu7s6nerqEzPGNOjl0zAekkVZ+VaAsdzUsdbTNB9RmntPC4PnsTfWxbY5TW7wwx3+akusl7x7yn7U6wvgDXN0vSF3hi/xE0wznW9cRlzvRMp3Xf3F3t2ub7cIzVwfzg0ZBiBASeYkp9+B3d5gdtM/C03aHVJxCBJ55Lk04EQ06+XftsCzzxb+ljEvraMjTw1E+wKbBE+4de5oh2tM3wtN0l1bZeqLldCi6xfilmmuLVvFzYvERT//qQULjNSbX53rik1fWRFV0zYOvGRXwtPjqk/poz8MSYisXkbTMwaaylj1JpPqm6a5xs8324TW36vid8ncC2AgLPtoLev5VA/cS8zQ/aoZej1gWBofvo+6059tMWeIbekh77Hxp4hl6OWtfmMbNEzVmw+h1E64JLcwF3uuwW9Yhn46Tn7wy5HLfNSXWT9455zxjLrpoMnSVqW2sTs2fx720PB2yOqXUzPBHaNgn+Y6y2+sHhzQQ2EBB4NkDzlnkEtgk8bZejYo1C150+bT2YYpYoBap9Bp4hD9Or97/pHl8744wzWu2aJ9n65an6Ja+YDYqF4+kVQaD+cRn18JdCQt/t6JvMuDTrvMkJecx72gLo2DU8zYXVaSam3pd1a7e6Qv2YwFOf9YrHKKz7bLJ17dpmlnSenzL2WrKAwFNy9Q+s7+kHfbo0k35YDrkdt/lbcd+TZJtdby4yjjbEk2XXPU049jFmxiiFgyGXm4bO8DTXx0Sbxjx/KLYfEzSbx6uHlFSDtpNcMwDGjE98jEX0M10GG/r8oDEBZNeBJ30cQ99dWuu+9YbUoxnwb7vttiMf1NoX6NPYbduu+fDDddtO4XtgP4Y0J2MBgSfj4i6ta0N+0Hf1qe327Dihdn2GVnM/bcFh6ExJV4Bprgnqu704taltrUzX5bC22+nbbn9fF7KaJ8/4WIr6eo/6e+P5MM1bytOTmdPnYNUvc9Xf2wxx6aMN2t63buwecuBpq93YD6TtC7ttdwD23cofnkNneNpmj4bsP2odlybrH99hhmdpP4Xzbq/Ak3d9F9W75scc9P2wrJ9Mx4SENpTmDFHfsYfAtq2xGDL70hbe1q3/WfcMor52bhL0mutx4uMZIrSkdThtl3CiVvHxFPVLJemSY1pvMvQp1IcceNpmzOoLuPvq0fbQv2bw3uQOwLbvj641PG2BasjsW1v4nuL7qM/M1wkMFRB4hkrZbnaB5ols6JqO1LBmwOj6XKhmR9pOBkM+7LENpB7C2sJE30Py4vbieO5JvOpP2+0KPHG8CBERJuqvrvY3Z3qaYWnIia35rJloW7zSp5S3fcp5fL0Z5Orv29WzXjYJS33vSabp77bQMmSGpC0sxd2G9Y/miG3aAk/fQy2bITX2s+7usfjeizsW66/6QvO2tXFtAV/gmf3HpgOMEBB4RmDZdF6BthNF24xIBJT44ZtmFFKr2j4EdMiJdN1C3G173HaiieNFIGkLXtGnONlEX+qzIX13eLWFvbCL43e92j50NAJXfNjlusXezQ+tvOeee061d11QbM4cxMkwQmlcAunrX70PfQFkXc02ee8m74mHMl5++eWnmhL9HFKPt771rafWhUUdYqw3LyG2zaTEgdrucItt47b1CDfN4LQu8LTNMq7rQ9o+/q6vexN4tv0J4v1TCgg8U2ra11YC8cM9TtD1mY34IRsnnPj3+OEdswdxoo5/jx/w6am+6cBxUo1Zi/o+4r3xG3batj7LEUEhPi08/fCPgBRBY8gHfA7pbNtv4/G+aEscO9oW/Y4/0a/oY5wYo89jAk+8L/odD55Lr2QXv/03X21hJ9q6LiClWYEIQ/VAFH2J46c/6+zi0le64yfaF3+i7ynYDlnQvUkASf3f5L2bvKetHuFy/Pjx1YMXm6+02Dn9e2y7rh5tt7/He+Pfo4ZRk/S9Em2Jy2Jx2bY+PuLSYxynK9y2hfU4RrrtPWoX329xnPg7xlkcoz7bKPAM+Slhm10JCDy7knacQQLxm/7rXve63m3jpBG/TTZ/+02/6cadJvUf7vHv8QM8nQziZBJ/6q90p8uQk25vA2sbxAkhThL1ENb1/jRD0rZwNL1n3TqgOOnE7d/1V3rwXASimMGJ90fISK8IeXHcoQu8431tz4pp+6iJdIxk2nbZo++253hvXC5rPjivzbBtpqgrdDbfXz85r/Ovv2/dCT2CRuwnQk6zHlGLGIsRFKJ99du+ox4xZpphvr6P2D6OnT6jrH5XWFuYSiGl7SGLbXdDxj7iGBFehnysRLQ5+hHbNi+vpvaMmcUb8/1lWwJDBQSeoVK225lABJk4UbQFhDipxm+xbQ9WawaVmMWIP+uepBuXj2Jfcbw4waSZnjHP7xkCEwEjjhEnsrZ+RTuiralfmwaeaEvfsVJ7wzKCS5wMm8Gkr09tlzyGrHtqu2wZl8Tqd/a0HbvtM6qmDjz1py5PEXhS+yJkRhCNcbjueTZRj7j8NPRp3LGvCFNRi7b9xn7i62lNWFtIjTb2zcJEzcIj+tH2ir7F19MvH13fOwJP33eVr88tIPDMLWz/Gwuk33zT2pz4jbhtRmfIAeJkE2EmrYlIl1PSJZypZ3XWtSnNLMXf0Y702/6QfozdJn7jTpea0iXD2EdbYByz7zFeY7ZttmHIM5jGtHuubYf2sV6PNK6nqEeaXYl9xkxdjOv6gx+n6He69Jr6EMeIcVT/nhzqMEV77IPAWAGBZ6yY7Q9KYN0P2KE/fIdud1Adn6gxU/hN1BS7GSiwr/G6r+MOZLEZgV4BgaeXyAaHIjDVD9yp9rMPl64Zj036tMl79tHnpR2z6bo059Te5t9Lq4P2EjhtxjgewImFwL4ElnYy2KVT3+xLtKXt6blTrz+ao8+51n2Tfq0LSJvsb9N67fJYm7bR+whsI2CGZxs9792bwFw/nOfa796g1nze16762hfcugLaNu3b5r37rNW+jj1kNofpvqrjuFMJCDxTSdrPpAKH8MN1V23oOs7Q40+93WnTwMeOjfrU+a6BMLSd6f1jt990AHZdJtx0f/G+Tdo+9D1Dwsk2bd/2vUP7se1xvJ/AWAGBZ6yY7QkQIECAAIHFCQg8iyuZBhMgQIAAAQJjBQSesWK2J0CAAAECBBYnIPAsrmQaTIAAAQIECIwVEHjGitmeAAECBAgQWJyAwLO4kmkwAQIECBAgMFZA4BkrZnsCBAgQIEBgcQICz+JKpsEECBAgQIDAWAGBZ6yY7QkQIECAAIHFCQg8iyuZBhMgQIAAAQJjBQSesWK2J0CAAAECBBYnIPAsrmQaTIAAAQIECIwVEHjGitmeAAECBAgQWJyAwLO4kmkwAQIECBAgMFZA4BkrZnsCBAgQIEBgcQICz+JKpsEECBAgQIDAWAGBZ6yY7QkQIECAAIHFCQg8iyuZBhMgQIAAAQJjBQSesWK2J0CAAAECBBYnIPAsrmQaTIAAAQIECIwVEHjGitmeAAECBAgQWJyAwLO4kmkwAQIECBAgMFZA4BkrZnsCBAgQIEBgcQICz+JKpsEECBAgQIDAWAGBZ6yY7QkQIECAAIHFCQg8iyuZBhMgQIAAAQJjBQSesWK2J0CAAAECBBYnIPAsrmQaTIAAAQIECIwVEHjGitmeAAECBAgQWJyAwLO4kmkwAQIECBAgMFZA4BkrZnsCBAgQIEBgcQICz+JKpsEECBAgQIDAWAGBZ6yY7QkQIECAAIHFCQg8iyuZBhMgQIAAAQJjBQSesWK2J0CAAAECBBYnIPAsrmQaTIAAAQIECIwVEHjGitmeAAECBAgQWJyAwLO4kmkwAQIECBAgMFZA4BkrZnsCBAgQIEBgcQICz+JKpsEECBAgQIDAWAGBZ6yY7QkQIECAAIHFCQg8iyuZBhMgQIAAAQJjBQSesWK2J0CAAAECBBYnIPAsrmQaTIAAAQIECIwVEHjGitmeAAECBAgQWJyAwLO4kmkwAQIECBAgMFZA4BkrZnsCBAgQIEBgcQICz+JKpsEECBAgQIDAWAGBZ6yY7QkQIECAAIHFCQg8iyuZBhMgQIAAAQJjBQSesWK2J0CAAAECBBYnIPAsrmQaTIAAAQIECIwVEHjGitmeAAECBAgQWJyAwLO4kmkwAQIECBAgMFZA4BkrZnsCBAgQIEBgcQICz+JKpsEECBAgQIDAWAGBZ6yY7QkQIECAAIHFCQg8iyuZBhMgQIAAAQJjBQSesWK2J0CAAAECBBYnIPAsrmQaTIAAAQIECIwVEHjGitmeAAECBAgQWJyAwLO4kmkwAQIECBAgMFZA4BkrZnsCBAgQIEBgcQICz+JKpsEECBAgQIDAWAGBZ6yY7QkQIECAAIHFCQg8iyuZBhMgQIAAAQJjBQSesWK2J3CAAm984xurV73qVdXHfuzHVn/0R39UvfCFLzytld/xHd9R/czP/Ez1tKc97cjX/vu//7v6u7/7u+oNb3hD9Ru/8Runve+rv/qrqxtvvLF6/vOfX33CJ3zC6usf/ehHq//8z/+s3vOe91S/+Iu/WN11112rf0/HePLJJ6uXvOQl1bve9a7T9vfXf/3X1fOe97zqx37sx6rXve51q6//4R/+YfWVX/mV1f/+7/9WP/VTP1W95jWvOe19v/Zrv1Z94zd+Y3Xs2LHql3/5l6vv+q7vOm2bX/mVX6m++Zu/efXvJ06cqL7zO79zrcN//dd/VT/4gz9Y3XbbbUe2i/Z8xVd8xZE2HmDZNYkAgRECAs8ILJsSOFSB+++/v/ryL//y6uTJk6sgcu2111a///u/f6S5XYEnbfT4449Xr33ta6uf//mfP/W+CAMRPpohqb7jv/mbv6k+7/M+b+vAc9lll1VPPfVU9YEPfKC68sorq9hven3N13zNKsB86qd+6uqf2gLPZ37mZ1b33HNP9dznPrc644wzqn/4h3+oLr/88urv//7vWx3OPPPMVUB88MEHqzj2hz/84VPbCTyHOtK1i8DmAgLP5nbeSeAgBL7+67+++qVf+qUqZmr+7d/+rXrBC17QOkvSNvsSQSbC0fHjx6vzzjvvyOxQChDx91/8xV9Ub37zm6uYQYlXBISYkfmqr/qqKoJDHDNe28zwxIxKzP5EePrpn/7p6tWvfvUp3zhuhKB/+qd/qqI9bYHn+77v+6qY6YrA9HEf93HVp3/6p1c/8AM/UP3sz/5sa+D5l3/5l+p//ud/VrNNN9988+q96SXwHMTQ1ggCkwoIPJNy2hmB3Qv83M/9XPU93/M91e/8zu9Uf/u3f7u6tPVXf/VX1Rd8wRe0nujbLjf9yI/8SPX93//91fvf//5TszURau68885VoLnuuutOmzFq6+m2gSeC2zd8wzdUTzzxxKlZnjS7EwHlscceW4WttsAT/Y9tw+Occ85ZXdr67d/+7eqKK65odYjw9Ju/+ZurUPS+971vddw0GyTw7H4cOyKBuQUEnrmF7Z/AjAIxQ3PfffetZj3i0lNcBoqQEmttYsYjzcj0zb6k0PTnf/7nq0tj8YoZl3j/p3zKp6zWuEQg6nttG3hiXc9nfdZnrcJOmuVJszs//MM/vJpVij/NwPMlX/Il1dvf/vbq4z/+41drez7pkz6puvXWW1cBKYJP9Cu9Uhsj8MT7Yp3R+eeff2RWTODpq7SvE1iegMCzvJppMYFTAtdcc83qxP6v//qvp9arpJmOt7zlLdX3fu/3nnair8/wfMZnfEb10pe+tHr5y19efeInfuJpl8LuuOOO6tu+7dtWa2L+4z/+YzUD8tBDD1V//Md/XP3u7/7ukXUv9VC1bs1PbBeXkpqLltMi4QceeGC1jihmeWL2JS6l/fu//3t18cUXrxZHtwWeuCQV28alt4suumi15iiC4Od8zuesLlfFguy2wBOXzyIoxuLpD37wg6dmlQQe32QE8hMQePKrqR4VJBCzHy9+8YuruIPpW7/1W1c9j4XHcQJ/9NFHjyzaXbdoORYLv/Od71xd1qkv3o3gcNNNN1Xf8i3fslowHHdIpVeEllgs/UM/9EOnZlD6FkbX39sVeKLt0Z+Y5Yk1PTHjE5fcIrSku7maMzzRjpitqd/hlWat/vRP/3QVgroCT/QxFqA+SsgAAAbaSURBVHjH+yNoxcyYwFPQN5GuFiMg8BRTah3NTSAuY8UsS1xyikXHt99++6qLX/iFX1j9+q//evXJn/zJRxbtdoWRuBU8FvZef/31a4k+93M/t/qiL/qi6ku/9EtX64Ni9iQuncVdTt/0Td+0mv2Z4pJWBJ6rrrpqFT6ibzHjE7M7EcTaAk9atB39qN8KH7ewxz7i3+t3rdUvaaW7y777u7+7+vEf//HVJbAIjhGw3Jae23eM/pQuIPCUPgL0f7ECaSYn7kjqesVt2mnRblsYSZes4pJYzGzcfffdgz2uvvrq6pZbbqk+5mM+ZnVJ7G1ve9tkgScaEbM8X/d1X1fF2p10B1Vb4EkzOXHZre0Vt+rHNtG/eLUFnvj32Pell1666kdc6hN4Bg8FGxJYhIDAs4gyaSSB0wVirc7Xfu3XrqWJy1pp0W7Xbem/9Vu/tVoX88///M+ru72az+/pOkCaYYpLXXMEnrbjNgNPWqtz4YUXrnWozxJ1BZ5wigczxozQww8/vLrVvn7ZzRgkQGDZAgLPsuun9YUKpFvG466kl73sZac9ITmCwJ/92Z+tHsKXFu12XW6KbVPoidvZY71O3O0V2//oj/7o6pbt3/u936v+5E/+pPrLv/zL1YLgF73oRaunGH/Zl33ZarHvulDVLFHXk5aHzKg0A09atP2hD31odVkt2ld/Jaf6XWtdgSfNKsU6po985COrZ/kIPIV+g+l2lgICT5Zl1ancBdJHScQJPt1G3uxzLOyNtSsRVGLR7rr1NbE+51d/9Verz//8z6/uvffeKi5XxeWdto+iqB8nHnb4kz/5k6uFy/Gaag1PV/2agSd9lESsWUofKdF8b7wngk/cth7rc9YFnvraoeadZLmPKf0jkLuAwJN7hfUvS4G48ygWJ3d97lR0Ok7u8SybOHFH8IlFzBFguj7nKh7aF7eyP/OZz1w9cTkWAMdsTyz+/ezP/uzVzE48hDDu6IoFxHF7eizu/YM/+INTxrsMPLHIOBZtf9qnfVrrE5VTo5p3rX3xF3/xyiGew5MWLdcHSSz+jn7E54WZ4cny20enChUQeAotvG4TIECAAIGSBASekqqtrwQIECBAoFABgafQwus2AQIECBAoSUDgKana+kqAAAECBAoVEHgKLbxuEyBAgACBkgQEnpKqra8ECBAgQKBQAYGn0MLrNgECBAgQKElA4Cmp2vpKgAABAgQKFRB4Ci28bhMgQIAAgZIEBJ6Sqq2vBAgQIECgUAGBp9DC6zYBAgQIEChJQOApqdr6SoAAAQIEChUQeAotvG4TIECAAIGSBASekqqtrwQIECBAoFABgafQwus2AQIECBAoSUDgKana+kqAAAECBAoVEHgKLbxuEyBAgACBkgQEnpKqra8ECBAgQKBQAYGn0MLrNgECBAgQKElA4Cmp2vpKgAABAgQKFRB4Ci28bhMgQIAAgZIEBJ6Sqq2vBAgQIECgUAGBp9DC6zYBAgQIEChJQOApqdr6SoAAAQIEChUQeAotvG4TIECAAIGSBASekqqtrwQIECBAoFABgafQwus2AQIECBAoSUDgKana+kqAAAECBAoVEHgKLbxuEyBAgACBkgQEnpKqra8ECBAgQKBQAYGn0MLrNgECBAgQKElA4Cmp2vpKgAABAgQKFRB4Ci28bhMgQIAAgZIEBJ6Sqq2vBAgQIECgUAGBp9DC6zYBAgQIEChJQOApqdr6SoAAAQIEChUQeAotvG4TIECAAIGSBASekqqtrwQIECBAoFABgafQwus2AQIECBAoSUDgKana+kqAAAECBAoVEHgKLbxuEyBAgACBkgQEnpKqra8ECBAgQKBQAYGn0MLrNgECBAgQKElA4Cmp2vpKgAABAgQKFRB4Ci28bhMgQIAAgZIEBJ6Sqq2vBAgQIECgUAGBp9DC6zYBAgQIEChJQOApqdr6SoAAAQIEChUQeAotvG4TIECAAIGSBASekqqtrwQIECBAoFABgafQwus2AQIECBAoSUDgKana+kqAAAECBAoVEHgKLbxuEyBAgACBkgQEnpKqra8ECBAgQKBQAYGn0MLrNgECBAgQKElA4Cmp2vpKgAABAgQKFRB4Ci28bhMgQIAAgZIEBJ6Sqq2vBAgQIECgUAGBp9DC6zYBAgQIEChJQOApqdr6SoAAAQIEChUQeAotvG4TIECAAIGSBASekqqtrwQIECBAoFABgafQwus2AQIECBAoSUDgKana+kqAAAECBAoVEHgKLbxuEyBAgACBkgQEnpKqra8ECBAgQKBQAYGn0MLrNgECBAgQKElA4Cmp2vpKgAABAgQKFRB4Ci28bhMgQIAAgZIE/h/eNtfSSU13OAAAAABJRU5ErkJggg=="
