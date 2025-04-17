<template>
  <div>
    <label for="interest_field">Interest Field</label>
    <Multiselect
      v-model="interest_field"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      placeholder="Select one"
      track-by="value"
      label="label"
      :show-labels="false"
      class="multiselect"
    />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      interest_field: [],
      options: [
        { value: 'Not Applicable', label: 'Not Applicable' },
        { value: 'Structural Engineering', label: 'Structural Engineering' },
        { value: 'Geotechnical Engineering', label: 'Geotechnical Engineering' },
        { value: 'Environmental Engineering', label: 'Environmental Engineering' },
        { value: 'Transportational Engineering', label: 'Transportational Engineering' },
        { value: 'Water Resource Engineering', label: 'Water Resource Engineering' }
      ]
    }
  }
}
</script>
