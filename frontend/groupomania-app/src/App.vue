<template>
<router-view/>
<div class="alignLogo">
  <a href="/"><img  class="logoGroupo" src="../src/assets/logos/icon-above-font-resize.png" alt="logo Groupomania"></a>
    <ul>
      <li><a href="/">Accueil</a></li>
      <!-- METTRE VIF SI CONNECTER SINON "Se Deconnecter"-->
      <div v-if="token!=null" class="connected">
        <li><a href="/Profile">Mon Profil</a></li>
        <li><a href="/Post">Publier</a></li>
        <li><a @click="deconnexion">Se déconnecter</a></li>
      </div>
      
      <div v-else class="notConnected">
        <li><a href="/Login" >S'IDENTIFIER</a></li>
        <li><a href="/Inscription">S'Inscrire</a></li>
      </div>
    </ul>
</div>
</template>

<script>
export default {
  data() {
      return {
        token: sessionStorage.getItem('token')
      };
    },
    methods:{
      deconnexion(){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('id');
        location.replace("/")
      }
    }
}
</script>

<style  lang="scss">
@import url("assets/css/all.css");
@import url('https://fonts.googleapis.com/css2?family=Oleo+Script&family=Playball&family=Raleway:ital,wght@0,400;0,700;1,400&display=swap');
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
$base-color: #fff;

//Placeholder en italique
::-webkit-input-placeholder { /* WebKit browsers */
   font-style:italic
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    font-style:italic
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    font-style:italic
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    font-style:italic
}
/////////////////////////

//#app se trouve dans le HTML (path => frontend\groupomania-app\public\index.html)
#app{
  display:contents;
}
.card-date{
  color: white;
}

.linkInscription{
  font-size: 11px;
}

html {
  height: 100%;
}
body {
  margin:0;
  padding:0;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.main{
  order:2;
}
.logoGroupo{
 width: 173px;
    height: 100px;
    &:hover{
      opacity: .8;
    }
}

.alignLogo{
  display: flex;
  justify-content: space-between;
}

.infoUser{
  color:$base-color;
  text-align: left;
    &__alignement{
      display: flex;
    }
     &__data{
      padding-left: 1rem;
    }
    table{
     border-spacing: 5px 15px; 
    }
    td{
      padding-left: 2rem;
    }
}

.login-box {
  padding: 40px;
  background-image: linear-gradient(#fc2700, #000000);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 1px;
  opacity: 0.9;
  order:2;
}
.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: $base-color;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid $base-color;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: $base-color;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: $base-color;
  font-size: 12px;
}

.login-box form a, .showButton {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: $base-color;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px;
  cursor: pointer;
}

.showButton{
margin-top: 0;
}
.borderBtn{
border: 1px solid $base-color;
}
.login-box a:hover {
  background: $base-color;
  color: black;
  border-radius: 5px;
  box-shadow: 0 0 5px $base-color,
              0 0 25px $base-color,
              0 0 50px $base-color,
              0 0 100px $base-color;
}
.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: $base-color;
  text-align: center;
}
.cardTitle {
    font: 700 3rem Raleway, sans-serif;
    text-transform: uppercase;

    }
    .textShadow{
    text-shadow:
#000000 1px 1px,
#000000 -1px 1px,
#000000 -1px -1px,
#000000 1px -1px;
    }
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
.connected{
  display: flex;
}
.notConnected{
  display: flex;
}
ul {
  display: flex;
  align-items: start;
  list-style-type: none;
  flex-wrap: wrap;

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
    cursor:pointer;
    }
  a:hover {
    background-size: 100%;
    }
}
.form-control{
  width: 100%;
  font-size:1.2rem;
}
   .textDescription{
  &__User{
    text-align: left;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  color: $base-color;
  flex-wrap: wrap;
  font-size: 1.5rem;
  word-spacing: .5rem;
  padding: 1rem;
 }
}
</style>
