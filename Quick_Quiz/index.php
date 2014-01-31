<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8"/>
	<meta name="description" content="web de preguntas sobre cine" />
	<meta name="author" content="Fernando Palacios Landi" />
	<title>Quick Quiz</title>
	<!-- ENLACES EXTERNOS / HOJAS DE ESTILO-->
	<link type="text/css" rel="stylesheet" href="css/main.css" />
	<link type="text/css" rel="stylesheet" href="css/quizzes.css" />
	<link type="text/css" rel="stylesheet" href="css/responsive.css" />
	<link type="text/css" rel="stylesheet" href="css/icon.css" />
</head>
<body>
	<section id="contenedor-ppal">
		<!-- HEADER
		-------------------------------->
		<header id="head_quiz">
			<h1>
				<a href="http://cruzalosdedos.es/Quick_Quiz/index.php">q</a>
				<span>uick</span>
				<a href="http://cruzalosdedos.es/Quick_Quiz/index.php">q</a>
				<span>uizz</span>
			</h1>
		</header>

		<!-- CARGAR EL CONTENIDO PARA CADA QUIZ
		-------------------------------->
		<?php
			if(isset($_GET['quizz'])){
				$quizz = $_GET["quizz"];
			}else{
				$quizz = "";
			}

			if ($quizz != "") {
				include "server/group_quizzes.php";
			} else {
				include "server/main.php";/*lo cargaremos al principio por defecto*/
			}
		?>

		<div id="group_foot_aside" class="groupFloat">
			<!-- AUTOR Y LICENCIAS
			-------------------------------->
			<footer id="foot_quiz">
				<article id="autor_web">
					<header>
						<h2>Acerca del Autor</h2>
					</header>
					<address>
						Escrita por: <a rel="author" href="mailto:fernandopalacioslandi@gmail.com">Mail Nando</a><br/>
						Pagina Web: <a rel="author" href="http://www.cruzalosdedos.es/">Web Nando</a><br/>
						Repositorio Web: <a rel="author" href="https://github.com/fernandoPalaciosGit/">Github Nando</a><br/>
					</address>
				</article>
				<article id="licence_cc">
					<header>
						<h2>Contenido externo: Creative Commons</h2>
					</header>
					<p><small><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/es/deed.es_ES"><img alt="Licencia de Creative Commons" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/3.0/es/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">Fernando Palacios Landi</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://cruzalosdedos.com" property="cc:attributionName" rel="cc:attributionURL">quiz about cinema</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/es/deed.es_ES">Creative Commons Reconocimiento-NoComercial-CompartirIgual 3.0 España License</a>.<br />Creado a partir de la obra en <a xmlns:dct="http://purl.org/dc/terms/" href="https://www.google.es/imghp" rel="dct:source">https://www.google.es/imghp</a>.</small></p>
				</article>
			</footer>

			<!-- MATERIAL DE DESCARGA (CONTENIDO WEB)
			-------------------------------->
			<aside id="alt_web">
				<!-- cine de descarga -->
				<article id="alt_download">
					<header>
						<h3>descargas</h3>
					</header>
					<nav>
						<ul>
							<li><a href="http://www.peliculasyonkis.com/">pelis yonkis</a></li>
							<li><a href="http://www.impawards.com/">impawards</a></li>
							<li><a href="http://www.imsdb.com/">imsdb</a></li>
						</ul>
					</nav>
				</article>
			</aside>
		</div>
	</section>
	<!-- carga jQuery desde el CDN de google -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<!-- si el CDN falla, se carga desde el servidor cliente -->
	<script>window.jQuery || document.write('<script  type="text/javascript" src="vendor/jquery-1.10.2.min.js"><\/script>')</script>
	<script text="text/javascript" src="javascript/main.js"></script>
</body>
</html>