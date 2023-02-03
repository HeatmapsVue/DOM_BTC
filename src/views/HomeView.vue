<template>
  <div>
    <article class="modal">
      <a href="/chart">Grafica Librería</a>
      <a href="/map">Mapa de Calor</a>  
    </article>
  </div>
</template>

<script setup>
</script>

<style scoped>
div{
    width: 100vw;
    height: 100vh;
    background-color: #121826;
    display: flex;
    align-items: center;
    justify-content: center;
}
a{
    background-color: #1a2131;
    border: #838383 solid 1px;
    width: 12rem;
    height: 5rem;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor:pointer;

}

a:hover{
    /* background-color: blueviolet; */
    filter: opacity(70%);
}
.modal{
    background-color: #1a2131;
    width: 30rem;
    height: 15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap:2rem;
    border: #838383 solid 1px;
}
</style>
