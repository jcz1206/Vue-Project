<template>
<div class="head">
    <ul>
        <li v-for="item in data.category">{{item.catename}}</li>
    </ul>
</div>
</template>
<style scope>
.head{
    background-color:rgb(255, 223, 0);
    height: 50px;
    width:100%;
}
</style>
<script>
export default {
  name:"category",
  data(){
      return {
          data:{
              category:[{
                id:"001",
                catename:"水",
                child:[
                    {
                id:"001001",
                catename:"水1"  
                    },
                    {
                id:"001001",
                catename:"水2"  
                    }
                ]
              },
              {
                id:"002",
                catename:"电" 
              }]
            }
      }
  }

}
</script>
