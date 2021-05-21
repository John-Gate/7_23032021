<template>
  <div class="login-box">
    <h2 class="cardTitle textShadow">Mon Profil<div v-if=" role == 2 ">administrateur</div></h2>
    <form>
  <div class="infoUser">
   <div class="profileInfo">
      <table class="textShadow">
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
            <table class="textShadow">
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
   </div>
  </div>
  <div v-if=" role == 2 ">
          <h2 id="titleDisplay" class="textShadow">Nouveaux Utilisateurs</h2>
          <div class="infoUsersDisplay">
            <p v-if="users.length == 0">Aucun Nouvel Utilisateur</p>
            <!-- Voir pour Changer la classe -->
            <div class="articles" id="user" v-for="user in users" :key="user.userId">
<div class="infoHeight">
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
                      <th class="articles--italique">Créer le:</th>
                      <td>{{ user.createdAt.split("-")[2] }}/{{ user.createdAt.split("-")[1] }}/{{ user.createdAt.split("-")[0] }}</td>
                    </tr>
                  </table>
</div>
                <a class="showButton borderBtn" type="submit" @click.prevent="validateUser(user.id)">Authoriser l'utilisateur</a>
            </div>
          </div>
          <h2 id="titleDisplay" class="textShadow">Nouveaux Articles</h2>
          <div class="infoUsersDisplay">
            <p v-if="posts.length == 0">Aucun Nouvel Article</p>
            <div class="articles" id="post" v-for="post in posts" :key="post">
              <div class="infoHeight--post">
                <h3>{{ post.title }}</h3>
                <p>{{ post.content }}</p>
                <div  id="imagePreview"> </div>
                <div class="diplayAttribute">
                  <p class="dateStamp articles--italique" >Créé le: {{ post.createdAt.split("-")[2].split("T")[0] }}/{{ post.createdAt.split("-")[1] }}/{{ post.createdAt.split("-")[0] }}</p>
                </div>
                <p class="auteur" >par : {{ post.User.firstName }} {{ post.User.lastName }}</p>
              </div>
                <a class="showButton borderBtn" type="submit" @click.prevent="validatePost(post.id)">Authoriser la Publication</a>
            </div>
          </div>
          <h2  id="titleDisplay" class=" textShadow">Nouveaux Commentaires</h2>
          <div class="infoUsersDisplay">
            <p v-if="comments.length == 0">Aucun Nouveau Commentaire</p>
            <!-- Voir pour Changer la classe -->
            <div class="articles" id="comment" v-for="comment in comments" :key="comment">
<div class="infoHeight--comment">
                <p>{{ comment.content }}</p>
                  <p class="dateStamp articles--italique">Créé le: {{ comment.createdAt }}</p>
              </div>
                <a class="showButton borderBtn" type="submit" @click.prevent="validateComment(comment.id)">Authoriser le commentaire</a>
          </div>
          </div>
      </div>
  </div>
      <a href="/Post">Créer Un Nouvel Article</a>
      <a @click="deleteUser">Supprimer Le Profil</a>
      <a href="/" >Retour a l'accueil</a>
    </form>
  </div>
  <FooterBar></FooterBar>
</template>

<script>

import FooterBar from '../components/FooterBar';
import axios from "axios";
export default {
  
    name: 'ProfilForm',
    components:{FooterBar},
    data () {
      return {
          token: sessionStorage.getItem('token'),
           user_id:sessionStorage.getItem("id"),
           posts: '',
           post_id:'',
           users: '',
           user: '',
           comments:'',
           image:'',
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
                this.post = data;
                if(typeof data == 'object'){
                  this.posts = data;
                }
                if(this.image != null){
                let previewImg = document.getElementById('imagePreview');
                let image = document.createElement('img');
                previewImg.appendChild(image);
                image.id = "imagePostFocus"
                image.src = this.image
                image.alt = "Apercu de l image" 
                image.width = 100
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
                        location.reload();
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
                        location.reload();
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
                        location.reload();
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
          .then(() => {
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

<style  lang="scss">

$base-color: #fff;

.profileInfo{
display: flex;
justify-content: space-evenly;
font-size: 1.5rem;
}
.infoUsersDisplay{
  display: flex;
  flex-wrap: wrap;
}
.articles{
  border: 1px solid $base-color;
  padding: 1rem;
  margin:1rem;
  max-width: 24rem;
    &--italique{
      font-style: italic;
    }
}
#titleDisplay{
  padding-top:6rem;
  font-size: 2rem;
}
.infoHeight{
min-height: 150px;
  &--post{
    min-height: 205px;
  }
  &--comment{
    min-height: 115px;
  }
}

</style>