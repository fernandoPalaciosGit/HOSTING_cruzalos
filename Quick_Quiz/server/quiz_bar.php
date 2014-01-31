<article class="flotarL" id="quizz_bardem">
	<header>
		<h1>¿cuanto sabes de bardem?</h1>
	</header>
	<!-- CUESTIONARIO SOBRE JAVIER BARDEM -->
	<form action="server" method="GET">
		<!-- MONTH -->
		<p>
			<label for="month_birth">¿En que mes nació?</label>
			<input type="month" id="month_birth" name="q_birth"
			title="meses del año en el que nacio Penelope Cruz" min="1900-01" max=""/>
		</p>

		<!-- SELECT -->
		<p>
			<label for="select_oscar">Premio oscar al mejor actor</label>
			<select id="select_oscar" name="q_oscar" size="1">
				<optgroup label="peliculas">
					<option>Antes que anochezca</option>
					<option>No Country for Old Men</option>
					<option>Biutiful</option>
				</optgroup>
			</select>
		</p>

		<!-- CHECKBOX -->
		<fieldset>
			<legend>Curiosidades</legend>
			<p><input name="q_anecdota" id="check_anecdota" type="checkbox" ><label for="check_anecdota">fue un adolescente de estètica gótica</label></p>
			<p><input name="q_anecdota" id="check_anecdota" type="checkbox" ><label for="check_anecdota">defensor del medio ambiente y vegetariano</label></p>
			<p><input name="q_anecdota" id="check_anecdota" type="checkbox" ><label for="check_anecdota">Olvido su dialogo en  “James Bond”</label></p>
		</fieldset>

		<!-- RADIO-BUTTON -->
		<fieldset>
			<legend>Pelicula</legend>
			<figure>
				<img src="multimedia/Javier_Bardem.jpg" alt="pelicula de Javier Bardem">
			</figure>
			<p><input name="q_peli" id="check_peli" type="radio" ><label for="check_peli">Carne trémula</label></p>
			<p><input name="q_peli" id="check_peli" type="radio" checked="checked"><label for="check_peli">Mar adentro</label></p>
			<p><input name="q_peli" id="check_peli" type="radio" ><label for="check_peli">No es pais para viejos</label></p>
		</fieldset>
	</form>
</article>