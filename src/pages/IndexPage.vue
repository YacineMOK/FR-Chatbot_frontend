<template>
  <q-page class="row justify-center items-center">

    <div class="column" style="width: 40%">
      <h5 class="items-center" style="text-align: center; margin-top: 20px;  font-weight: bold;">D I S C U S S I O N</h5>
      <div class="col">
        <div class="fit row wrap justify-center items-center content-center chat-container">
          <!-- Display messages  -->
            <q-scroll-area 
              ref="scroll"
              :delay="350"
              style="height: 450px; width: 100%; border: 4px dotted gray; padding:1em; background:#F5F5F5">
              
              <!-- Loop over msgs -->
              <div v-for="(i, index) in messages" :key="index" >

                <q-chat-message 
                  :text="[i.msg]"
                  v-if="i.user=='Elli'"
                  name="Elli"
                  avatar="../../public/icons/elli.png"
                  :stamp= i.timestamp
                  text-color="black"
                  bg-color=blue-grey-2
                />

                <q-chat-message
                  :text="[i.msg]"
                  v-if="i.user=='User'"
                  sent
                  name="Moi"
                  avatar="../../public/icons/user.png"
                  :stamp= i.timestamp
                  text-color="white"
                  bg-color=blue-5
                  style="margin:10px"
                />
              </div>
              <q-chat-message text-color="white" bg-color=blue-grey-2>
                <q-spinner-dots size="2rem" v-if="chatResponse=='' && begin==0"/>
              </q-chat-message>
            </q-scroll-area>
        </div>
      </div>

      <div class="col">
          <!-- Form for the input and button  -->

        <q-form
          
          class="q-gutter-md"
          style=" margin-top:50px"
        >
        
        <q-input ref="inputbox" 
                 filled v-model="userQuestion" 
                 label="Dis-moi tout" 
                 placeholder="Tu peux taper ici" 
                 hint="à toi" 
                 :dense="dense" 
                 :rules="[ val => val.length <= 516 || '516 caractères maximum.']"
                 :autofocus="true">
            
            <template v-slot:append><q-field borderless class="no-padded-control">
              <q-btn icon-right="send"  label="Envoyer" type="submit"  @click="loadData()" color="light-blue-9" style="width:100px; "/>
            </q-field></template>
         </q-input>
        </q-form>
      </div>




    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import  api  from 'boot/api'
import { date } from 'quasar'

export default defineComponent({
  
  data() {
    return{
      begin : 1,
      chatResponse : "",
      userQuestion: '',
      messages: [], 
      bot_is_writing : false,
    }
    
  },
  methods: {
      
      loadData () {
        this.begin = 0;

        // Save the message of the user and its attributes in the list of msgs
        let objUser = {}; 
        let timestamp = new Date(); 
        objUser.timestamp = date.formatDate(timestamp, 'HH:mm')
        objUser.user= 'User';
        objUser.msg= this.userQuestion;
        this.userQuestion = '';
        this.messages.push(objUser);
        this.chatResponse = '';



        // Scroll down when there is a new msg from user
        this.$refs.scroll.setScrollPosition('vertical', Number.MAX_SAFE_INTEGER, 1);
        

        //
        this.bot_is_writing = true;


        // set the focus on the input bar
        this.$refs.inputbox.focus();
        api.getResponse({'Question': objUser.msg}).then(res =>{
          
          
          console.log(this.$refs.inputbox);
          console.log(res);
          this.chatResponse = res.data;

          // Save the message from the bot and its attributes in the list of msgs
          let obj = {}; 
          let timestamp = new Date(); 
          obj.timestamp = date.formatDate(timestamp, 'HH:mm')
          obj.user= 'Elli';
          obj.msg= res.data.Bot;
          this.messages.push(obj);

          // Scroll down when there is a new msg from bot
          this.$refs.scroll.setScrollPosition('vertical', Number.MAX_SAFE_INTEGER, 1);
          this.bot_is_writing = false;

          
        })
     
      }

      
    
      

      
  }
})


</script>

<style>
.chat-container{
  max-height: 400px;
  /*overflow-y: scroll;*/
}

::-webkit-scrollbar {
  width: 3px;
  background: blue;
}

.no-padded-control.q-field--borderless .q-field__control {
    padding: 0;
    position: relative;
    right: -13px;
}


@import url(https://fonts.googleapis.com/css?family=Patua+One);



h5 {
  background-color:#5DADE2; 
  width:400px; height:50px;
  line-height:50px;
  font-size:30px;
  text-align:center;
  position:relative;
  margin:60px auto;
  font-family: 'Patua One', cursive;
  color:#fff;
  }

h5:before, h5:after {
  background-color:#2f73a1; 
  width:30px; height:50px;
  content:'';
  display:block; 
  transform:skewY(20deg);
  position:absolute;
  z-index:-1;
}

h5:before {top:10px; left:0; }
h5:after {top:-10px; right:0; }

</style>