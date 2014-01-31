<div id="group_main_nav" class="groupFloat">
	<!-- CONTENIDO PRINCIPAL
	-------------------------------->
	<main id="help_quiz"><!-- aqui va el degradado de fondo -->
		<article id="otros_quiz">
			<header><h2>otros quizzz que te pueden interesar</h2></header>
			<nav>
				<ul>
					<li>Quiz sobre historia de internet<span rel="historia" class="icon-arrow-right"></span></li>
					<li>Quiz sobre programacion cliente<span rel="cliente" class="icon-arrow-right"></span></li>
					<li>Quiz sobre programacion servidor<span rel="servidor" class="icon-arrow-right"></span></li>
				</ul>
			</nav>
			<ul rel="historia">
				<li><a href="http://gplsi.dlsi.ua.es/proyectos/examinador/test.php?id=48&amp;lang=es">Historia de <strong>Internet</strong></a></li>
				<li><a href="http://gplsi.dlsi.ua.es/proyectos/examinador/test.php?id=52&amp;lang=es">Quien es <strong>Leonard Klein</strong></a></li>
				<li><a href="http://gplsi.dlsi.ua.es/proyectos/examinador/test.php?id=53&amp;lang=es">Quien es <strong>Vint Cerf</strong></a></li>
			</ul>
			<ul rel="cliente">
				<li><a href="http://www.w3schools.com/quiztest/quiztest.asp?qtest=HTML5">W3Schools <strong>HTML5</strong> Quiz</a></li>
				<li><a href="http://www.w3schools.com/quiztest/quiztest.asp?qtest=CSS">W3Schools <strong>CSS</strong> Quiz</a></li>
				<li><a href="http://www.w3schools.com/quiztest/quiztest.asp?qtest=JavaScript">W3Schools <strong>JS</strong> Quiz</a></li>
			</ul>
			<ul rel="servidor">
				<li><a href="http://www.w3schools.com/quiztest/quiztest.asp?qtest=ASP">W3Schools <strong>ASP</strong> Quiz</a></li>
				<li><a href="http://www.w3schools.com/quiztest/quiztest.asp?qtest=PHP">W3Schools <strong>PHP</strong> Quiz</a></li>
				<li><a href="http://www.w3schools.com/quiztest/quiztest.asp?qtest=SQL">W3Schools <strong>SQL</strong> Quiz</a></li>
			</ul>
		</article>
		<article id="reglas_quiz">
			<header><h2>quiz del cine</h2></header>
		</article>
	</main>

	<!-- MENU DE NAVEGACION
	-------------------------------->
	<nav id="nav_quiz">
		<ul>
			<li class="btn_quiz"><a href="?quizz=quiz_video">Esta peli ya la he visto</a></li>
			<li class="btn_quiz"><a href="?quizz=quiz_audio">¿A que me suena esto?</a></li>
			<li class="btn_quiz"><a href="?quizz=quiz_image">¿Quien es este actor?</a></li>
			<li class="btn_quiz">
				<datalist id="artistas">
					<select name="artistas">
						<option value="Nicolson">Jack Nicolson</option>
						<option value="Bardem">Javier Bardem</option>
						<option value="Penelope">Penelope Cruz</option>
					</select>
				Porfavor especifica un artista: <!-- navegadores no compatibles con datalist -->
				</datalist>
				<label for="quiz_art"><a href="">Cuanto sabes de</a></label><!-- cargamos la peticion de url al server con JS -->
				<input type="text" name="quiz_art" id="quiz_art" list="artistas">
			</li>
		</ul>
	</nav>
	<div class="error fatal">
		<p>TIENES QUE ELEGIR UN ARTISTA</p>
	</div>
	<div class="error artist">
		<p>SOLO ARTISTAS</p>
		<ul>
			<li>Penelope Cruz</li>
			<li>Jack Nicolson</li>
			<li>Javier Bardem</li>
		</ul>
	</div>
</div>