<template>
<!-- Page de l'article selectionne par l'utilisateur -->
  <div class="main" v-if="token!=null&&post">
    <div class="login-box">
      <h2  class="cardTitle animate__animated animate__bounce textShadow ">{{ post.title }}</h2>
      <!-- DEBUT ZONE IMAGE-->  
        <div class="imageRow">
          <div  id="imagePreview">
            <a id="imageTotal" :href="post.image">
              <img v-if="post.image" id="imagePostFocus" :src="post.image" alt="">
              <!-- v-if necessaire pour eviter d avoir un residuel (point ou ligne noire) lié au STYLE : Border de imagePostFocus -->
            </a>
          </div>
          <p class="postContent textShadow">{{ post.content }}</p>
        </div>
      <!-- FIN ZONE IMAGE-->  
                <p class="auteurArticle" v-if="post.User"> par: {{post.User.firstName}}</p>  
        <!-- DEBUT ZONE LIKES-->    
        <div class="rowLike">
          <a class="rowLike__icone" type="submit" @click.prevent="likePost">
            <!-- Icone differente si l'utilisateur a like ou non-->
            <i class="fas fa-thumbs-up" v-if="asLiked == true"></i>
            <i class="far fa-thumbs-up" v-if="asLiked == false"></i>
          </a>
          <p class="rowLike__numbers">  {{ numbersLikes }} </p> 
        </div>
        <div class="likes"></div>
        <!-- FIN ZONE LIKES-->
        <!-- Boutton accessible par l'auteur de l'article seulement -->
        <a class="showButton"  v-if="author==true" type="submit" @click="showButton(post.id)">Modifier</a>
        <a  class="showButton" v-if="author==true" @click="deletePublication">SUPPRESSION</a>
        <!-- Debut ZONE COMMENTAIRE -->
        <div>
          <p class="toDoForm">Laissez un commentaire:</p>
          <div class="formButtonAlignement">
             <textarea class="form-control form-control__contenu" id="content" v-model="reply" rows=8  required placeholder="Ecrivez votre contenu ici ( maximum 255 characteres)" @keydown.enter="createCommentary"></textarea>
             <a type="submit" @click.prevent="createCommentary" class="buttonShake showButton">Partager</a>
          </div>
        </div>
        <!-- Fin ZONE COMMENTAIRE -->
        <!-- Si commentaire rattache et modere pour cette article: -->
        <p class="infoComment" v-if="comment.length >= 1">Cet article a été commenté:</p>
        <div id="comment" v-for="commentary in comment" :key="commentary.id">
          <p>{{ commentary.content }}</p>
          <div class="infoComment__attribute">
             <p class="infoComment__attribute--dateStamp">poste le: {{ commentary.createdAt.split("-")[2].split("T")[0] }}/{{ commentary.createdAt.split("-")[1] }}/{{ commentary.createdAt.split("-")[0] }}</p>
             <p class="infoComment__attribute--name">par: {{ commentary.User.firstName }}</p>
          </div>
        </div>
    <img class="logoProfile" src="../assets/logos/icon-left-font-monochrome-black.svg" alt="">
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  el: '#animated-number-demo',
   data() {
      return {
        token: localStorage.getItem('token'),
        post: {},
        posts:'',
        user_id: localStorage.getItem("id"),
        comment:'',
        reply:'',
        image:'',
        connexion: false,
        post_id:'',
        like:'',
        numbersLikes:'',
        asLiked: false,
        author: false
      };
    },
   created(){
        this.getOnePublication()
   },
   methods: {
      //Affiche l'article selectione depuis la page HOME
      getOnePublication(){
        const token = localStorage.getItem('token');
        let url = window.location.href.split("?");
        let id = url[1].split("=");
        this.post_id = id[1];//pour delete publication later
        axios.get("http://localhost:3000/post/"+id[1], {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(res => {
              this.post = res.data.post
              if(this.post.UserId == this.user_id){
                this.author = true;
              }
              this.comment = res.data.comment;
              this.like = res.data.like;
              this.numbersLikes = this.like.length
              for(let likeUser in this.like ){
                if(this.like[likeUser].UserId == localStorage.getItem("id")){
                  this.asLiked = true
                  //cible elemtn du a changer la class toggleclass // atclass remove class
                }
              }
          })
          .catch(error => console.log({error}));
      },
      //Boutton de Suppression de l'article par son auteur seulement
      deletePublication(){
        const token = localStorage.getItem('token');
        const data = {
          currentUser: this.user_id,
          postId: this.post_id
        }
        axios.post("http://localhost:3000/post/deletePost", data, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(() => {
            alert("Votre article a été supprimé.")
              window.location.replace("/")
          })
          .catch(error => console.log({error}));
      },
      //Boutton de MOdification de l'article par son auteur seulement
      modifyPublication(){
      const token = localStorage.getItem('token');
      const data = {
        currentUser: this.user_id,
        postId: this.post_id
      }
      axios.put("http://localhost:3000/updatePost", data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            window.location.reload()
        })
        .catch(error => console.log({error}));
      },
      //Creation d'un commentaire lie a cette article
      createCommentary(){
            const data = {
              currentUser: this.user_id,
              postId: this.post_id,
              comment:this.reply
      }
            axios.post("http://localhost:3000/comment/reply", data, {headers:{Authorization: "Bearer " + localStorage.token}})
			.then((res) => {
        //Condition: si admin, pas besoin de validé l'article
        if(res.data.status == 1){
        alert('Commentaire publié.');
        } else{
				alert('Votre commentaire a bien été créé. Il va être validé prochainement.');
        }
        location.reload();
			})
            .then(() => this.$router.push("/"));
      },
      //Redirection vers la page Modification de l'article pour et par son auteur
        showButton(id){
          window.location.href='/modifypost/?post='+id
      },
      //Permet de liker ou d'annuler un like/ 1 like permis par utilisateur
      likePost(){
        axios.post("http://localhost:3000/api/auth/likePost", { postId: this.post_id}, {headers:{Authorization: "Bearer " + localStorage.token}})
        .then((res) => {
          //Condition: si admin, pas besoin de validé l'article
            if(res.data.newLike !== null){
              alert("Vous avez LIKÉ cet article!");
              location.reload();
            } else{
              alert("Article DISLIKÉ!");
              location.reload();
            }
        })
      }
  }
}
</script>

<style lang="scss" scoped>
$base-color: #fff;
.imageRow{
  display: flex;
}
#imagePostFocus{
  border: 1px solid black;
  // width: 28rem;
  margin: 1rem;
  max-height: 8rem;
  transition: transform .5s;
  &:hover{
    -webkit-transform:scale(1.08); /* Safari et Chrome */
    -moz-transform:scale(1.08); /* Firefox */
    -ms-transform:scale(1.08); /* Internet Explorer 9 */
    -o-transform:scale(1.08); /* Opera */
    transform:scale(1.08);
  }
}
#imagePreview{
  display: flex;
}
 #imageTotal{
  display: flex; 
  &:hover{ // Empecher l'effet apporter par les <a> 
      background: none;
      box-shadow: none;
  }
 }
#comment{
color: $base-color;
border: 1px solid $base-color;
text-align: left;
margin-bottom: 1rem;
padding: 1rem 0 1rem 1rem;
transition: transform .5s;
overflow:hidden;
  &:hover{
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
}
.infoComment{
  font-style:italic;
  text-align: left;
  color: $base-color;
  &__attribute{
    text-align: right;
    padding-right:1rem ;
    &--dateStamp{
        font-style: italic;
        font-size: .8rem;
        margin: 0;
    }
    &--name{
      font-family: "Oleo+Scrip";
        margin-bottom: 0;
    }
  }
}
.auteurArticle{
  font-family: "Oleo+Scrip";
  margin-top: 1rem;
  text-align: right;
  color: $base-color;
}
.postContent{
  font-family: "Playball", sans-serif;
      word-spacing: .4rem;
    letter-spacing: .15rem;
    display: flex;
    align-items: center;
}
.toDoForm{
  color: $base-color;
  text-align: left;
}
.animate__bounce{
  animation-delay: .5s;
}
.buttonShake{
  display: inline-block;
  margin: 0 0.5rem;
  animation: rubberBand; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1s; /* don't forget to set a duration! */
  animation-delay: 3s;
  margin-top: 1rem;
}
.form-control{
  width: 55%;
}
.formButtonAlignement{

    display: flex;
    flex-direction: column;
    align-items: center;
}
.rowLike{
  display: flex;
  justify-content: flex-end ;
  align-items: center;
    &__icone{
      color: $base-color;
      padding: 1rem;
        &:hover{
          background: none;
          border-radius: 1px ;
          box-shadow: none;
          color: $base-color;
          transform:scale(1.5);
    }
  }
    &__numbers{
      color: $base-color;
  }
}
//MEDIA QUERIES
@media screen and (max-width: 980px){
  .imageRow{
    flex-direction: column;
}
.postContent{
  justify-content: center;
}
#imagePreview{
  justify-content: center;
}
}
</style>