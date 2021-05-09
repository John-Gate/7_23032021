<template>
<div class="login-box">
  <h2 class="cardTitle">Mon Profil<div v-if=" role == 2 ">administrateur</div></h2>
  <form>
<div class="infoUser">
<table>
  <tr>
    <th>Prénom :</th>
    <td>{{ firstName }}</td>
  </tr>
  <tr>
    <th>Nom :</th>
    <td>{{ lastName }}</td>
  </tr>
  <tr>
    <th>Date d'inscription :</th>
    <td>{{ createdAt.split("-")[2] }}/{{ createdAt.split("-")[1] }}/{{ createdAt.split("-")[0] }}</td>
  </tr>
</table>
  <div v-if=" role == 2 ">
      <table>
  <tr>
    <th>Nombre d'articles Totales:</th>
    <td>{{ postNumber }}</td>
  </tr>
  <tr>
    <th>Nombre de commentaires Totales:</th>
    <td>{{ commentNumber }}</td>
  </tr>
  <tr>
    <th>Nombre d'utilisateurs Totales:</th>
    <td>{{ userNumber }}</td>
  </tr>
</table>
    <h2>Nouveaux Utilisateurs</h2>
    <p v-if="users.length == 0">Aucun Nouvel Utilisateur</p>
    <!-- Voir pour Changer la classe -->
    <div class="articles" id="user" v-for="user in users" :key="user.userId">
      <table>
        <tr>
    <th>Prénom :</th>
    <td>{{ user.firstName }}</td>
  </tr>
  <tr>
    <th>Nom :</th>
    <td>{{ user.lastName }}</td>
  </tr>
  <tr>
    <th>Email :</th>
    <td>{{ user.email }}</td>
  </tr>
  <tr>
    <th>Créer le:</th>
    <td>{{ user.createdAt.split("-")[2] }}/{{ user.createdAt.split("-")[1] }}/{{ user.createdAt.split("-")[0] }}</td>
  </tr>
      </table>
            <button class="showButton" type="submit" @click.prevent="validateUser(user.id)">Authoriser l'utilisateur</button>
        </div>
    <h2>Nouveaux Articles</h2>
    <p v-if="posts.length == 0">Aucun Nouvel Article</p>
    <div class="articles" id="post" v-for="post in posts" :key="post">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      <div class="diplayAttribute">
        <p class="dateStamp">Créé le: {{ post.createdAt.split("-")[2].split("T")[0] }}/{{ post.createdAt.split("-")[1] }}/{{ post.createdAt.split("-")[0] }}</p>
      </div>
      <p class="auteur">par : {{ post.User.firstName }} {{ post.User.lastName }}</p>
        <button class="showButton" type="submit" @click.prevent="validatePost(post.id)">Authoriser la Publication</button>
    </div>
    <h2>Nouveaux Commentaires</h2>
    <p v-if="comments.length == 0">Aucun Nouveau Commentaire</p>
    <!-- Voir pour Changer la classe -->
    <div class="articles" id="comment" v-for="comment in comments" :key="comment">
      <p>{{ comment.content }}</p>
      <!-- <p>par : {{ comment.User.firstName }} {{ comment.User.lastName }}</p> -->
      <div class="diplayAttribute">
        <p class="dateStamp">Créer le: {{ comment.createdAt }}</p>
        <button class="showButton" type="submit" @click.prevent="validateComment(comment.id)">Authoriser le commentaire</button>
      </div>
      <!-- <p class="autheur">par : {{ comment.User.firstName }}</p> -->
    </div>
  
   
  </div>
</div>
    <a href="/Post">Créer Un Nouvel Article</a>
    <a @click="deleteUser">Supprimer Le Profil</a>
    <a href="/" >Retour a l'accueil</a>
  </form>
</div>



</template>

<script>
import axios from "axios";
export default {
    name: 'ProfilForm',
    data () {
      return {
          token: sessionStorage.getItem('token'),
           user_id:sessionStorage.getItem("id"),
           posts: '',
           post_id:'',
           users: '',
           user: '',
           comments:'',
           email:'',
           firstName:'',
           lastName:'',
           createdAt:'',
           role:'',
           userNumber:'',
           postNumber:'',
           commentNumber:''
        };
    },
     mounted(){
       this.profileUser(),
       this.moderatePost(),
       this.moderateUser(),
       this.moderateComment(),
       this.getStats()  
   },
    methods:{
      profileUser(){
        const token = sessionStorage.getItem('token');
        const user_id = sessionStorage.getItem("id");
        axios.get("http://localhost:3000/api/auth/infouser/"+user_id, {
          headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(res => {
            const data = res.data;
              this.firstName = data.firstName;
              this.lastName = data.lastName;
              this.createdAt = data.createdAt;
              this.role = data.Role;
              if(this.user.UserId == this.user_id){
                this.author = true;
              }
          })
          .catch(error => console.log({error}));
      },

      moderatePost(){
        const token = sessionStorage.getItem('token');
          axios.get("http://localhost:3000/admin/showPost", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                const data = res.data;
                 if(typeof data == 'object'){
                  this.posts = data;
                }
            })
            .catch(error => console.log({error}));
      },

      validatePost(id){
         axios.put("http://localhost:3000/admin/postModeration/"+ id,null
          , {
           headers: {
                       'Content-Type': 'application/json',
                       'Authorization': 'Bearer ' + this.token
                   }
         } )
                    .then(() => {
                        location.replace(location.origin);
                    })
                    .catch((error) => console.log(error));
      },

      moderateUser(){
        const token = sessionStorage.getItem('token');
            axios.get("http://localhost:3000/admin/showUser", {
              headers: {
                'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  }
              })
              .then(res => {
                const data = res.data;
                console.log(typeof data)
                if(typeof data == 'object'){
                  this.users = data;
                }
              })
              .catch(() => alert("Ceci est un message a modifie")); // changer pour l alerte correspondante ()
      },

      validateUser(id){
         axios.put("http://localhost:3000/admin/userModeration/"+ id,null
          , {
           headers: {
                       'Content-Type': 'application/json',
                       'Authorization': 'Bearer ' + this.token
                   }
         } )
                    .then(() => {
                        location.replace(location.origin);
                    })
                    .catch((error) => console.log(error));
      },

      moderateComment(){
      const token = sessionStorage.getItem('token');
        axios.get("http://localhost:3000/admin/showComment", {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(res => {
              const data = res.data;
               if(typeof data == 'object'){
                  this.comments = data;
                }
          })
          .catch(error => console.log({error}));
      },
      validateComment(id){
        axios.put("http://localhost:3000/admin/commentModeration/"+ id,null
          , {
           headers: {
                       'Content-Type': 'application/json',
                       'Authorization': 'Bearer ' + this.token
                   }
         } )
                    .then(() => {
                        location.replace(location.origin);
                    })
                    .catch((error) => console.log(error));
      },
      getStats(){
 const token = sessionStorage.getItem('token');
          axios.get("http://localhost:3000/admin/statistics", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                const data = res.data;
                let userStats = data.user.length;
                this.userNumber = userStats;
                let postStats = data.post.length;
                this.postNumber = postStats;
                let commentStats = data.comment.length;
                this.commentNumber = commentStats;
            })
            .catch(error => console.log({error}));
      },
      deleteUser(){
        const data = {
          currentUser: this.user_id
        }
        axios.put("http://localhost:3000/api/auth/deleteUser", data, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.token}`
              }
          })
          .then(res => {
            console.log(res)
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('name');
              sessionStorage.removeItem('id');
              window.location.replace("/")
          })
          .catch(error => console.log({error}));
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

.infoUser{
  color:#FFF;
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

a{
  cursor: pointer;
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
</style>