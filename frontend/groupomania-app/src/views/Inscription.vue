<template>
<div class="login-box">
  <h2 class="cardTitle">Inscription à Groupomania</h2>
  <form @keydown.enter="sendSignup">
    <div class="user-box" >
      <input type="lastName" name="" required="" v-model="dataSignup.lastName">
      <label>Nom</label>
    </div>
    <div class="user-box">
      <input type="firstName" name="" required="" v-model="dataSignup.firstName">
      <label>Prénom</label>
    </div>
    <div class="user-box">
      <input type="email" required="" name="email" v-model="dataSignup.email">
      <label for="email">Email</label>
    </div>
    <div class="user-box">
      <input type="password" name="" required=""  v-model="dataSignup.password">
      <label>Mot de passe</label>
      <p class="textDescriptionUser">Votre mot de passe doit contenir au moins /// caractères dont au moins un chiffre, avec un mélange de lettres majuscules et minuscules</p>
    </div>
    <a @click="sendSignup" type="submit">
      S'Inscrire
    </a>
      <a href="/Login" class="linkInscription">Déjà inscrit?</a>
  </form>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "Signup",
    data() {
        return {
            dataSignup: {
                lastName: null,
                firstName: null,
                email: null,
                password: null
            }
        };
    },
    methods: {
        sendSignup() {
              if (
                (this.dataSignup.email !== null ||
                    this.dataSignup.lastName !== null ||
                    this.dataSignup.firstName !== null ||
                    this.dataSignup.password !== null) 
            ) {
                axios
                    .post(
                        "http://localhost:3000/api/auth/signup",
                        this.dataSignup
                    )
                    .then(() => {
                        location.replace(location.origin);
                    })
                    .catch((error) => console.log(error));
            } else {
                alert(
                    "Le mot de passe doit contenir de 8 à 15 caractères,au moins une lettre minuscule, une lettre majuscule, un chiffre et un de ces caractères spéciaux: $ @ % * + - _ !"
                );
            }
        },
    },
};
</script>
<style lang="scss" scoped>
$base-color: #fff;

.textDescriptionUser{
  color: $base-color;
  font-style:italic;
  margin-top: 0;
  text-align: left;
  opacity: 0.8;
}
</style>