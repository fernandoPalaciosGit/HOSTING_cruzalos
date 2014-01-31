<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
	<meta name="description" content="ejemplos basicos sobre los nuevos metodos y objetos que trae la especificacion de html5 a traves de javascript" />
	<meta name="author" content="Fernando Palacios Landi" />
	<title>HTML5 API´s de javascript</title>

	<link rel="stylesheet" href="css/shCore.css" />
	<link rel="stylesheet" href="css/shThemeRDark.css" />
	<link rel="stylesheet" href="css/main.css" />
	<link rel="stylesheet" href="css/icon_fonts.css" />
	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
	<link rel="icon" href="img/favicon.ico" type="image/x-icon" />
	<!--[if lt IE 7]>
		<p class="chromeframe">
		   You are using an <strong>outdated</strong> browser.<br/>
		   Please <a href="http://browsehappy.com/">upgrade your browser</a><br/>
		   or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.
		</p>
	<![endif]-->
	<!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<script>window.html5 || document.write('<script src="js/vendor/html5shiv.js"><\/script>')</script>
	<![endif]-->
</head>
<body>
	<div id="contenedor_web">

		<section id="web_ApisHtml5">
			<header id="mainHead">
				<h1>API´s <span id="logoHtml5" class="icon-html5" onclick="document.location.href='http://html5test.com/'">HTML5</span> avanzadas</h1>
				<p class="subtitles">funcionalidad javascript</p>
			</header>
			<nav id="navApi">
				<button data-curso="semanticaHTML5" draggable="true" class="btn">
					Actualización Semántica
				</button>
				<button draggable="true" data-curso="formHTML5" class="btn">
					Formularios
				</button>
				<button data-curso="dragDropHTML5" draggable="true" class="btn">
					Drag &amp; Drop
				</button>
				<button data-curso="geoHTML5" draggable="true" class="btn">
					Geolocalización
				</button>
				<button data-curso="localStorage" draggable="true" class="btn">
					LocalStorage
				</button>
				<button data-curso="dataHTML5" draggable="true" class="btn">
					Dataset
				</button>
				<button data-curso="videoHTML5" draggable="true" class="btn">
					Video API
				</button>
				<button data-curso="speechHTML5" draggable="true" class="btn">
					Web Speech
				</button>
				<button data-curso="historyHTML5" draggable="true" class="btn">
					History API
				</button>
				<button data-curso="hardwareHTML5" draggable="true" class="btn">
					Cámara y micrófono
				</button>
				<button data-curso="classListHTML5" draggable="true" class="btn">
					Class List
				</button>
				<button data-curso="canvasHTML5" draggable="true" class="btn">
					Canvas Básico
				</button>
				<button data-curso="canvasFrameHTML5" draggable="true" class="btn">
					Request Animation
				</button>
				<button data-curso="canvasImgHTML5" draggable="true" class="btn">
					Canvas Imágenes
				</button>
				<button data-curso="notifyHTML5" class="btn" draggable="true">
					Notificaciones
				</button>
				<button data-curso="pageVisibleHTML5" class="btn" draggable="true">
					Page Visibility
				</button>
				<button data-curso="readFilesHTML5" class="btn" draggable="true">
					Leer Archivos
				</button>
				<button data-curso="blobHTML5" class="btn" draggable="true">
					Archivos BLOB
				</button>
				<button data-curso="xhr2HTML5" class="btn" draggable="true">
					AJAX-xhr2
				</button>
				<button data-curso="uploadFilesHTML5" class="btn" draggable="true">
					UploadFiles-xhr2
				</button>
				<button data-curso="webSocketHTML5" class="btn" draggable="true">
					Web Sockets
				</button>
				<button data-curso="webWorkersHTML5" class="btn" draggable="true">
					Web Workers
				</button>
			</nav>

			<!-- MOSTRAR CONTENIDO ESPECIFICO
			******************************-->
			<div id="navigateTo">
				Arrastra aquí un elemento
			</div>

			<!-- SOBRE EL AUTOR
			******************************-->
			<footer id="footer">
				<div id="autor-footer">
					<h3>Acerca del Autor</h3>
					<address>
						Escrita por: <a rel="author" href="mailto:fernandopalacioslandi@gmail.com">Mail Nando</a> <a href="http://www.cruzalosdedos.es/cv-nando/index.html">Curriculum</a><br/>
						Pagina Web: <a rel="author" href="http://www.cruzalosdedos.es/">Web Nando</a><br/>
						Repositorio Web: <a rel="author" href="https://github.com/fernandoPalaciosGit/">Github Nando</a><br/>
						Direccion Local: <q>Mateo Fiol n&ordm;68 - Baleares - <abbr title="españa">ES</abbr></q>
					</address>
				</div>
				<small>&copy; <a rel="licence" href="http://creativecommons.org/licenses/by/2.0/">copyleft</a> 2013</small><br/>
				<a class="html5Rocks" href="http://slides.html5rocks.com/#landing-slide">HTML_5_ROCKS</a>
			</footer>
		</section>

		<div id="wrap_section_apis">
			<!-- SEMANTICA HTML5 -->
			<?php include("include_apis/others/semantica.html") ?>

			<!-- FORMULARIOS HTML5 -->
			<?php include("include_apis/others/form.html") ?>

			<!-- DRAG & DROP HTML5 -->
			<?php include("include_apis/drag&drop/drag&drop.html") ?>

			<!-- GEOLOCALIZACION HTML5 -->
			<?php include("include_apis/geo/geo.html") ?>

			<!-- LOCAL STORAGE HTML5 -->
			<?php include("include_apis/localStorage/storage.html") ?>

			<!-- DATASET HTML5 -->
			<?php include("include_apis/others/datasSet.html") ?>

			<!-- VIDEO HTML5 -->
			<?php include("include_apis/others/video.html") ?>

			<!-- SPEECH HTML5 -->
			<?php include("include_apis/others/speech.html") ?>

			<!-- HISTORY HTML5 -->
			<?php include("include_apis/others/history.html") ?>

			<!-- HARDWARE HTML5 -->
			<?php include("include_apis/others/hardware.html") ?>

			<!-- CLASSLIST HTML5 -->
			<?php include("include_apis/others/classList.html") ?>

			<!-- CANVAS BÁSICO HTML5 -->
			<?php include("include_apis/canvas/canvas.html") ?>

			<!-- ANIMATION CANVAS HTML5 -->
			<?php include("include_apis/canvas/canvasFrame.html") ?>

			<!-- ANIMATION FRAME CANVAS HTML5 -->
			<?php include("include_apis/canvas/canvasImg.html") ?>

			<!-- NOTIFICACIONES HTML5 -->
			<?php include("include_apis/others/notiications.html") ?>

			<!-- EVENTOS DE PAGINA HTML5 -->
			<?php include("include_apis/others/pageVisible.html") ?>

			<!-- LEER ARCHIVOS HTML5 -->
			<?php include("include_apis/others/readFile.html") ?>

			<!-- LEER ARCHIVOS GRANDES HTML5 -->
			<?php include("include_apis/others/blobFile.html") ?>

			<!-- PETICIONES ASINCRONAS HTML5 -->
			<?php include("include_apis/xhr2/xhr2.html") ?>

			<!-- SUBIR ARCHIVOS, PETICIONES ASINCRONAS HTML5 -->
			<?php include("include_apis/xhr2/uploadFiles.html") ?>

			<!-- WEBSOCKETS HTML5, CONEXION DE CLIENTES POR SOCKETS -->
			<?php include("include_apis/others/webSockets.html") ?>

			<!-- WEBSOCKETS HTML5, HILOS DE EJECUCION PARALELOS -->
			<?php include("include_apis/others/webWorkers.html") ?>
		</div>

		<video id="videoInitHTML5" poster="javascript:void(0)">
		<!-- codecs / tipos MIME: MP4(video/mp4), WebM(video/webm) -->
			<source src="videos/what_is_HTML5.mp4" type="video/mp4" codecs="avc1.4D401E, mp4a.40.2"></source>
			<source src="videos/what_is_HTML5.webm" type="video/webm" codecs="vp8.0, vorbis"></source>
			Tu navegador NO soporta los videos
		</video>
		<div id="controlVideo">
			<button id="play"></button>
			<button id="pause"></button>
			<button id="stop"></button>
			<progress id="progreso" value="0" max="100"></progress>
			<span id="tiempo">0 seg</span>
			<!-- debemos configurar el rango y los pasos del rango del volumen, para q coincidan con los del control del video.volume -->
			<input id="volumen" type="range" min="0" max="1" value="0" step="0.05"/>
		</div>
		<div class="lineaControles"></div>


	</div>
	<!-- carga jQuery desde el CDN de google -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<!-- si el CDN falla, se carga desde el servidor cliente -->
	<script>window.jQuery || document.write('<script src="js/vendors/jquery-2.0.3.min.js"><\/script>')</script>
	<script src="js/vendors/shCore.js"></script>
	<script src="js/vendors/shBrushJScript.js"></script>
	<script src="js/main.js"></script>
</body>
</html>