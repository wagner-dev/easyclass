require('dotenv').config()
const { format } = require('date-fns')
const puppeteer = require("puppeteer")
const horario = require('./default/schedule/index.json')

async function start(link, end) {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto("https://accounts.google.com/signin/v2/identifier?ltmpl=meet&continue=https%3A%2F%2Fmeet.google.com%3Fhs%3D193&_ga=2.257731147.1162410788.1629753370-1411601220.1629753370&flowName=GlifWebSignIn&flowEntry=ServiceLogin")
    console.log('Fazendo login 1/2 - 50%')
    await page.type('.whsOnd.zHQkBf', process.env.EMAIL)
    await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b')
    await page.waitForNavigation()
    setTimeout(async () => {
        console.log('Fazendo login 2/2 - 85%')
        await page.type('.whsOnd.zHQkBf', process.env.SENHA)
        await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b')
        
        console.log('Logado - 100%')
    }, 1000)
    await page.waitForNavigation()
    console.log('escrevendo codigo da aula...')
    await page.type('.VfPpkd-fmcmS-wGMbrd.B5oKfd', link)
    setTimeout(async () => {
        await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.ksBjEc.lKxP2d.cjtUbb')
        console.log('entrando...')
    }, 500)
    
    await page.waitForNavigation()
    console.log('Desativando opçoes...')
    await page.click('.ZB88ed')
    await page.click('.GOH7Zb')
    setTimeout(async () => {
        await page.click('.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt')
        
        console.log('Entrando em aula...')
        setTimeout(() => {console.log('verificando o chat...')}, 3000)
    }, 3000)
    await page.evaluate(async () => {setTimeout(() => {
        document.querySelectorAll('.VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc')[2].click()
        function DefineSong(type){
                document.querySelectorAll('video, audio').forEach(elem => {
                    elem.muted = type === 'mute' ? true : false
                    const defining = type === 'mute' ? elem.pause() : elem.play()
                })
        }
        DefineSong('mute')
        let verify = setInterval(() => {
            const chat = document.querySelectorAll('.oIy2qc')
            if(chat.length){
                const lastChat = chat[chat.length-1].innerText.toLocaleLowerCase()

                if(lastChat.includes('presente')  || lastChat.includes('forms')  || lastChat.includes('/infor') || lastChat.includes('/ infor')){
                    clearInterval(verify)
                    // habilitar som
                    DefineSong('play')
                    // fazer alerta
                    let context = new AudioContext(),
                        oscillator = context.createOscillator()

                        oscillator.type = 'sine'
                        oscillator.connect(context.destination)
                        oscillator.start()

                        if(confirm('Alguém mandou uma msg no chat sobre a presença. Provavelmente, a chamada começou!')){
                            oscillator.stop()
                        }
                }
            }
        }, 1000)

    }, 5000)})

}

function verifyTime(){
    console.log('sistema iniciado...')
    console.log('verificado aulas...')
    let verifyHrs = setInterval(() => {
        const date = new Date()
        const day = format(date, 'eeee').toLocaleLowerCase()
        const time = format(date, 'HH:mm')
        if(horario[day]){
            horario[day].map(item => {
                if(item.start.includes(time)){
                    console.log(`Entrando na aula de ${item.matter}...`)
                    start(item.link)
                }
            })
        }
        else{
            console.log('Hoje não tem aula!')
        }

    }, (1000 * 59))
}

verifyTime()