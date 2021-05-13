<template>
  <div class="main" v-if="token!=null">
    <!-- <div v-if="post.length === 0" >
            <div class="text">Aucun contenu 0000000000000000000 </div>
    </div>-->
    <!--<div v-else> -->
     <div class="login-box">
        <div>
<h2 class="cardTitle">Modifier Ma publication</h2>
            <label for="title" class="labelTitle">Titre</label>
            <input type="text" class="form-control " id="title" v-model="post.title" required placeholder="Ecrivez votre titre">
        </div>
          <div>
            <label for="content" class="labelTitle">Contenu</label>
            <textarea class="form-control form-control__contenu" id="content" v-model="post.content" rows=8  required placeholder="Ecrivez votre contenu ici ( maximum 255 characteres)" @keydown.enter="modifyPublication"></textarea>
        </div>
          <button type="submit" @click.prevent="modifyPublication">Modifier</button>
     </div>
    <!-- </div> -->
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
          modifyPublication(){
          const token = sessionStorage.getItem('token');
          const data = {
            currentUser: this.user_id,
            postId: this.post_id,
            title: this.post.title,
            content: this.post.content
          }
          axios.put("http://localhost:3000/post/updatePost", data, {
            headers: {
              'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                window.location.replace("/")//voir si on met retour au post precedent plutot que "/"
            })
            .catch(error => console.log({error}));
        },
  }
}
</script>

<style lang="scss" scoped>
</style>