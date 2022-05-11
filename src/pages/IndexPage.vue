<template>
  <q-page class="row justify-center items-center">

<div class="column" style="width: 40%">
      <div class="col">
        <div class="fit row wrap justify-center items-center content-center chat-container">
        
         <!-- <div class="q-pa-md row justify-center"> -->
          <div  style="width: 60%; max-width: 400px">
          <div v-for="(i, index) in messages" :key="index">

            <q-chat-message 
              :text="[i.msg]"
              v-if="i.user=='Elli'"
              name="Elizia"
            />
            <q-chat-message
              :text="[i.msg]"
              v-if="i.user=='User'"
              sent
              name="moi"
            />
          </div>
            
            
          <!-- </div> -->
        </div>
        </div>
      </div>

      <div class="col">
          

        <q-form
              
              class="q-gutter-md"
            >
            <q-input ref="inputbox" filled v-model="userQuestion" label="Dites-moi tout" placeholder="Tapez ici" hint="à vous" :dense="dense" :disable="!chatResponse ? 'true' : 'false'" />
              


              <div>
                <q-btn label="Submit" type="submit" color="primary" @click="loadData"/>
                <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
              </div>
            </q-form>


      </div>




    </div>

 
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import  api  from 'boot/api'

export default defineComponent({
  
  data() {
    return{

      chatResponse : "",
      userQuestion: '',
      messages: [], 
      
      
    }
    
  },
  methods: {
      
      loadData () {
        let objUser = {}; 
        objUser.timestamp = new Date(); 
          objUser.user= 'User';
          objUser.msg= this.userQuestion;
          this.messages.push(objUser);
          this.chatResponse = '';
        api.getResponse({'Question': this.userQuestion}).then(res =>{
          console.log(this.$refs.inputbox);
          this.userQuestion = '';
          console.log(res);
          this.chatResponse = res.data;
          let obj = {}; 
          obj.timestamp = new Date(); 
          obj.user= 'Elli';
          obj.msg= res.data.Bot;

          this.messages.push(obj);
          this.$refs.inputbox.focus();
        })
     
  }
    }
  }
)


</script>

<style>
.chat-container{
  max-height: 400px;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 3px;
  background: blue;
}
</style>