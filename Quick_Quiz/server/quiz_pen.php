<article class="flotarL" id="quizz_penelope">
	<header>
		<h1>¿cuanto sabes de pe?</h1>
	</header>
	<!-- CUESTIONARIO SOBRE PENELOPE CRUZ -->
	<form action="server" method="GET">
		<!-- MONTH -->
		<p>
			<label for="month_birth">¿En que mes nació?</label>
			<input type="month" id="month_birth" name="q_birth"
			title="meses del año en el que nacio Penelope Cruz" min="1900-01" max=""/>
		</p>

		<!-- SELECT -->
		<p>
			<label for="select_oscar">Premio oscars a la mejor actriz</label>
			<select id="select_oscar" name="q_oscar" size="1">
				<optgroup label="peliculas">
					<option>Nine</option>
					<option>Vicky Cristina Barcelona</option>
					<option>Volver</option>
				</optgroup>
			</select>
		</p>

		<!-- CHECKBOX -->
		<fieldset>
			<legend>Curiosidades</legend>
			<p><input name="q_anecdota" id="check_anecdota" type="checkbox" ><label for="check_anecdota">su madre es budista y su padre ateo</label></p>
			<p><input name="q_anecdota" id="check_anecdota" type="checkbox" ><label for="check_anecdota">trabajó en el circo como bailarina</label></p>
			<p><input name="q_anecdota" id="check_anecdota" type="checkbox" ><label for="check_anecdota">Su hermana es bailarina de la compañía de Joaquín Cortés</label></p>
		</fieldset>

		<!-- RADIO-BUTTON -->
		<fieldset>
			<legend>Pelicula</legend>
			<figure>
				<img src="multimedia/Penelope_Cruz.jpg" alt="pelicula de Penelope Cruz">
			</figure>
			<p><input name="q_peli" id="check_peli" type="radio" ><label for="check_peli">No te muevas</label></p>
			<p><input name="q_peli" id="check_peli" type="radio" checked="checked"><label for="check_peli">Sahara</label></p>
			<p><input name="q_peli" id="check_peli" type="radio" ><label for="check_peli">Bandidas</label></p>
		</fieldset>
	</form>
</article>