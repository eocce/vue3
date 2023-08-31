<template>
  <div class="user-app">
    <!-- 页面头部 -->
    <header>
      <h1>网站名称</h1>
      <nav>
        <ul>
          <li>数据查询</li>
          <li>数据目录树浏览</li>
          <li>数据下载清单</li>
          <li>FAQ</li>
        </ul>
      </nav>
      <div class="user-info">
        <span>账户ID: {{ username }}</span>
        <button>修改密码</button>
        <button>退出</button>
      </div>
    </header>

    <!-- 页面主体 -->
    <div class="main-content">
      <!-- 左侧地图展示 -->
      <div class="map-container">
        <l-map :zoom="13" :center="center" ref="map">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <!-- 这里将添加遥感影像图层 -->
        </l-map>
      </div>

      <!-- 右侧数据查询 -->
      <div class="data-query">
        <!-- 查询条件 -->
        <div class="query-conditions">
          <!-- 这里将添加查询条件的具体内容 -->
          <button @click="fetchImages">查询遥感影像</button>
        </div>

        <!-- 查询结果 -->
        <div class="query-results">
          <!-- 这里将展示查询的结果 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '../components/Map.vue'
import axios from 'axios';

export default {
  components: {
    Map
  },
  data() {
    return {
      center: [45.4, -75.7],  // 这是一个示例坐标，您可以根据需要更改
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '... your attribution here ...',
      images: []
    };
  },
  methods: {
    fetchImages() {
      const token = localStorage.getItem('token');
      axios.get('http://127.0.0.1:8000/api/v1/query/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then(response => {
        this.images = response.data;
        this.displayImagesOnMap();
      })
      .catch(error => {
        console.error("Error fetching images:", error);
      });
    },
    displayImagesOnMap() {
      // 这里，我们将使用Leaflet的功能将遥感影像添加到地图上
      // 请注意，这取决于您的遥感影像数据的结构
      this.images.forEach(image => {
        // 使用Leaflet的L.imageOverlay或其他方法将图像添加到地图上
      });
    }
  }
}
</script>

<style scoped>
/* 样式代码，根据需要进行调整 */
.user-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
}

nav ul {
  display: flex;
  gap: 20px;
}

.user-info {
  display: flex;
  gap: 10px;
}

.main-content {
  display: flex;
  flex: 1;
}

.map-container {
  flex: 1;
  height: 100%;
}

.data-query {
  width: 300px; /* 或更多，根据需要 */
  overflow-y: auto;
}

.query-conditions, .query-results {
  padding: 20px;
  border: 1px solid #ccc;
  margin: 10px;
}
</style>