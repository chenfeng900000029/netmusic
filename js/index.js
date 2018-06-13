$(function(){
	$('.siteNav').on('click','ol.tab-items>li',function(e){
		let $li=$(e.currentTarget).addClass('active')
		$li.siblings().removeClass('active')	
		let index=$li.index()
		$li.trigger('tabChange',index)
		$('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')
	})
	$('.siteNav').on('tabChange',function(e,index){
		let $li=$('.tabContent> li').eq(index)
		if($li.attr('data-downloaded')==='yes'){
			return
			}
		if(index === 1){
			$.get('./page2.json').then((response)=>{
				console.log(response)
			$li.text(response.content)	
			$li.attr('data-downloaded','yes')
			})
		}
		
		if(index === 2){
			return
			$.get('./page2.json').then((response)=>{
				console.log(response)
			$li.text(response.content)	
			$li.attr('data-downloaded','yes')
			})
		}
	})
	
//	let timer = undefined
//	$('input#searchSong').on('input',function(e){
//		let $input = $(e.currentTarget)
//		let value = $input.val().trim()
//		if(value === ''){return}
//		if(timer){
//			clearTimeout(timer)
//		}
//		timer = setTimeout(function(){
//			search(value).then((result)=>{
//			timer= undefined	
//			if(result.length!==0){
//			$('#output>ul>li').text(result.map((r)=>r.name).join(','))	
//			}else{
//			$('#output>ul>li').text('未搜索到相应结果')			
//			}
//		})
//	},300)
//	})
//	function search(keyword){
//		return new Promise((resolve,reject)=>{
//			var database=[{
//			"id":0,
//			"url":"http://p9sfbm7t8.bkt.clouddn.com/planet.mp3",
//			"name":"Planet",
//			"singer":"ラムジ"
//		},
//		{
//			"id":1,
//			"url":"http://p9sfbm7t8.bkt.clouddn.com/weilai.mp3",
//		 	"name":"给未来的自己",
//		 	"singer":"杨宗纬"	
//		},
//		{
//			"id":2,	
//			"url":"http://p9sfbm7t8.bkt.clouddn.com/cehgnquan.mp3",
//			"name":"成全",
//			"singer":"林宥嘉"
//			
//		},
//		{
//			"id":3,
//			"url":"http://p9sfbm7t8.bkt.clouddn.com/4.m4a",
//		 	"name":"Hoaprox - Ngẫu Hứng",
//			"singer":"Ngẫu Hng"
//		},
//		]
//	 let result = database.filter(function(item){
//		return item.name.indexOf(keyword)>=0
//			})
//		setTimeout(function(){
//			resolve(result)
//			},(Math.random()*300+1000))
//				})
//		}	
//	window.search=search
//})


