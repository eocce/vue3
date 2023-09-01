<template>
  <div class="data-query-container">
    <div class="left-panel">
      <!-- 查询条件 -->
      <div class="query-section">
        <!-- 成像时间查询 -->
        <label>成像时间:</label>
        <input type="date" v-model="startDate" placeholder="开始日期">
        <input type="date" v-model="endDate" placeholder="结束日期">
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
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';


export default {
  setup() {
    const startDate = ref('');
    const endDate = ref('');
    const results = ref([]);

    const fetchData = async () => {
      // 使用axios或其他HTTP客户端从Django后端获取数据
      const response = await axios.get(`YOUR_DJANGO_API_ENDPOINT?start_date=${startDate.value}&end_date=${endDate.value}`);
      results.value = response.data;
    };

    const showOnMap = (item) => {
      // 使用Leaflet在地图上显示查询结果
      const marker = L.marker([item.lat, item.lng]).addTo(map);
      marker.bindPopup(item.name).openPopup();
    };

    onMounted(() => {
      const map = L.map('map').setView([34.27, 108.93], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // 添加绘图工具
      const drawnItems = new L.FeatureGroup().addTo(map);
      const drawControl = new L.Control.Draw({
        draw: {
          polygon: true,
          polyline: true,
          rectangle: true,
          circle: true,
          marker: true
        },
        edit: {
          featureGroup: drawnItems
        }
      });
      map.addControl(drawControl);

      map.on(L.Draw.Event.CREATED, function (event) {
        const layer = event.layer;
        drawnItems.addLayer(layer);

        // 获取绘制的矢量数据
        const geoJSONData = layer.toGeoJSON();

        // 您可以使用此geoJSONData进行进一步的查询或其他操作
        console.log(geoJSONData);
      });
    });

    return {
      startDate,
      endDate,
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
