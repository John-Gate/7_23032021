<template>
  <div class="main" v-if="token!=null">
    <!-- <div v-if="post.length === 0" >
            <div class="text">Aucun contenu 0000000000000000000 </div>
    </div>-->
    <!--<div v-else> -->
     <div class="login-box">
       <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
          <p> cree le: {{ post.updatedAt }}</p>
            <button type="submit" @click.prevent="modifyPublication">Modifier</button>
            <div class="form-group">
            <label for="content" class="labelTitle">Laissez un commentaire:</label>
            <textarea class="form-control form-control__contenu" id="content" v-model="post.content" rows=8  required placeholder="Ecrivez votre contenu ici ( maximum 255 characteres)"></textarea>
            <button type="submit" @click.prevent="createPost">Partager</button>
            
        </div>
        <div id="comment" v-for="commentary in comment" :key="commentary.id">
          <p>{{ commentary.content }}</p>
          <p>{{ commentary.updatedAt }}</p>
        </div>
     <button v-if="author==true" @click="deletePublication">SUPPRESSION</button>
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
        post: '',
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
         console.log(id[1])
          axios.get("http://localhost:3000/post/"+id[1], {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                const data = res.data;
                this.post = data.post;
                console.log(this.post.UserId)
                if(this.post.UserId == this.user_id){
                  this.author = true;
                }
                this.comment = data.comment;
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
            .then(res => {
              console.log(res)
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
            .then(res => {
              console.log(res)
                window.location.reload()
            })
            .catch(error => console.log({error}));
        },
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

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background-image: linear-gradient(#fc2700, #000000);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
  opacity: 0.8;
  color:#FFF
  
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

.main{
  order:2;
}

.form-control{
  width: 100%;
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