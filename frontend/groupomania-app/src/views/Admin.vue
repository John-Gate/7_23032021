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
          <p class="auteur">par : {{ post.UserId }}</p>
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
        stats:'',
        connexion: false,
        name : sessionStorage.getItem("name")
      };
    },
   mounted(){
        this.getStatistics()
   },

    methods: {
       getStatistics(){
         const token = sessionStorage.getItem('token');
          axios.get("http://localhost:3000/admin/statistics", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                const data = res.data;
                this.stats = data;
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
.articles{
  border: 2px solid $base-color;
  color: $base-color;
  margin: 5px;
  padding: 20px;
}
.showButton{
  height: fit-content;
}
.diplayAttribute{
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
}
.auteur{
  position: flex;
}
.bienvenu{
    --fill-color: $base-color;
    position: relative;
    display: block;
    padding: 4px 0;
    font: 700 3rem Raleway, sans-serif;
    text-decoration: none;
    text-transform: uppercase;
    background: linear-gradient(var(--fill-color) 0 100%) left/0 no-repeat;
    color: transparent;
}
</style>