<template>
<div class="login-box">
  <h2 class="cardTitle textShadow">Inscription à Groupomania</h2>
  <form @keydown.enter="sendSignup">
<div class="fullBlock">
  <div class="fullBlock__form">
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
            <input type="email"  name="" required="" v-model="dataSignup.email">
            <label>Email</label>
          </div>
          <div class="user-box">
            <input id="password" type="password" name="" required=""  v-model="dataSignup.password">
            <label>Mot de passe</label>
            <p class="password_textDescription">*Tous les champs sont obligatoires  <br>**Votre Nom et Prénom ne doit comporter que des lettres<br>***Votre mot de passe doit contenir au moins 6 caractères dont au minimum une majuscule, une minuscule et un caractère numérique</p>
          </div>
  </div>
     <div class="textDescription">
          <i class="fas fa-users"></i>
         <p class="textDescription__User">Voici votre lieu de reflexion dedie a notre structure: votre  réseau social interne propre.<br> Une astuce, une idée, ou encore une pensée? Pourquoi ne pas echanger et en faire profiter vos collegues? <br>Simplement apres vous etre inscrit, vous pourrez vous connectez, a l'aide de votre e-mail et de votre mot de passe, afin de voir les derniers articles parrus, et meme les commenter! </p>
     </div>
</div>
 <img class="logoProfile" src="../assets/logos/icon-left-font-monochrome-black.svg" alt="">
 
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
      //Envoit une requete d admission a valider par l'admin
      sendSignup() {
        const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
      const regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;
      const usernameRegex = /^[a-zA-Z ,.'-]+$/;
            if (
              (this.dataSignup.email !== null ||
              this.dataSignup.lastName !== null ||
              this.dataSignup.firstName !== null ||
              this.dataSignup.password !== null)&&
              regexPassword.test(this.dataSignup.password) &&
              regexEmail.test(this.dataSignup.email) &&
              usernameRegex.test(this.dataSignup.username)
            ){axios.post("http://localhost:3000/api/auth/signup",this.dataSignup)
            .then(() => {
              alert("Votre demande d'inscription a bien été enregistrée.")
              location.replace(location.origin);
            })
            .catch((error) => console.log(error));
          } else {
              alert(
                  "Veuillez verifier vos informations."
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
}
.fullBlock{
  position: relative;
  display: flex;
  color: red;
  flex-direction: row;
  text-align: left;
    &__form{
      position: relative;
      width: 150%;
      display: flex;
      flex-direction: column;
    }
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
//MEDIA QUERIES
@media screen and (max-width: 980px){
  .fa-id-card{
    position: relative;
    right: 0;
  }
  .fullBlock{
    flex-direction: column;
    &__form{
      display: flex;
      align-items: center;
      width: auto;
    }
  }
  .textDescription{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .fa-users {
    position: relative;
    right: 0;
}
}
</style>