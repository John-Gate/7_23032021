<template>
  <div class="main" v-if="token!=null">
     <div class="login-box">
       <h2  class="cardTitle animate__animated animate__bounce textShadow ">{{ post.title }}</h2>
      <div class="imageRow">
         <div  id="imagePreview">
           <a id="imageTotal" href="">
           <img id="imagePostFocus" src="" alt="">
           </a>
         </div>
         <p class="postContent textShadow">{{ post.content }}</p>
      </div>
      <p class="auteurArticle">par: {{ post.User.firstName }}</p>
 <div class="rowLike">
        <a class="rowLike__icone" type="submit" @click.prevent="likePost">
        <i class="fas fa-thumbs-up" v-if="asLiked == true"></i>
        <i class="far fa-thumbs-up" v-if="asLiked == false"></i>
        </a>
      <p class="rowLike__numbers">  {{ numbersLikes }} </p> 
 </div>
  <div class="likes">
  </div>
<!-- FIN ZONE LIKES/DISLIKES-->
       <a class="showButton"  v-if="author==true" type="submit" @click="showButton(post.id)">Modifier</a>
       <a  class="showButton" v-if="author==true" @click="deletePublication">SUPPRESSION</a>
       <div>
          <p class="toDoForm">Laissez un commentaire:</p>
         <div class="formButtonAlignement">
            <textarea class="form-control form-control__contenu" id="content" v-model="reply" rows=8  required placeholder="Ecrivez votre contenu ici ( maximum 255 characteres)" @keydown.enter="createCommentary"></textarea>
            <a type="submit" @click.prevent="createCommentary" class="buttonShake showButton">Partager</a>
         </div>
       </div>
          <p class="infoComment" v-if="comment.length >= 1">Cet article a été commenté:</p>
        <div id="comment" v-for="commentary in comment" :key="commentary.id">
          <p>{{ commentary.content }}</p>
         <div class="infoComment__attribute">
            <p class="infoComment__attribute--dateStamp">poste le: {{ commentary.createdAt.split("-")[2].split("T")[0] }}/{{ commentary.createdAt.split("-")[1] }}/{{ commentary.createdAt.split("-")[0] }}</p>
            <p class="infoComment__attribute--name">par: {{ commentary.User.firstName }}</p>
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
        post: '',
        posts:'',
        User:{
          firstName:''
        },
        user_id:sessionStorage.getItem("id"),
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
   mounted(){
        this.getOnePublication()
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
      getOnePublication(){
        const token = sessionStorage.getItem('token');
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
            
              const data = res.data;
              this.post = data.post;
              console.log(this.post)
              if(this.post.UserId == this.user_id){
                this.author = true;
              }
              this.comment = data.comment;
              this.like = data.like;
              this.numbersLikes = this.like.length
              for(let likeUser in this.like ){
                if(this.like[likeUser].UserId == sessionStorage.getItem("id")){
                  this.asLiked = true
                  //cible elemtn du a changer la class toggleclass // atclass remove class
              }
              }
              if(this.post.image){
                let image = document.getElementById('imagePostFocus');
                image.src = this.post.image
                image.alt = "Apercu de l image" 
                let link = document.getElementById('imageTotal');
                link.href = this.post.image;
              }
          })
          .catch(error => console.log({error}));
      },
      
      deletePublication(){
        const token = sessionStorage.getItem('token');
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
              window.location.replace("/")
          })
          .catch(error => console.log({error}));
      },

      modifyPublication(){
      const token = sessionStorage.getItem('token');
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

      createCommentary(){
            const data = {
              currentUser: this.user_id,
              postId: this.post_id,
              comment:this.reply
      }
            axios.post("http://localhost:3000/comment/reply", data, {headers:{Authorization: "Bearer " + sessionStorage.token}})
			.then((res) => {
        //Condition: si admin, pas besoin de validé l'article
        if(res.data.status == 1){
        alert('Commentaire publié.');
        }
        else{
				alert('Votre commentaire a bien été créé. Il va être validé prochainement.');
        }
			})
            .then(() => this.$router.push("/"));
      },

        showButton(id){
          window.location.href='/modifypost/?post='+id
      },

      likePost(){
            axios.post("http://localhost:3000/api/auth/likePost", { postId: this.post_id}, {headers:{Authorization: "Bearer " + sessionStorage.token}})
			.then((res) => {
        //Condition: si admin, pas besoin de validé l'article
        console.log(res.data.newLike)
          if(res.data.newLike !== null){
            alert("LIKER!");
            location.reload();
          }
          else{
            alert("DISLIKER!");
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
  width: 28rem;
  margin: 1rem;
  max-height: 15rem;
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
      word-spacing: .2rem;
    letter-spacing: .1rem;
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
}
.form-control{
  width: 55%;
}
.formButtonAlignement{

    display: flex;
    flex-direction: column;
    align-items: center;
}
#imageTotal:hover{ // Empecher l'effet apporter par les <a> 
  background: none;
  box-shadow: none;
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
@media screen and (max-width: 980px){
  .imageRow{
    flex-direction: column;
}
#imagePostFocus{
  width: 12rem;
}

}
</style>