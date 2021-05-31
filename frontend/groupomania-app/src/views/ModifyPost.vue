<template>
  <div class="main" v-if="token!=null">
     <div class="login-box">
        <div>
<h2 class="cardTitle textShadow">Modifier Ma publication</h2>
            <label for="title" class="labelTitle textShadow">Titre</label>
            <input type="text" class="form-control " id="title" v-model="post.title" required placeholder="Ecrivez votre titre">
        </div>
          <div>
            <label for="content" class="labelTitle textShadow">Contenu</label>
            <textarea class="form-control form-control__contenu" id="content" v-model="post.content" rows=8  required placeholder="Ecrivez votre contenu ici ( maximum 255 characteres)" @keydown.enter="modifyPublication"></textarea>
        </div>
            <div>
    <label for="title" class="labelTitle textShadow">Photo</label>
      <input id="imageAccess" type="file" placeholder="Ajouter une image" @change="getImage">
      <div  id="imagePreview"></div>
    </div>
          <a class="showButton modifyButton" type="submit" @click.prevent="modifyPublication">Modifier</a>
     </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
   data() {
      return {
        token: sessionStorage.getItem('token'),
         post:{
              title: '',
              content: ''
            },
        user_id:sessionStorage.getItem("id"),
        comment:'',
        connexion: false,
        post_id:'',
        author: false
      };
    },
   mounted(){
        this.getOnePublication()
   },
   methods: {
      //Affiche l'article que l'on souhaite modifier
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
                if(this.post.UserId == this.user_id){
                  this.author = true;
                }
                this.comment = data.comment;
            })
            .catch(error => console.log({error}));
        },
       //Modification de l'article deja créé
       modifyPublication(){
          let formData = new FormData();
          formData.append('content', this.post.content);
          formData.append('title', this.post.title);
          formData.append('image', this.post.image);
          formData.append('postId', this.post_id);
          const token = sessionStorage.getItem('token');
            axios.put("http://localhost:3000/post/updatePost", formData, {
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
        //Permet de rajouter/changer une image de l'article a modifier
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
        }
   }
}
</script>

<style lang="scss" scoped>
$base-color: #fff;
.labelTitle{
    display: block;
    padding: 4px 0;
    font: 700 1.5rem Raleway, sans-serif;
    text-transform: uppercase;
    -webkit-text-stroke: 2px var(--fill-color);
    color: $base-color;
}
.form-control{
  width: 350px;
}
.modifyButton{
  margin-top: 2rem;
}
#imageAccess{
  margin: 1rem;
}
</style>