$(document).ready(function () {
	var audioElement = document.createElement('audio');
	audioElement.setAttribute('src', `assets/audio.mp3`);
	$.ajax({url: "./assets/timestamps.json"}).done((res) => {
		var lineTimes = [0,71,147]
		// console.log(res.timestamps)
		var timestamps = res.timestamps
		var index = 0;

		$(`p:visible[id*='ayat']`).each(function (i, textArray){
			var characters = textArray.innerHTML.split("")
			var elem = document.createElement('p')
			elem.setAttribute('id', 'ayat_')
			elem.setAttribute('key', i+1)
			elem.style.color = '#C0C0C0';

	
			$.each(characters, function (j, el) {
				_span = document.createElement('span')
				// console.log(el.charCodeAt(0))
				if(el == " "){
					_span.setAttribute("id", 'ts-1')
					_span.innerHTML = el
					elem.append(_span)
				}else{
					if(i < 2 && el.charCodeAt(0) <= 1610 && el.charCodeAt(0) >= 1571) {
						_span.setAttribute("id", `${timestamps[index]}`)
						index++;
					}else{
						_span.setAttribute("id", `ts1`)
					}
					_span.setAttribute("target", i+1)
					_span.setAttribute("target", i+1)
					_span.setAttribute("highlighted", false)
					_span.innerHTML = el
					elem.append(_span)
				}
			})
			$('#ayat').replaceWith(elem)
			
		})
	
		$(`p:visible[id*='ayat_']`).on('click', function (event) {
			ayat = event.currentTarget
			key = Number(ayat.getAttribute("key"))
			word = 1;
			// console.log(audioElement.paused)
			
	
			if(audioElement.paused){
				audioElement.setAttribute('data_target', `${key}`);
				// console.log(key)
				// console.log(lineTimes[key-1])
				audioElement.currentTime = lineTimes[key-1]
				audioElement.play()
		
				body = $(`body`);
				body.append(audioElement)
				
	
				$(`audio`).on('timeupdate', function () {
					spns_id = audioElement.getAttribute("data_target");
					spns = $(`[target='${spns_id}'`)
					for (i = 0; i < spns.length; i++) {
						if (parseFloat(audioElement.currentTime) >= parseFloat(spns[i].id.slice(2))) {
							// console.log(spns[i])
							spns[i].style.color = "#000000";
						}
					}
					if(key != 3){
						if(audioElement.currentTime >= lineTimes[key]){
							$('audio').remove()
						}
					}
				})
				
				$(`audio`).on('ended', function (event) {
					$('audio').remove()
					console.log('ended')
				})	
				
				$(`audio`).on('pause', function (event) {
					spns_id = audioElement.getAttribute("data_target");
					spns = $(`[target='${spns_id}'`)
					for (i = 0; i < spns.length; i++) {
						if (parseFloat(audioElement.currentTime) >= parseFloat(spns[i].id.slice(2))) {
							// console.log(spns[i])
							spns[i].style.color = "#C0C0C0";
						}
					}
					$('audio').remove()
					console.log('ended')
				})
			} else{
				audioElement.pause()
			} 
		});
	});
})
