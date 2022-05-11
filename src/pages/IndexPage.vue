<template>
  <q-page class="row justify-center items-center">

    <div class="column" style="width: 40%">
      <h5 class="items-center" style="text-align: center; margin-top: 5px; font-family: 'comic sans ms'"> DISCUSSION </h5>
      <div class="col">

        <div class="fit row wrap justify-center items-center content-center chat-container">
          <!-- Display messages  -->
          <q-scroll-area ref="scroll" style="height: 450px; width: 100%; border: 4px dotted teal; padding:1em">
            <div  style="margin-left: 10px; margin-right: 10px;">
              <div v-for="(i, index) in messages" :key="index">

                <q-chat-message 
                  :text="[i.msg]"
                  v-if="i.user=='Elli'"
                  name="Elli"
                  avatar="../../public/icons/elli.jpg"
                  :stamp= i.timestamp
                />

                <q-chat-message
                  :text="[i.msg]"
                  v-if="i.user=='User'"
                  sent
                  name="Moi"
                  avatar="../../public/icons/user.png"
                  :stamp= i.timestamp

                  
                />
              </div>
              <q-chat-message>
                <q-spinner-dots size="2rem" v-if="chatResponse=='' && begin==0"/>
              </q-chat-message>
            </div>
          </q-scroll-area>
        </div>
      </div>

      <div class="col">
          <!-- Form for the input and button  -->

        <q-form
          
          class="q-gutter-md"
          style=" margin-top:50px"
        >
        <q-input ref="inputbox" filled v-model="userQuestion" label="Dis-moi tout" placeholder="Tu peux taper ici" hint="à toi" :dense="dense" :disable="!chatResponse ? 'true' : 'false'" />
          <div style="margin-left: 100%">
            <q-btn icon-right="send"  label="Envoyer" type="submit" color="primary" @click="loadData()" style="width:200px"/>
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
import { date } from 'quasar'

export default defineComponent({
  
  data() {
    return{
      begin : 1,
      chatResponse : "",
      userQuestion: '',
      messages: [], 
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

          //scroll down
          this.scrollDown()
        })
     
      },

      // To scroll down when there is a new msg from the bot
      scrollDown() {
        const target = this.$refs.scroll.getScrollTarget()
        target && (target.scrollTop = Number.MAX_SAFE_INTEGER)
      }
    }
  }
)


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
</style>