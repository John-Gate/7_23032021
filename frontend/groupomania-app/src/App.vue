<template>
  <div class="encapsulate">
    <router-view/>
      <div class="alignLogo">
        <a href="/">
        <img  class="logoGroupo" src="../src/assets/logos/icon-above-font-resize.png" alt="logo Groupomania">
        </a>
          <ul class="navMenu">
            <li><a href="/">Accueil</a></li>
              <li  v-if="token!=null" class="connected"><a href="/Profile">Mon Profil</a></li> 
              <li  v-if="token!=null" class="connected"><a href="/Post">Publier</a></li>  
              <li  v-if="token!=null" class="connected"><a @click="deconnexion">Se déconnecter</a></li>
            <div v-else class="notConnected">
              <li><a href="/Login" >S'IDENTIFIER</a></li> 
              <li><a href="/Inscription">S'Inscrire</a></li> 
            </div>
          </ul>
      </div>
      <div class="footerBar">
          <ul class="footerBar__list" >
            <li><i class="fas fa-satellite-dish footerBar__list--icone"></i>Contactez-nous</li>
            <li><i class="fas fa-file footerBar__list--icone"></i>Reglement</li>
            <li><i class="fas fa-pen-fancy footerBar__list--icone"></i>Modalité</li>
            <li><i class="fas fa-question footerBar__list--icone"></i>FAQ</li>
          </ul>
      </div>
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
      //Deconnexion d'un utilisateur de sa session
      deconnexion(){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('id');
        alert('Vous vous etes déconnecté. Merci de votre visite.');
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
.encapsulate{
  display: flex;
  flex-direction: column;
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
    &:hover{
      opacity: .8;
    }
}
.alignLogo{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  background: $base-color;
  opacity: 0.9;
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
  background-image: linear-gradient(#fc2700, #881515);
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
  flex-wrap: wrap;
}
ul {
  display: flex;
  align-items: start;
  list-style-type: none;
  flex-wrap: wrap;

  li {
    padding: 6px 6px;
    text-align: left;
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
.logoProfile{
  padding: 1rem;
  width: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
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
.footerBar{
  display: flex;
  justify-content: space-around;
  order: 3;
  background: #091F43;
  color: $base-color;
  
    &__list{
      display: flex;
      justify-content: space-around;
      width:100%;
      padding: 0;
        & :hover{
          transition: transform .5s;
          -webkit-transform:scale(1.1); /* Safari et Chrome */
          -moz-transform:scale(1.1); /* Firefox */
          -ms-transform:scale(1.1); /* Internet Explorer 9 */
          -o-transform:scale(1.1); /* Opera */
          transform:scale(1.1);
          cursor: pointer;
        }
        &--icone{
          padding: 1rem;
        }
    }
}
//MEDIA QUERIES
@media screen and (max-width: 1212px){
  .navMenu{
    display: block;
  }
  .alignLogo{
    flex-direction: column;
     position: static;
  }
  .notConnected{
    display: flex;
    flex-direction: column;
  }
}
@media screen and (max-width: 1024px){
  .alignLogo{
    flex-wrap: wrap;
  }
  .connected{
    flex-wrap: wrap;
  }
  .infoUsersDisplay {
    display: flex;
    justify-content: center;
}
}
@media screen and (max-width: 980px){
  .profileInfo{
    flex-direction: column;
    align-items: center;
    &__table{
      padding-top: 1rem;
    }
}
}
@media screen and (max-width: 640px){
  .logoGroupo{
    flex-wrap: wrap;
  }
  .alignLogo{
    display: block;
  }
  .blockLogoText{
    flex-direction: column;
  }
.textShadow{
    font-size: 1.5rem;
  }
  .footerBar__list{
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
}
@media screen and (max-width: 400px){
  ul{
    a{
      font-size: 2rem;
    }
  }
}
</style>
