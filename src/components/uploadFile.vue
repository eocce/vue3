<template>
  <div>
    <input type="file" @change="uploadFile">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    uploadFile(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      axios.post('/api/upload/', formData)
        .then(response => {
          console.log('File uploaded successfully');
        })
        .catch(error => {
          console.error('There was an error uploading the file', error);
        });
    }
  }
}
</script>
