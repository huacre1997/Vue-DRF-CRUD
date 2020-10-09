<template lang="html">
     

    <div class="container">

        <div class="row">

            <div class="col text-left">
                <h2>Listado de libros</h2>
                <div class="form-group">
                        <b-button id="show-btn" variant="primary" :to="{name:'AddBook'}">Agregar</b-button>

                </div>

                <div class="col-md-12">
                    <b-table striped hover :items='books' :fields="fields">
                        <template v-slot:cell(action)="row">
                        <!-- <b-button size="sm" variant="warning" :to="{ name:'EditBook',params:{bookId:row.item.id}}">Editar</b-button> -->
                        <b-button id="show-btn" variant="warning" :to="{name:'EditBook',params:{bookId:row.item.id}}">Editar</b-button>

                        <b-button  variant="danger" v-on:click="deleteBook(row.item.id)">Eliminar</b-button>

                        </template>                     
                    </b-table>
             
                </div>
            </div>
        </div>
    </div>

  </template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      fields: [
        { key: "title", label: "Titulo" },
        { key: "description", label: "Descripción" },
        { key: "author.last_name", label: "Autor" },
        { key: "action", label: "Accion" },
      ],
      books: [],
      id:""
    };
  },
  methods: {
    getBooks() {
      const path = "http://localhost:8000/api/v1/books/";
      axios
        .get(path)
        .then((response) => {
          this.books = response.data;

        })
        .catch((error) => console.log(error));
    },

    deleteBook(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const path = `http://127.0.0.1:8000/api/v1/books/${id}/`;
          axios
            .delete(path)
            .then((response) => {
              this.getBooks();
            })
            .catch((error) => console.log(error));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
  },
  created() {
    this.getBooks();
    
  },
 

};
</script>
<style lang="css" scoped>
</style>