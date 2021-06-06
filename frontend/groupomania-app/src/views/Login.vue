<template>
<!-- Page de Login d'un utilisteur existant et modere -->
  <div class="login-box">
    <h2 class="cardTitle textShadow">Connexion à Groupomania</h2>
    <!-- Formulaire pour le Login -->
    <form>
      <div class="user-box">
        <input type="email" name="" required="" v-model="dataLogin.email">
        <label>Email</label>
      </div>
      <div class="user-box" @keydown.enter="logIn">
        <input type="password" name="" required="" v-model="dataLogin.password">
        <label  >Mot de passe</label>
      </div>
      <img class="logoProfile" src="../assets/logos/icon-left-font-monochrome-black.svg" alt="">
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
      if (localStorage.token) {
        this.token = localStorage.token;
      }
    },
  methods: {
    //Connexion au site
    logIn() {
      if (
        this.dataLogin.email !== null || this.dataLogin.password !== null 
      ) {
        axios
          .post("http://localhost:3000/api/auth/login", this.dataLogin)
          .then(response => {
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('name', response.data.name)
            localStorage.setItem('id', response.data.userId)
             localStorage.setItem('token',response.data.token)
            location.replace("/")
          })
          .catch(error => { 
            alert("Email ou Mot de Passe incorrect")
            console.error(error)
            this.revele = !this.revele
            })
      } else {
        console.log("erreur");
      }
    }
  }
}
</script>
<style lang="scss">
</style>