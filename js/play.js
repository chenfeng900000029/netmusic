
$(function() {
let id=parseInt( location.search.match(/\bid=([^&]*)/)[1],10)
 //console.log(id)
$.get('song.json').then(function(response){
	let songs=response
	console.log(songs.length)
	let song=songs.filter((s)=>{return s.id===id})[0]
	let currentId=song.id
	let {url,img,lyric,name,bg}=song
	console.log(bg)
	let imgs =$('#coverimg').attr('src',img)
	//console.log(imgs)	
	initTextIn(name,lyric,bg	)
	initPlayer.call(undefined,url,img,songs,currentId,lyric,bg)
})

function initTextIn(name,lyric,bg){
	$('title').text(name)
	console.log(name)
	parseLyric.call(undefined,lyric,bg)
}
function initPlayer(url,img,songs,currentId,lyric,name,bg){
	let audio=document.createElement('audio')
	//audio.autoplay='autoplay'  自动播放  手机无效
	audio.src=url
	//  进入页面自动播放 手机无效
	// audio.oncanplay=function(){
    // audio.play() 
    //$('.disc').addClass('playing')
	//}
	$('.btn-stop').on('click',function(){
		audio.pause()
		$('.musiccontrol').removeClass('playing')
		$('.disc').removeClass('playing')
		})
	$('.btn-play').on('click',function(){
		audio.play()
			
		$('.musiccontrol').addClass('playing')
		$('.disc').addClass('playing')
		})
		$('#nextsong').on('click',function(){
			let sId=Math.abs(currentId+=1)  //也许用户实在滴3首歌进来的 不能改
			let sNumber=songs.length
			console.log(sId)
			let sNext=sId%sNumber
			console.log(sNext)
			console.log(sId )
			let song=songs.filter((s)=>{return s.id===sNext})[0]
			let {url,img,lyric,name,bg}=song 
			audio.src=url
			let imgs =$('#coverimg').attr('src',img)
			$('title').text(name)
			console.log(img,url,song,name,bg)
			console.log(bg)
			$('.musiccontrol').addClass('playing')
			$('.disc').addClass('playing')
			audio.play()
			$('#lyrics>.lines').empty()
			parseLyric(lyric)
		})
		
		$('#lastsong').on('click',function(){
			let sId=Math.abs(currentId-=1)
			console.log(sId)
			let sNumber=songs.length
			let sNext=sId%sNumber
			 if(sId<=0){ sId=4 }
			let song=songs.filter((s)=>{return s.id===sNext})[0]
			let {url,img,lyric,name,bg}=song
			audio.src=url
			
			let imgs =$('#coverimg').attr('src',img)
			$('.page').css().empty()
			$('title').text(name)
			$('.musiccontrol').addClass('playing')
		    $('.disc').addClass('playing')
		    $('#lyrics>.lines').empty()
			audio.play()
			parseLyric(lyric)
		})
		$('#back').on('click',function(){
			window.history.back()
		})
		
		setInterval(()=>{
		let seconds=audio.currentTime
		let	munites = ~~(seconds / 60)  //取整
		let surplus = seconds - munites * 60
		let time = `${pad(munites)}:${pad(surplus)}`
		let $lines=$('.lines>p')
		let $whichLine
		for (let i=0;i<$lines.length;i++) {
			if($lines[i+1] !== undefined && $lines.eq(i).attr('data-time')<time && $lines.eq(i+1).attr('data-time')>time){
				console.log($lines[i])
				$whichLine=$lines.eq(i)
			break
				}
			}
			if($whichLine){
				$whichLine.addClass('active').prev().removeClass('active')
				let top=$whichLine.offset().top
				let linesTop=$('.lines').offset().top
				let delta=top-linesTop-$('.lines').height()/top
				$('.lines').css('transform',`translateY(-${delta}px)`)
			}
		},100)
		
		function pad(number){
			return number>=10 ? number + '':'0'+number 
		}

		
	}
function parseLyric(lyric,bg){
	let array=lyric.split('\n')
	let regex = /^\[(.+)\](.*)$/
	array = array.map(function(string, index) {
		let matches = string.match(regex)
		if(matches) {
			return {time: matches[1],words: matches[2]}
		}
	})
	let $lyric = $('.lyric')
	array.map(function(object) {
		if(!object){return}
		let $p = $('<p/>')
		$p.attr('data-time', object.time).text(object.words)
		$p.appendTo($lyric.children('.lines'))
		})
	}
	
})

$(contaiter).on('click',function(){
	$(contaiter).hide()
	$(description).hide()
	$(lyrics).show()
})
$(lyrics).on('click',function(){
	$(contaiter).show()
	$(description).show()
	$(lyrics).hide()
	})


