<template>
<body>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/Login">Login</router-link>|
    <router-link to="/Comments">Comments</router-link>|
    <router-link to="/ModifyPost">ModifyPost</router-link>|
    <router-link to="/Post">Post</router-link>|
    <router-link to="/Profile">Profile</router-link>|
    <router-link to="/Reply">Reply</router-link>|
    <router-link to="/Inscription">Inscription</router-link>
  </div>

  <router-view/>
    <ul>
    <li><a href="/">Accueil</a></li>
<!-- METTRE VIF SI CONNECTER SINON "Se Deconnecter"-->
    <li><a href="/Login">S'IDENTIFIER</a></li>
    <li><a href="/Inscription">S'Inscrire</a></li>
    <li><a href="/Admin">admin</a></li>
  </ul>

</body>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@import url("https://fonts.googleapis.com/css?family=Raleway:400,400i,700");

body {
  display: flex;
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
</style>
