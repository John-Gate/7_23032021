<template>
<!-- Page d'accueil pour la connexion et qui lorsque la session est ouverte, permet l'affichage des differents articles dans l'ordre du plus recent en premier -->
 <div class="main">
      <!-- Si Connecté -->
    <div v-if="token!=null">
      <!-- Si pas d'articles' -->
      <div v-if="posts.length === 0" >
        <div class="text">Aucun contenu  </div>
      </div>
      <!-- Si il y a des articles -->
      <div v-else class="login-box">
      <!-- Personnalisation du message de bienvenu-->
        <h2 class="cardTitle textShadow">Bienvenu {{ name }}</h2>
        <p class="infoBienvenu textShadow">voici les derniers articles parus: </p>
        <!-- Boucle permettant l'affichage de tous les articles valider de la BDD -->
          <div  @click="showButton(post.id)" class="articles" v-for="post in posts" :key="post.postId">
          <div id="titleArticle">
              <h2 id="postTitle">{{ post.title }}</h2>
              <p class="auteur">par: {{ post.User.firstName }}</p>
          </div>
          <p class="postContent ">{{ post.content.split(" ", 10).join(" ") }}... </p>
            <div class="diplayAttribute">
              <p class="dateStamp">Derniere modification: {{ post.updatedAt.split("-")[2].split("T")[0] }}/{{ post.updatedAt.split("-")[1] }}/{{ post.updatedAt.split("-")[0] }}</p>
              <a class="showButton" @click="showButton(post.id)">Voir Article</a>
            </div>
          </div>
       <img class="logoProfile" src="../assets/logos/icon-left-font-monochrome-black.svg" alt="">
      </div>
    </div>
    <!--Affichage si pas connecté -->
    <div v-else> 
       <div class="login-box alignHome">
        <h2 class="cardTitle textShadow">Bienvenu Sur Groupomania</h2>
        <div class="card-date">
        <p>Nous sommes le {{ dateDuJour }}</p>
        </div>
        <!-- Text de Presentation -->
        <div class="blockLogoText">
          <p class="textDescription__User">Voici votre lieu de reflexion dedie a notre structure: votre  réseau social interne propre.<br> Une astuce, une idée, ou encore une pensée? Pourquoi ne pas echanger et en faire profiter vos collegues? <br>Simplement apres vous etre inscrit, vous pourrez vous connecter, à l'aide de votre e-mail et de votre mot de passe, afin de voir les derniers articles parrus, et même les commenter! </p>
        </div>
        <img class="logoProfile" src="../assets/logos/icon-left-font-monochrome-black.svg" alt="">
      </div>
    </div>
 </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
          token: sessionStorage.getItem('token'),
          posts: '',
          connexion: false,
          name : sessionStorage.getItem("name")
        };
      },
    mounted(){
          this.getAllPublications()
    },
    computed: {
      //Affiche la date du jour 
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
      //Affiche toutes les articles
        getAllPublications(){
          const token = sessionStorage.getItem('token');
          if (token !== null){
          axios.get("http://localhost:3000/post/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                const data = res.data;
                this.posts = data;
            })
            .catch(error => console.log({error}));
          }
        },
        //Redirige vers l'article visée
        showButton(id){
          window.location.href='/PostFocus/?post='+id
        }
  }
}
</script>

<style lang="scss">
$base-color: #fff;
.blockLogoText{
   display: flex;
    justify-content: space-evenly;
    align-items: center;
    &__logo{
      padding: 1rem;
    }
}
#titleArticle{
  text-align: left;
}
#postTitle{
  font-family: "raleway";
  text-align: left;
  margin-bottom: 0%;
}
.auteur{
  font-family: "Oleo+Scrip";
  margin-top: 1rem;
}
.postContent{
  font-family: "Playball";
  font-size: 1.5rem;
  transition: transform .5s;
  color: $base-color;
}
.articles{
  border: 2px solid $base-color;
  border-radius: 5px;
  color: $base-color;
  margin: 5px;
  padding: 20px;
  transition: transform .5s;
  overflow:hidden;
  cursor: pointer;
}
.articles:hover {
-webkit-transform:scale(1.05); /* Safari et Chrome */
-moz-transform:scale(1.05); /* Firefox */
-ms-transform:scale(1.05); /* Internet Explorer 9 */
-o-transform:scale(1.05); /* Opera */
transform:scale(1.05);
box-shadow: 0 0 1px $base-color,
              0 0 2px $base-color,
              0 0 5px $base-color,
              0 0 1px $base-color;
}
.articles:hover > .postContent{
-webkit-transform:scale(1.2); /* Safari et Chrome */
-moz-transform:scale(1.2); /* Firefox */
-ms-transform:scale(1.2); /* Internet Explorer 9 */
-o-transform:scale(1.2); /* Opera */
transform:scale(1.2);
}
.dateStamp{
  font-style: italic;
  font-size: .8rem;
}
.diplayAttribute{
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
}
.infoBienvenu{
  text-align: left;
  padding:  0 1rem;
  color: $base-color;
  text-transform: uppercase;
  font:  1.5rem Raleway, sans-serif;
}
.alignHome{
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}
.spreadArticle{
  color: $base-color;
  border: 1px solid $base-color;
}
//MEDIA QUERIES
@media screen and (max-width: 1024px){
.articles:hover {
-webkit-transform:scale(1.01); /* Safari et Chrome */
-moz-transform:scale(1.01); /* Firefox */
-ms-transform:scale(1.01); /* Internet Explorer 9 */
-o-transform:scale(1.01); /* Opera */
transform:scale(1.01);
box-shadow: 0 0 1px $base-color,
              0 0 2px $base-color,
              0 0 5px $base-color,
              0 0 1px $base-color;
}
.articles:hover > .postContent{
-webkit-transform:scale(1.05); /* Safari et Chrome */
-moz-transform:scale(1.05); /* Firefox */
-ms-transform:scale(1.05); /* Internet Explorer 9 */
-o-transform:scale(1.05); /* Opera */
transform:scale(1.05);
}
}
</style>