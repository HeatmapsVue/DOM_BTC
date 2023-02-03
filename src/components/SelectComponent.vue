<template>
  <div class="change">
    <p :class="{ active: !isChecked }">Estático</p>
    <label class="switch">
      <input type="checkbox" checked />
      <span class="slider round" @click="change"></span>
    </label>
    <p :class="{ active: isChecked }">Dinámico</p>
  </div>
</template>

<script setup >
import { ref } from "vue"

let isChecked = ref(true)
const emit = defineEmits(['changeChart'])
const change = () => {
    isChecked.value = !isChecked.value
    emit("changeChart",isChecked.value)
}
</script>

<style scoped>
.active {
  color: white;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin: 1rem 0.5rem;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
  outline: #399a72 solid;
}

.slider.round:before {
  border-radius: 50%;
}
.change {
  margin-left: 1rem;
  display: flex;
  align-items: center;
}
p {
  transition: 0.5s ease;
}
</style>