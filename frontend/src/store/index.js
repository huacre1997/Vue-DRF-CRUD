import Vue from 'vue'
import Vuex from "vuex"
import axios from "axios"
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        booksList:[],
        authorList:[]
    },
    actions:{
        getAuthor({commit}){
            const path = "http://localhost:8000/api/v1/author/";
            axios
              .get(path)
              .then(response => {
                const context=response.data
                commit("setAuthors",context) 
                
            })
              .catch((error) => console.log(error));
        },
        getBooks({commit}) {
            const path = "http://localhost:8000/api/v1/books/";
            axios
              .get(path)
              .then(response => {
                const context=response.data
                commit("setBooks",context) 
            })
              .catch((error) => console.log(error));
          },
          async addBook({commit},form) {
            const path = "http://localhost:8000/api/v1/books/";

            const response=await axios.post(path,form).catch(error => console.log(error));
            commit('addBook', response.data);

          },
          async editBook({commit},form) {
            const path =`http://localhost:8000/api/v1/books/${form.id}/`
           const response=await axios.put(path,form).catch(error => console.log(error));
           commit('updateBook', response.data);
          },    
          async deleteBook({ commit },id) {
            const path =`http://localhost:8000/api/v1/books/${id}/`
           await axios.delete(path).catch(error => console.log(error));
            commit('deleteBook', id);
        },
    },
    mutations:{
        setBooks(state,books){
            state.booksList=books   
        },
        setAuthors(state,authors){
            state.authorList=authors   
        },
        updateBook: (state, books) => {
            const index = state.booksList.findIndex(aea => aea.id === books.id);      
            if (index !== -1) {
              state.booksList.splice(index, 1, books);
            }
        },
        addBook:(state,books) => state.booksList.push(books),
        deleteBook:(state,id) => state.booksList = state.booksList.filter((todo) => todo.id !== id)

       
    },
    getters:{
        authorList:state=>state.authorList,
        bookList: (state) => {
            return state.booksList
          }
    }
})