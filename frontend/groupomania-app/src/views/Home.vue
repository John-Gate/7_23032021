<template>
 <div class="main">
    <div v-if="token!=null">
      <div v-if="posts.length === 0" >
              <div class="text">Aucun contenu  </div>
      </div>
      <div v-else class="login-box">
        <h2 class="bienvenu">Bienvenu {{ name }}, voici les derniers articles parus</h2>
        <div class="articles" id="post" v-for="post in posts" :key="post.postId">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <div class="diplayAttribute">
            <p class="dateStamp">Créer le: {{ post.updatedAt }}</p>
            <button class="showButton" @click="showButton(post.id)">Voir Article</button>
          </div>
          <p class="autheur">par : {{ post.UserId }}</p>
        </div>
      </div>
    </div>
    <div v-else> 
       <div class="login-box">
        <h2>Bienvenu Sur Groupomania</h2>
        <div class="card-date">
        <p>Nous sommes le {{ dateDuJour }}</p>
        </div>
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
       getAllPublications(){
         const token = sessionStorage.getItem('token');
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
        },
        showButton(id){
          window.location.href='/PostFocus/?post='+id
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
  display: flex;
  flex-direction: column;
}

.main{
  order:2;
}
.articles{
  border: 2px solid #fff;
  color: #fff;
  margin: 5px;
  padding: 20px;
}


.login-box {
  padding: 40px;
  background-image: linear-gradient(#fc2700, #000000);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
  opacity: 0.9;
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

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, $base-color);
  animation: btn-anim1 1s linear infinite;
}

.dateStamp{
  font-style: italic;
  font-size: .8rem;
}

.showButton{
  height: fit-content;
}

.diplayAttribute{
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
}

.autheur{
  position: flex;
}
.bienvenu{
    --fill-color: #FFF;
    position: relative;
    display: block;
    padding: 4px 0;
    font: 700 3rem Raleway, sans-serif;
    text-decoration: none;
    text-transform: uppercase;
    background: linear-gradient(var(--fill-color) 0 100%) left/0 no-repeat;
    color: transparent;
}
@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, $base-color);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, $base-color);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, $base-color);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}

</style>