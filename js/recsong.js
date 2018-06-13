$(function(){
		$.get('song.json').then(function(response){
			let items=response
			items.forEach((i)=>{
				let $ul=$(`
					
						<ul>
						  <a href="./play.html?id=${i.id}">
							<li>
								<img src="${i.img}"/>
							</li>
							<li>
								<svg class="icon"  aria-hidden="true">
									<use xlink:href="#icon-laba"></use>
								</svg>
							</li>
							<li >
								<h4>${i.name}</h4>
								<p>${i.singer} </p>
							</li>
							<li>
								<svg class="icon"  aria-hidden="true">
									<use xlink:href="#icon-youtube"></use>
								</svg>
							</li>
							<li>
								<svg class="icon"  aria-hidden="true">
									<use xlink:href="#icon-gengduo"></use>
								</svg>
							</li>
						</a>	
					</ul>
				`
				)
			$('#lastmusic').append($ul)
			})
	})		
})

