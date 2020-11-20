<template>
  <div id="app">
    <Form />
  </div>
</template>

<script>
import Form from './components/Form';

export default {
  name: "App",
  components: {
    Form
  },
  methods: {}
};
</script>

<style>
* {
  margin:0;
  padding:0;
  border:none;
  outline:none;
  resize:none;
  box-sizing:border-box;
}

.b5radius { border-radius:5px; }
.b50radius { border-radius:50%; }
.transition { transition:0.1s linear; }

#app {
  width:100%;
  min-height:100vh;
  background-image:linear-gradient(to top, #37ecba 0%, #72afd3 100%);
  overflow:hidden;
  padding:0 20px;
}
</style>