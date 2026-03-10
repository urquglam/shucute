const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",    // 0 bình thường
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",  // 1 bối rối
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",              // 2 năn nỉ
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",              // 3 buồn
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",       // 4 buồn hơn
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",              // 5 tuyệt vọng
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",                // 6 gục ngã
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"  // 7 khóc chạy mất
]

const noMessages = [
    "Không",
    "Em chắc chưa? 🤔",
    "Shu ơii!!... 🥺",
    "Em mà bấm Không là anh buồn==...",
    "Anh sẽ dỗi thật đấy... 😢",
    "Đi mà vợ yêu??? 💔",
    "Đừng đối xử với anh như thế...",
    "Cơ hội cuối cùng đấy! 😭",
    "Đố em bấm trúng được anh 😜"
]

const yesTeasePokes = [
    "Thử bấm 'Không' trước xem... có điều bất ngờ đấy 😏",
    "Cứ bấm thử nút kia đi... một lần thôi 👀",
    "Không bấm thử nút 'Không' là tiếc lắm đấy 😈",
    "Anh thách em bấm được nút 'Không' đấy 😏"
]

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Tự động phát nhạc
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    if (!runawayEnabled) {
        // Trêu vợ để vợ bấm thử nút No trước
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    // Đổi tin nhắn năn nỉ
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Làm nút Yes to dần lên
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Thu nhỏ nút No
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Đổi GIF theo từng giai đoạn "đau khổ"
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Nút No bắt đầu chạy trốn sau 5 lần bấm
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function
