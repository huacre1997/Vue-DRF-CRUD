<template lang="html">
  <div class="container"> 
    <div class="row">
      <div class="col">
    
            <form  v-if="this.bookId" v-on:submit= "onEdit">
                              <h2>Editar  libros</h2>

              <div class="form-group row">
                <label for="title" class="col-sm-3 col-form-label text-right">Titulo</label>
                <div class="col-sm-9">
                  <input  type="text" placeholer="Titulo" name="title"  class="form-control" v-model.trim="form.title"/>
                </div>
              </div>
              <div class="form-group row ">
                <label for="description" class="col-sm-3 col-form-label text-right">Descripción</label>
                <div class="col-sm-9">
                  <textarea  name="description"   placeholer="Titulo" class="form-control"v-model.trim="form.description" ></textarea>
                </div>
              </div>
              <div class="form-group row">
                <label for="description" class="col-sm-3 col-form-label text-right">Autor</label>
                <div class="col-sm-9">
           
                    <b-form-select  v-model=form.author_id>
                    <option v-for="option in options" v-bind:value="option.id">
                        {{ option.name }} {{ option.last_name }}

                    </option>
                    </b-form-select>                
                </div>
              </div>
              
              <div class="row">
                  <div class="col">
                      <b-button type="submit" variant="primary">Editar</b-button>
                      <b-button type="submit" class="btn-large-space" :to="{name:'ListBook'}">Cancelar</b-button>

                  </div>
              </div>
            </form>
              <form  v-else v-on:submit= "onAdd">
                             <div class="form-group row">
                <label for="title" class="col-sm-3 col-form-label text-right">Titulo</label>
                <div class="col-sm-9">
                  <input  type="text" placeholer="Titulo" name="title"  class="form-control" v-model.trim="form.title"/>
                </div>
              </div>
              <div class="form-group row">
                <label for="description" class="col-sm-3 col-form-label text-right">Descripción</label>
                <div class="col-sm-9">
                  <textarea  name="description"   placeholer="Titulo" class="form-control"v-model.trim="form.description" ></textarea>
                </div>
              </div>
              <div class="form-group row">
                <label for="description" class="col-sm-3 col-form-label text-right">Autor</label>
                <div class="col-sm-9">
           
                    <b-form-select  v-model=form.author_id>
                    <option v-for="option in options" v-bind:value="option.id">
                        {{ option.name }} {{ option.last_name }}

                    </option>
                    </b-form-select>                
                </div>
              </div>
              
              <div class="row">
                  <div class="col">
                      <b-button type="submit" variant="primary">Agregar</b-button>
                      <b-button type="submit" class="btn-large-space" :to="{name:'ListBook'}">Cancelar</b-button>

                  </div>
              </div>
          </form>

      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Swal from "sweetalert2";
export default {
  name:"EditBook",

  data() {
    return {
      showModal: false,
      bookId: this.$route.params.bookId,
      form: {
        title: "",
        description: "",
        author_id: "",
      },

      options: [],
    };
  },
  methods: {
        onAdd(e) {
      e.preventDefault();
      const path = `http://localhost:8000/api/v1/books/`;
      Axios.post(path, this.form)
        .then((response) => {
          this.form.title = response.data.title;
          this.form.description = response.data.description;
          this.form.author_id = response.data.author.id;
          this.message("Libro agregado  exitosamente!")
          location.href="/books"
        })
        .catch((error) => console.log(error));
    },
    onEdit(e) {
      e.preventDefault();
      const path = `http://localhost:8000/api/v1/books/${this.bookId}/`;
      Axios.put(path, this.form)
        .then((response) => {
          this.form.title = response.data.title;
          this.form.description = response.data.description;
          this.form.author_id = response.data.author.id; 
          this.message("Libro editado  exitosamente!")
          this.showModal = false

        })
        .catch((error) => console.log(error));
    },
    getBook() {
      const path = `http://127.0.0.1:8000/api/v1/books/${this.bookId}/`;
      Axios.get(path)
        .then((response) => {
          this.form.title = response.data.title;
          this.form.description = response.data.description;
          this.form.author_id = response.data.author.id;
        })
        .catch((error) => console.log(error));
    },
    getAuthor() {
      const path = `http://localhost:8000/api/v1/author/`;
      Axios.get(path)
        .then((response) => {
          this.options = response.data;
        })
        .catch((error) => console.log(error));
    },
    message(message){
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: message,
          });
            
    }
    
  },
  created() {
    this.getBook();
    this.getAuthor();
  },
};
</script>
