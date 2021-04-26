<template>
<div class="login-box">
  <h2 class="cardTitle">Connexion à Groupomania</h2>
  <form>
    <div class="user-box">
      <input type="email" name="" required="" v-model="dataLogin.email">
      <label>Email</label>
    </div>
    <div class="user-box" @keydown.enter="logIn">
      <input type="password" name="" required="" v-model="dataLogin.password">
      <label  >Mot de passe</label>
    </div>
    <a @click="logIn">Se Connecter</a>
      <a href="/Inscription" class="linkInscription">Pas encore inscrit?</a>
  </form>
</div>
</template>
<script>
import axios from "axios"
export default {
  name: "Login",
   data() {
      return {
     dataLogin: {
                email: null,
                password: null
            }
            
    };
   },
     mounted() {
    if (sessionStorage.token) {
      this.token = sessionStorage.token;
    }
  },
  computed: {
      dateDuJour() {
        let currentTime = new Date()
        let month = currentTime.getMonth() 
        let day = currentTime.getDate()
        let year = currentTime.getFullYear()
        let tab_mois=new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
        return(day + " " + tab_mois[month] + " " + year)
		}
  },
    methods: {
    logIn() {
      if (
        this.dataLogin.email !== null || this.dataLogin.password !== null 
      ) {
        axios
          .post("http://localhost:3000/api/auth/login", this.dataLogin)
          .then(response => {
            sessionStorage.setItem('token',response.data.token)
            location.replace("/")
          })
          .catch(error => { 
            alert("Email ou Mot de Passe incorrect")
            console.log(error)
            this.revele = !this.revele
            })
      } else {
        console.log("erreur");
      }
    }
  }
}
</script>


<style lang="scss" scoped>
$base-color: #fff;
//PLaceholder en italique
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
  background: linear-gradient(#141e30, #243b55);
}
.cardTitle {
    --fill-color: #fc2700;
    position: relative;
    display: block;
    padding: 4px 0;
    font: 700 2rem Raleway, sans-serif;
    text-decoration: none;
    text-transform: uppercase;
    -webkit-text-stroke: 2px var(--fill-color);
    background: linear-gradient(var(--fill-color) 0 100%) left / 0 no-repeat;
    color: transparent;
    background-clip: text;
    transition: 0.5s linear; 
    }
.login-box {
  
  padding: 40px;
  background-image: linear-gradient(#fc2700, #000000);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
  opacity: 0.8;
  order:2;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
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

.login-box form a {
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
  letter-spacing: 4px
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


</style>