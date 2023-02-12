const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const cd = $('.cd')
const player  = $('.player')

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const cdAudio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')


const app = {
    currentIndex:0,
    isPlaying:false,
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
        }
    ],
    render:function(){
        const htmls = this.songs.map(song =>{
            return `
            <div class="song">
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
                interration:Infinity,
                
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
                // khi tiến độ bài hát thay đổi
            audio.ontimeupdate = function(){
                if(audio.duration){
                    const progressPersentage = audio.currentTime / audio.duration * 100
                    progress.value = progressPersentage
                }
            }
            
        }
         // xử lý khi tua
         progress.onchange = function(e){
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime

        }
        // khi next song
        nextBtn.onclick = function(){
            app.nextSong()
            audio.play()
        }
        // khi prev song
        prevBtn.onclick = function(){
            app.prevSong()
        }

    },
    loadCurrentSong:function(){
        
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        cdAudio.src = this.currentSong.path
        

    },
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentSong = 0
    }
        this.loadCurrentSong();
    },
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentSong = 0
    }
        this.loadCurrentSong();
    },
    start: function(){
        // dinh nghia cac thuoc tinh cho object
        this.defineProperties()
        // render

        this.render();
        // láng nghe các sự kiện của DOM element
        this.hadlerEvent()
        //tải thông tin bài hát đầu tiên vào UI khi mới chạy
        this.loadCurrentSong()


    }
};
app.start()