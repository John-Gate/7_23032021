<template>
<div class="login-box">
  <h2 class="cardTitle">Mon Profil</h2>

  <form>
<a href="/Post">Créer Un Nouvel Article</a>
    <a @click="logIn">Supprimer Le Profil</a>
      <a href="/Inscription" class="linkInscription">Retour a l'accueil</a>
  </form>
</div>



</template>

<script>
export default {
    name: 'ProfilForm',
    data () {
        return {
            username: '',
        }
    },
    methods:{
    deleteUser() {
        let idUser = parseInt(localStorage.getItem("Id"));
        const dataForm = JSON.stringify({id: idUser});
        async function postForm(dataForm) {
            try {
                let response = await fetch("http://localhost:3000/api/user/:id", {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'bearer ' + localStorage.getItem('token')
                    },
                    body: dataForm
                });
                    if (response.ok) {
                        let responseId = await response.json();
                        console.log(responseId);
                        localStorage.removeItem('Id');
                        localStorage.removeItem('token');
                        localStorage.removeItem('isAdmin');
                        window.location.href = "http://localhost:8080/Inscription"
                    } else {
                        console.error('Retour du serveur : ', response.status);
                    }
            } catch (e) {
            console.log(e);
            }
        }
        postForm(dataForm);
    },
    updateUser() {
        let idUser = parseInt(localStorage.getItem("Id"));
        let dataForm = JSON.stringify({id: idUser, username: this.username});
        async function postForm(dataForm) {
            try {
                let response = await fetch("http://localhost:3000/api/user/:id", {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'bearer ' + localStorage.getItem('token')
                    },
                    body: dataForm,
                });
                    if (response.ok) {
                        let responseId = await response.json();
                        console.log(responseId);
                        //Répondre ok modifcation
                    } else {
                        console.error('Retour du serveur : ', response.status);
                    }
            } catch (e) {
            console.log(e);
            }   
        }
postForm(dataForm);
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