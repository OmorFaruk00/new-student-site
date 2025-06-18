<template>
  <div>
    <label>Select Fruits</label>
    <v-select
      v-model="selected"
      :options="options"
      :multiple="true"
      placeholder="Pick some"
      label="name"        
      track-by="name"       
    />
    <button @click="test()">test</button>
  </div>
</template>

<script>
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  components: {
    VSelect
  },
  data() {
    return {
      selected: [],  // Selected items will contain the full object or array of objects
      options: [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Mango' },
        { id: 4, name: 'Orange' }
      ]
    }
  },
 methods: {
    test() {
      alert(this.selected);
      // this.selected will contain the selected objects
      // You can access the selected values like this:
    
    }
  }

}
</script>
