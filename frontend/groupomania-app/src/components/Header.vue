

<!--Pour le moment , header direct dans App.vue

<template>
 <body>
  <ul>
    <li><a href="/Home">Accueil</a></li>
 METTRE V-IF SI CONNECTER SINON "Se Deconnecter"
    <li><a href="/Login">S'IDENTIFIER</a></li>
    <li><a href="/Inscription">S'Inscrire</a></li>
  </ul>
</body>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway:400,400i,700");

body {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}
ul {
  display: flex;
  align-items: start;
  list-style-type: none;

  li {
    padding: 6px 6px;
  }
  a {
    --fill-color: #fc2700;
    position: relative;
    display: block;
    padding: 4px 0;
    font: 700 3rem Raleway, sans-serif;
    text-decoration: none;
    text-transform: uppercase;
    -webkit-text-stroke: 2px var(--fill-color);
    background: linear-gradient(var(--fill-color) 0 100%) left / 0 no-repeat;
    color: transparent;
    background-clip: text;
    transition: 0.5s linear; 
    }
  a:hover {
    background-size: 100%;
    }
}
</style>-->