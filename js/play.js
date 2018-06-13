function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
	var id = getParameterByName('id')
	console.log(id)
	var query = new AV.Query('Song');
	query.get(id).then(function (song){
	console.log(song)
	let {url,lyric,img} = song.attributes	
	let audio=document.createElement('audio')
	audio.src=url
	$('#coverimg').attr('src',img)
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
	
	$('#back').on('click',function(){
			window.history.back()
	})
	
$('#lastsong').on('click',function(){
	var SongObject = AV.Object.extend('Song');
	var songObject = new SongObject();
	var query = new AV.Query('Song');
	var currId=id
    query.find().then(function (results) { 	
    	let array=[]
   console.log(currId)
	for (var i=0;i<results.length;i++) {
			array.push(results[i].id)
	}
	let	index=array.indexOf(currId)
	if (index===0) {
		index=array.length
	}
	console.log(index)
	let indexs=Math.abs(index-=1)

	let songs=results[indexs].attributes
	id=array[indexs]	
	console.log(indexs)
    	console.log(results)
	let {url,lyric,img} =songs
	audio.src=url
	audio.play()	
	$('#lyrics>.lines').empty()   	
    	$('#coverimg').attr('src',img)
    	$('.musiccontrol').addClass('playing')
	$('.disc').addClass('playing')
	parseLyric(lyric)
    
    })
})
$('#nextsong').on('click',function(){
	var SongObject = AV.Object.extend('Song');
	var songObject = new SongObject();
	var query = new AV.Query('Song');
	console.log(id)
	var currId=id
    query.find().then(function (results) {
    	let array=[]
	for (var i=0;i<results.length;i++) {
			array.push(results[i].id)
	}
	let	index=array.indexOf(currId)
		indexs=index+=1
		if(indexs===array.length){
			indexs=0
		}
		let songs=results[indexs].attributes
		id=array[indexs]
		console.log(currId)
		console.log(songs)
		console.log(array)
    		console.log(results)
	   	let {url,lyric,img} =songs
	   	console.log(songs)
	   	console.log(url,id)
	    	audio.src=url
	    	audio.play()	
	    	$('#lyrics>.lines').empty() 
	    	$('#coverimg').attr('src',img)
		$('.musiccontrol').removeClass('playing')
		$('.disc').removeClass('playing')
		parseLyric(lyric)
		
    })
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
  })

function parseLyric(lyric){
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

