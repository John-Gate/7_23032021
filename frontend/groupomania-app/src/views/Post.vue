<template>
<div class="d-flex flex-column align-items-center card">
    
    <CreatePostForm/>
</div>
</template>

<script>
import CreatePostForm from '../components/CreatePostForm'
export default {
    name: 'Inscription',
    components: {
    CreatePostForm
    }
}
</script>


<style scoped lang="scss">
.card{
  .card {
  width: 400px; /*1*/
  margin: 0px auto; /*2*/
  padding-bottom:20px ;
  background-color: white; /*3*/
  box-shadow: 0px 5px 20px #999; /*4*/
}
}
.subtitle{
    font-size: 2rem;
    font-weight: bold;
    color: #024601;
    font-family: Georgia, 'Times New Roman', Times, serif ;
}
</style>
