<template>
<div class="login-box">
  <h2 class="cardTitle textShadow">Creer Un Nouvel Article</h2>
  <form v-if="connexion" enctype="multipart/form-data"> <!-- Va gere le file (supervariable) en plus du texte-->
    <div>
            <label for="title" class="labelTitle textShadow">Titre</label>
            <input type="text" class="form-control " id="title" v-model="post.title" required placeholder="Ecrivez votre titre">
    </div>
    <div>
      <label for="content" class="labelTitle textShadow">Contenu</label>
      <textarea class="form-control form-control__contenu" id="content" v-model="post.content" rows=8  required placeholder="Ecrivez votre contenu ici ( maximum 255 characteres)" @keydown.enter="createPost"></textarea>
    </div>
    <!-- ZONE IMAGE-->
    <div>
    <label for="title" class="labelTitle textShadow">Photo</label>
      <input id="imageAccess" type="file" placeholder="Ajouter une image" @change="getImage">
      <div  id="imagePreview"></div>
    </div>
    <!-- ZONE IMAGE-->
     <img class="logoProfile" src="../assets/logos/icon-left-font-monochrome-black.svg" alt="">
 
    <a type="submit" @click.prevent="createPost">Partager</a>
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
              image:'',
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
     
        this.post.currentUser = 1
      }
    },

    createPost() { 
      let formData = new FormData();
        formData.append('content', this.post.content);
        formData.append('title', this.post.title);
        formData.append('image', this.post.image);
           
			axios.post("http://localhost:3000/post/createPost", formData, {headers:{Authorization: "Bearer " + sessionStorage.token}})
			.then((res) => {
        //Si admin, pas besoin de validé l'article
        if(res.data.status == 1){
        alert('Article publié.');
        }
        else{
				alert('Votre article a bien été créé. Il va être validé prochainement.');
        }
			})
			.then(() => this.$router.push("/"));
		},

    getImage(){
        let previewImg = document.getElementById('imagePreview');
        previewImg.innerHTML = '';
        let file = document.getElementById('imageAccess').files;
        let image = document.createElement('img');
        image.file = file[0];
        previewImg.appendChild(image);
        var reader = new FileReader();
        reader.onload = (function(img){
            return function(e){
              img.src = e.target.result
              img.alt = "Apercu de l image"
              image.width = 100    //a mettre dans le css
            }
          })(image);
          reader.readAsDataURL(file[0]);
          this.post.image = file[0];
    },

    }
}
</script>

<style scoped lang="scss">

$base-color:#FFF;

.formControl{
    width: 323px;
}
input:active
{
    border: none;
}
.labelTitle{
    display: block;
    padding: 4px 0;
    font: 700 1.5rem Raleway, sans-serif;
    text-transform: uppercase;
    -webkit-text-stroke: 2px var(--fill-color);
    color: $base-color;
}
//On ecrase le form-control de app.vue:
.form-control{
  width: 350px;
}
#imagePreview{
    padding: 1rem;
}
</style>

