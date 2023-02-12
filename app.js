const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const PLAYER_STORAGE_KEY = 'F8_PLAYER'


const cd = $('.cd')
const player  = $('.player')

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const cdAudio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')


const app = {
    currentIndex:0,
    isPlaying:false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Gieo Quẻ',
            singer:'Hoàng Thùy Linh, Đen',
            path:'./assets/music/GieoQue.mp3',
            image:'./assets/img/gieoque.jpg'
        },
        {
            name: 'Luôn Yêu Đời',
            singer:'Đen, Cheng',
            path:'./assets/music/luonyeudoi.mp3',
            image:'./assets/img/luonyeudoi.jpg'
        },
        {
            name: 'Ngày Khác Lạ',
            singer:'Giang Phạm, Đen',
            path:'./assets/music/NgayKhacLa.mp3',
            image:'./assets/img/ngaykhacla.jpg'
        },
        {
            name: 'Vì Yêu Mà Cứ Đâm Đầu',
            singer:'Min',
            path:'./assets/music/ViYeuCuDamDau.mp3',
            image:'./assets/img/viyeumacudamdau.jpg'
        },
        {
            name: 'Counting Stars',
            singer:'EQRIC & PHARAØH & Timmy',
            path:'./assets/music/CountingStars.mp3',
            image:'./assets/img/CountingStars.jpg'
        },
        {
            name: 'Sweet Dreams',
            singer:'Yohan Gerber & Ava Silver',
            path:'./assets/music/SweetDreams.mp3',
            image:'./assets/img/SweetDreams.jpg'
        },
        {
            name: 'Middle',
            singer:'Twin & Ben Plum',
            path:'./assets/music/Middle.mp3',
            image:'./assets/img/Middle.jpg'
        },
        {
            name: 'Ngày Khác Lạ',
            singer:'Giang Phạm, Đen',
            path:'./assets/music/NgayKhacLa.mp3',
            image:'./assets/img/ngaykhacla.jpg'
        },
        {
            name: 'Vì Yêu Mà Cứ Đâm Đầu',
            singer:'Min',
            path:'./assets/music/ViYeuCuDamDau.mp3',
            image:'./assets/img/viyeumacudamdau.jpg'
        },
        {
            name: 'Counting Stars',
            singer:'EQRIC & PHARAØH & Timmy',
            path:'./assets/music/CountingStars.mp3',
            image:'./assets/img/CountingStars.jpg'
        },
        {
            name: 'Sweet Dreams',
            singer:'Yohan Gerber & Ava Silver',
            path:'./assets/music/SweetDreams.mp3',
            image:'./assets/img/SweetDreams.jpg'
        },
        {
            name: 'Middle',
            singer:'Twin & Ben Plum',
            path:'./assets/music/Middle.mp3',
            image:'./assets/img/Middle.jpg'
        }
    ],
    setConfig: function(key, value){
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
    },
    render:function(){
        const htmls = this.songs.map((song,index) =>{
            return `
            <div class="song ${index === this.currentIndex ? 'active':''}" data-index = ${index}>
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        });
        
        $('.playlist').innerHTML = htmls.join('')

    },
    defineProperties:function(){
        Object.defineProperty(this, 'currentSong',{
            get:function(){
                return this.songs[this.currentIndex]
            },
        })
    },
    hadlerEvent:function(){
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth
       
        

        // xử lý CD quay
        const cdThumbAnimate = cdThumb.animate(
            [
                {transform:'rotate(360deg)'},

            ],{
                duration:10000,
                iterations:Infinity,
                
                
            }
        )
            
            
            
        // xử lý phóng to thu nhỏ CD
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCDWidth = cdWidth - scrollTop
            cd.style.width = newCDWidth >0 ? newCDWidth + 'px' :0
            cd.style.opacity = newCDWidth/cdWidth      
        }

        // xử lý khi click player
        playBtn.onclick = function(){
            if(app.isPlaying){
                audio.pause()
            }else{
                audio.play()
            
            
            }
            
                // khi tiến độ bài hát thay đổi
            audio.ontimeupdate = function(){
                if(audio.duration){
                    const progressPersentage = audio.currentTime / audio.duration * 100
                    progress.value = progressPersentage
                }
            }
            
            
        }
        // Khi bài hát dduwc play 
        audio.onplay = function(){
            app.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
            // Khi bài hát dduwc play 
        audio.onpause = function(){
            app.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
         // xử lý khi tua
         progress.onchange = function(e){
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime

        }
        // khi next song
        nextBtn.onclick = function(){
            if(app.isRandom){
                app.playRandomSong()
            }else{
                app.nextSong()
            }
            audio.play()
            app.render()
            
            app.scrollToActiveSong()
        }
        // khi prev song
        prevBtn.onclick = function(){
            if(app.isRandom){
                app.playRandomSong()
            }else{
                app.prevSong()
            }
            audio.play()
            app.render()
            
            app.scrollToActiveSong()
        }
        // Khi random song

        randomBtn.onclick = function(){
            app.isRandom =!app.isRandom
            app.setConfig('isRandom',app.isRandom)
            randomBtn.classList.toggle('active',app.isRandom)
        }
        // khi kết thúc bài hát
        audio.onended = function(){
            if(app.isRepeat){
                audio.play()
                
            }else{
                nextBtn.click()

            }
        }
        // xử lý lặp lại songs
        repeatBtn.onclick = function(){
            app.isRepeat =!app.isRepeat
            app.setConfig('isRepeat',app.isRepeat)
            repeatBtn.classList.toggle('active',app.isRepeat)

        }
        // láng nghe hành vi click vào playList
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')){
                // xuwr lys khi click vafo song
                if(songNode){
                    // console.log(songNode.getAttribute('data-index')) giong duoi
                    // console.log(songNode.dataset.index)
                    app.currentIndex = Number(songNode.dataset.index)
                    app.loadCurrentSong()
                    app.render()
                    audio.play()
                    
                }
                if(e.target.closest('.option')){
                    console.log()
                    
                }
            }
        }

    },
    scrollToActiveSong:function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block:'center',


            })

        },500)
    },
    loadConfig: function(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
        
    },
    loadCurrentSong:function(){
        
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        cdAudio.src = this.currentSong.path
        

    },
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
    }
        this.loadCurrentSong();
    },
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = 0
    }
        this.loadCurrentSong();
    },
    playRandomSong:function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex == this.currentIndex)
        this.currentIndex = newIndex
        
        this.loadCurrentSong();
    },
    start: function(){
        // gan cau hinh tu config
        this.loadConfig();
        // dinh nghia cac thuoc tinh cho object
        this.defineProperties()
        // render

        this.render();
        // láng nghe các sự kiện của DOM element
        this.hadlerEvent()
        //tải thông tin bài hát đầu tiên vào UI khi mới chạy
        this.loadCurrentSong()

        repeatBtn.classList.toggle('active',app.isRepeat)
        randomBtn.classList.toggle('active',app.isRandom)

    }
};
app.start()