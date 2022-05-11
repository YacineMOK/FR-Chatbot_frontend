<template>
  <q-page class="flex">

<div class="column" style="">
      <div class="col">
        <div class="fit row wrap justify-center items-center content-center">
        
         <!-- <div class="q-pa-md row justify-center"> -->
          <div v-for="(i,index) in messages" style="width: 60%; max-width: 400px">
            <q-chat-message v-if=""
              :text="i"
              name="Elizia"
            />
            <q-chat-message
              :text="['yo !']"
              sent
              name="moi"
            />
          <!-- </div> -->
        </div>
        </div>
      </div>

      <div class="col">
          

        <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
            <q-input filled v-model="pinput" label="Dites-moi tout" placeholder="Tapez ici" hint="à vous" :dense="dense" />
              


              <div>
                <q-btn label="Submit" type="submit" color="primary"/>
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

export default defineComponent({
  components: {
   
  },
  data() {
    messages: {
        123: {0:'Hello'}, // user
        222: {1:'Hi'}, // chatbot

      }
  }
}
)


</script>
