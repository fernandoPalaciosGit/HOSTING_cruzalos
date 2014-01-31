<article class="flotarL" id="quizz_video">
	<header>
		<h1>¿quien interpreta la pelicula?</h1>
	</header>
	<!-- VIDEO DE CINE -->
	<video poster="multimedia/AH_poster.jpg" controls >
			<!-- codecs / tipos MIME: Ogg(video/ogg), MP4(video/mp4), WebM(video/webm) -->
		<source src="multimedia/AH.mp4" type="video/mp4" codecs="avc1.4D401E, mp4a.40.2"></source>
		<source src="multimedia/AH.webm" type="video/webm" codecs="vp8.0, vorbis"></source>
		Tu navegador NO soporta los videos
	</video>
	<p>
		<input id="nom_art" type="text" placeholder="nombre y apellido del actor" autofocus/>
	</p>
	<p>
		<input class="btn_quizz btn_quest" type="button" value="responder" title="enviar tu propuesta de actor"/>
	</p>
</article>

<article class="flotarR" id="trick_video">
	<header>
		<h1><input class="btn_quizz btn_sol" type="button" value="solucion" title="solucion del actor"/></h1>
	</header>
	<div class="trick_oculto">
		<figure>
			<img alt="Edward Norton" src="multimedia/Edward_Norton.jpg"/>
			<figcaption><strong>Edward Norton</strong></figcaption>
			<figcaption><small>american history X</small></figcaption>
		</figure>
	</div>
</article>
<div class="error err_quizzes">
	<p>ESTE NO ES EL NACI</p>
</div>