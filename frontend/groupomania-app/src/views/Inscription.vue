<template>
<div class="login-box">
  <h2 class="cardTitle textShadow">Inscription à Groupomania</h2>
  <form @keydown.enter="sendSignup">
<div class="fullBlock">
  <div class="fullBlock__form">
    <div class="fullBlock__form--icone">
      <i class="fas fa-id-card"></i>
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
            <input id="password" type="password" name="" required=""  v-model="dataSignup.password">
            <label>Mot de passe</label>
            <p class="password_textDescription">*Votre mot de passe doit contenir au moins 6 caractères dont au minimum une majuscule, une minuscule et un caractère numérique<br>**Tous les champs sont obligatoires</p>
          </div>
    </div>
  </div>
     <div class="textDescription">
          <i class="fas fa-users"></i>
         <p class="textDescription__User">Voici votre lieu de reflexion dedie a notre structure: votre  réseau social interne propre.<br> Une astuce, une idée, ou encore une pensée? Pourquoi ne pas echanger et en faire profiter vos collegues? <br>Simplement apres vous etre inscrit, vous pourrez vous connectez, a l'aide de votre e-mail et de votre mot de passe, afin de voir les derniers articles parrus, et meme les commenter! </p>
     </div>
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

.user-box{
  width:90%
}
.password_textDescription{
  color: $base-color;
  font: .9rem italic;
  margin-top: 0;
  text-align: left;
  opacity: 0.8;
  
}
.fullBlock{
  display: flex;
  color: red;
  flex-direction: row;
    &__form{
      width: 150%;
      display: flex;
      flex-direction: column;
      &--icone{
        position: relative;
      }
    }
}

.fullBlock {
  text-align: left;
}
.fa-id-card {
  position: absolute;
  color: $base-color;
  right: 2.5rem;
  font-size: 2.5em;
  transform: rotate(30deg);
}
.fa-users {
  position: absolute;
  color: $base-color;
  right: 5rem;
  font-size: 2.5em;
}
</style>