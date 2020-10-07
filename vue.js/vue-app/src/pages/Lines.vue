<template>
  <div>
     <div class="row justify-content-center">
        <div class="pagination">
          <span v-on:click="pageClick(item)" v-for="item in pages" v-bind:key="item">{{item}}</span>   
          </div>
      </div>
       <table class="table">
  <thead>
    <tr>
      <th scope="col">Тип линии</th>
      <th scope="col">CLI</th>
      <th scope="col">Город</th>
      <th scope="col">Тариф</th>
      <th scope="col">Запись звонков</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="line in lines" v-bind:key="line.type">
      <td>{{line.type}}</td>
      <td>{{line.CLI}}</td>
      <td>{{line.city}}</td>
      <td>{{line.tariff}}</td>
      <td>{{line.record? "✔": "✖"}}</td>
    </tr>
   
  </tbody>
</table>
  </div>
 
</template>

<script>
import api from './../api.js'
export default {
  data() {
    return {
      lines: [],
      currPage: 1,
      totalLines: 0,
      pages: []
    }
  },
  methods: {
    pageClick(page) {
      api.getLines(page).then(response => {
        this.currPage = page
        this.lines = response.data.lines;      
    }).catch(error => {
      console.log(error);
    })
    }
  },
  mounted() {
    api.getLines(this.currPage).then(response => {
      this.lines = response.data.lines;
      this.totalLines = response.data.count;
      
      this.pages = Array.from({length: Math.ceil(response.data.count/10)}, (v, k) => k+1); 
    }).catch(error => {
      console.log(error);
    })
  }
}
</script>

<style>
  .pagination {
  font-size: 22px;
  cursor: pointer;
  text-align: center;
  margin-bottom: 10px;
}
.pagination span {
  margin-left: 10px
}
.pagination span:hover {
  font-weight: bold;
}
.active-page {
  font-weight: bold;
}
</style>