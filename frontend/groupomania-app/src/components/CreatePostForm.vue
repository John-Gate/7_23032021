<template>
<div class="login-box">
  <h2 class="cardTitle">Creer Un Nouvel Article</h2>
  <form v-if="connexion">
    <div class="form-group">
            <label for="title" class="labelTitle">Titre</label>
            <input type="text" class="form-control " id="title" v-model="post.title" required placeholder="Ecrivez votre titre">
        </div>
          <div class="form-group">
            <label for="content" class="labelTitle">Contenu</label>
            <textarea class="form-control form-control__contenu" id="content" v-model="post.content" rows=8  required placeholder="Ecrivez votre contenu ici ( maximum 255 characteres)" @keydown.enter="createPost"></textarea>
        </div>
    <button type="submit" @click.prevent="createPost">Partager</button>
      <a href="/Profile" class="linkInscription">Retour à Mon Profil</a>
  </form>
</div>
</template>

<script>
import axios from "axios";
//import jwt from 'jsonwebtoken'
export default {
    name: 'CreatePostForm',
    data () {
        return {
            post:{
              title: '',
              content: '',
              currentUser: ''
            },
            connexion:false
        }
    },
      mounted(){
        // Verifie si user bien connecte
        this.connectedUser()
   },
    methods:{
       connectedUser(){                                       
      if(sessionStorage.token == undefined){
        this.approuvedConnexion = false;
        this.$router.push({ name:'Home' })
      } else {
        this.connexion = true;
        //const token = sessionStorage.token         
        // let decodedToken = jwt.verify(token, process.env.VUE_APP_JWT_AUTH_SECRET_TOKEN);
        // console.log(decodedToken)       
        this.post.currentUser = 1
      }
    },
    createPost() {      
			axios.post("http://localhost:3000/post/createPost", this.post, {headers:{Authorization: "Bearer " + sessionStorage.token}})
			.then(() => {
				alert('Votre article a bien été créé. Il va être validé prochainement.');
			})
			.then(() => this.$router.push("/"));
		}
    }
}
</script>

<style scoped lang="scss">
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

.formControl{
    width: 323px;
}
input:active
{
    border: none;
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
  background: linear-gradient(#141e30, #243b55);
}
.cardTitle{
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
.labelTitle{
    --fill-color: #fff;
    position: relative;
    display: block;
    padding: 4px 0;
    font: 700 1.5rem Raleway, sans-serif;
    text-decoration: none;
    text-transform: uppercase;
    -webkit-text-stroke: 2px var(--fill-color);
    background: linear-gradient(var(--fill-color) 0 100%) left / 0 no-repeat;
    color: transparent;
    background-clip: text;
    transition: 0.5s linear; 
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 445px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background-image: linear-gradient(#fc2700, #000000);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
  opacity: 0.8;
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

.form-control{
  width: 350px;
}
</style>

