$(document).ready(function () {
	$.ajax({
		url: "./assets/ayats.json", success: function (result) {
			initialize(result);
		}
	}).done(() => {
		$(`audio:visible[id*='audio']`).on('timeupdate', function (event) {
			audio = event.currentTarget;
			spns_id = audio.getAttribute("data_target");
			spns = $(`#${spns_id}`).children();
			for (i = 0; i < spns.length; i++) {
				if (parseFloat(audio.currentTime) >= parseFloat(spns[i].id.slice(2))) {
					spns[i].style.backgroundColor = "red";
				}
			}
		});
	
		$(`audio:visible[id*='audio']`).on('ended', function (event) {
			audio = event.currentTarget;
			
			spns_id = audio.getAttribute("data_target");
			spns = $(`#${spns_id}`).children();
			for (i = 0; i < spns.length; i++) {
				spns[i].style.backgroundColor = "white";
			}
		})
	});


})


function initialize(data) {
	data_ = data.ayats
	data = data.ayats[0]
	var ayats = $('#ayats');

	for (i = 0; i < data_.length; i++) {
		var sentence = document.createElement("div");
		sentence.setAttribute('id','sentence')
		var audio_ = document.createElement("audio");
		var audioSource = document.createElement("source");

		audio_.setAttribute('id', `audio`)
		audio_.setAttribute('data_target', `_${data_[i].id}`)
		audio_.setAttribute('controls', '')
		audioSource.setAttribute('src', `${data_[i].audio_src}`)

		//audio
		audio_.append(audioSource);

		//sentence
		var word = document.createElement("pre")
		word.setAttribute("id", `_${data_[i].id}`)
		console.log(data_)

		for (j = 0; j < data_[i].words.length; j++) {
			for (x = 0; x < data_[i].words[j].length; x++) {
				var alpha = document.createElement("span")
				alpha.setAttribute(`id`, `ts${data_[i].words[j][x].ts}`)
				alpha.innerHTML = `${data_[i].words[j][x].alpha}`
				word.append(alpha)
			}
			word.append(' ')
		}

		sentence.append(word)

		var card = document.createElement('div')
		card.setAttribute('id', 'ayat')

		card.append(audio_)
		card.append(sentence)

		$('#ayats').append(card)

	}
	console.log(ayats)
}