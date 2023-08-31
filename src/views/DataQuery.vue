<template>
  <div class="data-query-container">
    <div class="left-panel">
      <!-- 查询条件 -->
      <div class="query-section">
        <input type="text" v-model="queryTerm" placeholder="输入查询条件">
        <button @click="fetchData">查询</button>
      </div>

      <!-- 查询结果 -->
      <div class="results-section">
        <div v-for="item in results" :key="item.id" @click="showOnMap(item)">
          {{ item.name }}
        </div>
      </div>
    </div>

    <div class="right-panel">
      <!-- Leaflet 地图 -->
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import L from 'leaflet';

export default {
  setup() {
    const queryTerm = ref('');
    const results = ref([]);

    const fetchData = async () => {
      // 使用axios或其他HTTP客户端从Django后端获取数据
      const response = await axios.get(`YOUR_DJANGO_API_ENDPOINT?query=${queryTerm.value}`);
      results.value = response.data;
    };

    const showOnMap = (item) => {
      // 使用Leaflet在地图上显示查询结果
      const marker = L.marker([item.lat, item.lng]).addTo(map);
      marker.bindPopup(item.name).openPopup();
    };

    onMounted(() => {
      const map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
    });

    return {
      queryTerm,
      results,
      fetchData,
      showOnMap
    };
  }
};
</script>

<style scoped>
.data-query-container {
  display: flex;
}
.left-panel {
  width: 30%;
  padding: 20px;
}
.right-panel {
  flex: 1;
  padding: 20px;
}
#map {
  width: 100%;
  height: 600px;
}
</style>
