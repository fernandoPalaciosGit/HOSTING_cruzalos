<div class="group_quizzes">
	<section class="pistas_actores">
		<header>
			<hgroup>
				<h2>pistas: <span>posibles actores</span></h2>
			</hgroup>
		</header>
		<nav>
			<ul>
				<li><a href="http://www.imdb.com/name/nm0004851/bio?ref_=nm_ov_bio_sm" rel="actor">Penelope Cruz</a></li>
				<li><a href="http://www.imdb.com/name/nm0000849/bio?ref_=nm_ov_bio_sm" rel="actor">Javier Bardem</a></li>
				<li><a href="http://www.imdb.com/name/nm0000197/bio?ref_=nm_ov_bio_sm" rel="actor">Jack Nicolson</a></li>
				<li><a href="http://www.imdb.com/name/nm0000008/bio?ref_=nm_ov_bio_sm" rel="actor">Marlon Brandom</a></li>
			</ul>
		</nav>
	</section>

	<section class="content_quizzes">
		<!-- CARGAR EL CONTENIDO PARA CADA QUIZ
		-------------------------------->
		<?php
			if ($quizz == "quiz_video") {
				include "server/quiz_video.php";

			} else if ($quizz == "quiz_audio") {
				include "server/quiz_audio.php";

			} else if ($quizz == "quiz_image"){
				include "server/quiz_image.php";

			} else if ($quizz == "pen") {
				include "server/quiz_pen.php";

			} else if ($quizz == "bar") {
				include "server/quiz_bar.php";

			} else {
				include "server/quiz_nic.php";
			}
		?>
	</section>
</div>