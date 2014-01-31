<article class="flotarL" id="quizz_nicolson">
	<header>
		<h1>¿cuanto sabes de jack?</h1>
	</header>
	<!-- CUESTIONARIO SOBRE JACK NICOLSON-->
	<form action="server" method="GET">
		<!-- MONTH -->
		<p>
			<label for="month_birth">¿En que mes nació?</label>
			<input type="month" id="month_birth" name="q_birth"
			title="meses del año en el que nacio Jack Nicholson" min="1900-01" max=""/>
		</p>

		<!-- SELECT -->
		<p>
			<label for="select_oscar">Premio oscar al mejor actor</label>
			<select id="select_oscar" name="q_oscar" size="1">
				<optgroup label="peliculas">
					<option>El honor de los Prizzi</option>
					<option>Alguien voló sobre el nido del cuco</option>
					<option>Chinatown</option>
				</optgroup>
			</select>
		</p>

		<!-- CHECKBOX -->
		<fieldset>
			<legend>Curiosidades</legend>
			<p><input name="q_anecdota" id="check_anecdota" type="checkbox" ><label for="check_anecdota">Sus familiares murieron en el Holocausto</label></p>
			<p><input name="q_anecdota" id="check_anecdota" type="checkbox" ><label for="check_anecdota">Rompio voluntariamente la Puerta en la escena del resplendor</label></p>
			<p><input name="q_anecdota" id="check_anecdota" type="checkbox" ><label for="check_anecdota">Empezó tomando clases de teatro</label></p>
		</fieldset>

		<!-- RADIO-BUTTON -->
		<fieldset>
			<legend>Pelicula</legend>
			<figure>
				<img src="multimedia/Jack_Nicholson.jpg" alt="pelicula de jack nicholson">
			</figure>
			<p><input name="q_peli" id="check_peli" type="radio" ><label for="check_peli">Easy Rider</label></p>
			<p><input name="q_peli" id="check_peli" type="radio" checked="checked"><label for="check_peli">El último deber</label></p>
			<p><input name="q_peli" id="check_peli" type="radio" ><label for="check_peli">Batman</label></p>
		</fieldset>
	</form>
</article>