var SongObject = AV.Object.extend('Song');
var songObject = new SongObject();
var query = new AV.Query('Song');
  query.find().then(function (results) {
  	console.log(results)
  	for (var i=0;i<results.length;i++) {
  	console.log(results[i].id)
  	let song= results[i].attributes
  	console.log(song)
  	let ul=`
			<ul>
						  <a href="./play.html?id=${results[i].id}">
							<li>
								<img src="${song.img}"/>
							</li>
							<li>
								<svg class="icon"  aria-hidden="true">
									<use xlink:href="#icon-laba"></use>
								</svg>
							</li>
							<li >
								<h4>${song.name}</h4>
								<p>${song.singer} </p>
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
  			$('#lastmusic').append(ul)
  	}
  }, function (error) {
  	console.log('获取失败')
  });
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var id = getParameterByName('id'); 
console.log(id)
 