<template>
  <v-app>
    <v-container>
    <v-data-table
      :headers="fields"
      :items="ListBook"
      class="elevation-1"
    >
 
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Título"
                      ></v-text-field>
                    </v-col>
                    </v-row>
                      <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-textarea
                        auto-grow
                        
                        rows="1"
                        row-height="15"
                        v-model="editedItem.description"
                        label="Descripcíon"
                      ></v-textarea>
                    </v-col>
                      </v-row>
                        <v-row>
                    <v-col cols="12" sm="6" md="12">
                       <v-select
                       v-model="editedItem.author_id"

                        :items='List'
                        label="Seleccione autor"
                        :item-value="'id'"
                        :item-text="'last_name'"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4"> </v-col>
                    <v-col cols="12" sm="6" md="4"> </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete"  max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Reset </v-btn>
      </template>
    </v-data-table>
   <template>
  <v-row justify="space-around">
    <v-avatar color="indigo">
      <v-icon dark>
        mdi-account-circle
      </v-icon>
    </v-avatar>

    <v-avatar>
      <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="John"
      >
    </v-avatar>

    <v-avatar color="red">
      <span class="white--text headline">CJ</span>
    </v-avatar>
  </v-row>
</template>
      </v-container>

  </v-app>
</template>
<script>
// import axios from "axios";
// import AddBook from "@/components/Book/AddBook"
// import EditBook from "./EditBook"

import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    fields: [
      { value: "title", text: "Titulo" },
      { value: "description", text: "Descripción" },
      { value: 'author.name', text: "Autor",colspan:2 },
      { value: 'author.last_name', text: "Autor" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    bookId: 0,
    editedIndex: -1,
    editedItem: {
      id:"",
      title: "",
      description: "",
      author_id:0,    
    },
    defaultItem: {
      title: "",
      description: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Libro" : "Editar Libro";
    },
     ...mapGetters({
        List:'authorList',
        ListBook:'bookList'
  })
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    ...mapActions(["getBooks","getAuthor","addBook","deleteBook","editBook"]),
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

     closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
  editItem (item) {
      this.editedIndex = this.$store.state.booksList.indexOf(item)
      this.editedItem = Object.assign({}, {
       id: item.id,
      title: item.title,
      description: item.description,
      author_id:item.author.id,       
    },)
      this.dialog = true
    },
    save() {
      if (this.editedIndex > -1) {
       this.editBook(this.editedItem)
      } else {
        this.addBook(this.editedItem)

      }
      this.close();
    },
    deleteItem(item) {
        this.dialogDelete=true
        this.editedItem = Object.assign({}, {
       id: item.id,
      title: item.title,
      description: item.description,
      author_id:item.author.id,       
    })

    
    },
  deleteItemConfirm(){
    this.deleteBook(this.editedItem.id)
    this.dialogDelete=false
  }
    
  },
  mounted() {
        this.getAuthor()

  },
  created() {
    this.getBooks();
  },
};
</script>
<style lang="css" scoped></style>
