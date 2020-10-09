<template lang="html">
  <div class="container"> 
          <h1>Agregar Libro</h1>


               <div class="form-group row">
                <label for="title" class="col-sm-3 col-form-label text-right">Título</label>
                <div class="col-sm-9">
                  <input  name="title"   placeholder="Titulo" class="form-control"v-model.trim="form.title" >
                </div>
              </div>
              <div class="form-group row">
                <label for="description" class="col-sm-3 col-form-label text-right">Descripción</label>
                <div class="col-sm-9">
                  <textarea  name="description"   placeholder="Descripcion" class="form-control"v-model.trim="form.description" ></textarea>
                </div>
              </div>
              <div class="form-group row">
                <label for="description" class="col-sm-3 col-form-label text-right">Autor</label>
                <div class="col-sm-9">
           
                    <b-form-select  v-model=form.author_id>
                       <template v-slot:first>
                    <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                  </template>

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
</template>

<script>
import Axios from "axios";
import Swal from "sweetalert2";
export default {
  name:"AddBook",

  data() {
    return {
      form: {
        title: "",
        description: "",
        author_id: "",
      },
      
      options: [
      ],
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
    this.getAuthor();
  },
};
</script>
