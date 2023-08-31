<template>
  <div class="data-directory-container">
    <div class="left-panel">
      <label for="satellite">选择卫星传感器:</label>
      <select id="satellite" v-model="selectedSatellite">
        <option v-for="satellite in satellites" :key="satellite">{{ satellite }}</option>
      </select>
    </div>

    <div class="right-panel">
      <input type="text" v-model="dataName" placeholder="数据名称">


      <div class="date-range"> <!-- 添加一个新的div来包裹日期相关的内容 -->
        <label for="startDate">成像时间：</label>
        <input type="date" id="startDate" v-model="startDate" placeholder="开始日期">
        <span>-</span> <!-- 添加“-” -->
        <input type="date" id="endDate" v-model="endDate" placeholder="结束日期">
      </div>
      <button @click="filterData">查询</button>
      <button @click="addToDownloadList">加入下载清单</button>
      <button @click="downloadSelected">下载选中</button>

      <table>
        <thead>
          <tr>
            <th>快视图</th>
            <th>卫星</th>
            <th>文件名称</th>
            <th>成像时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedData" :key="item.id">
            <img :src="getImageUrl(item.id)" alt="Quickview" @click="showLargeImage(item.id)" style="width: 50px; cursor: pointer;">
            <div v-if="largeImage" class="modal">
                <span class="close" @click="largeImage = null">&times;</span>
                <img :src="largeImage" class="modal-content"
                     draggable="false"
                     :style="{ transform: `scale(${zoomLevel}) translate(${offsetX}px, ${offsetY}px)`, cursor: isDragging ? 'grabbing' : 'grab' }"
                     @wheel="handleWheel"
                     @mousedown.prevent="startDrag"
                     @mousemove="drag"
                     @mouseup="endDrag"
                     @mouseleave="endDrag">
            </div>
            123
            <td>{{ item.id }}</td>
            <td>{{ item.zname }}</td>
            <td>{{ item.ProductTime }}</td>
            <td>
              <button @click="downloadItem(item.id)">下载</button>
              <button @click="viewDetails(item.id)">查看详情</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      satellites: [],
      selectedSatellite: '',
      searchTerm: '',
      allData: [],
      dataList: [],
      currentPage: 1,
      itemsPerPage: 10,
      dataName: '',
      startDate: '',  // 开始日期
      endDate: '',     // 结束日期
      largeImage: null,
      zoomLevel: 1,
      isDragging: false,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0
    };
  },

  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.dataList.slice(start, end);
    }
  },

  methods: {
    filterData() {
        this.dataList = this.allData;

        if (this.dataName) {
          this.dataList = this.dataList.filter(item => item.zname.includes(this.dataName));
        }

        // 使用成像时间进行过滤
        if (this.startDate || this.endDate) {
          this.dataList = this.dataList.filter(item => {
            const imagingDateTime = new Date(item.ProductTime); // 解析数据库中的时间
            const imagingDate = new Date(imagingDateTime.getFullYear(), imagingDateTime.getMonth(), imagingDateTime.getDate()); // 仅获取日期部分
            const startDate = this.startDate ? new Date(this.startDate) : null;
            const endDate = this.endDate ? new Date(this.endDate) : null;

            if (startDate && endDate) {
              return imagingDate >= startDate && imagingDate <= endDate;
            } else if (startDate) {
              return imagingDate >= startDate;
            } else if (endDate) {
              return imagingDate <= endDate;
            }
          });
        }
      },
    addToDownloadList() {
      // TODO: 实现加入下载清单的功能
    },

    downloadSelected() {
      // TODO: 实现下载选中的功能
    },

    downloadItem(itemId) {
      axios.get(`http://127.0.0.1:8000/api/v1/download_data/${itemId}/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        // TODO: 处理下载逻辑
      })
      .catch(error => {
        console.error("Error downloading item:", error);
      });
    },
    getImageUrl(id) {
        return `http://127.0.0.1:8000/get_image/${id}/`;
    },
    showLargeImage(id) {
    this.largeImage = `http://127.0.0.1:8000/get_image/${id}/`;
    },
    handleWheel(event) {
        if (event.deltaY > 0) {
            this.zoomLevel -= 0.1;  // 向上滚动时放大
        } else {
            this.zoomLevel += 0.1;  // 向下滚动时缩小
        }
    },
    startDrag(event) {
        this.isDragging = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
    },

    drag(event) {
        if (this.isDragging) {
            const dx = event.clientX - this.startX;
            const dy = event.clientY - this.startY;

            this.offsetX += dx;
            this.offsetY += dy;

            this.startX = event.clientX;
            this.startY = event.clientY;
        }
    },

    endDrag() {
        this.isDragging = false;
    },
    handleKeyUp(event) {
        if (event.key === 'Escape' && this.largeImage) {
            this.largeImage = null;
        }
    }
  },


  created() {
    axios.get('http://127.0.0.1:8000/api/v1/data_directory/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      this.dataList = response.data;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    })
    document.addEventListener('keyup', this.handleKeyUp);
  },
  beforeDestroy() {
      document.removeEventListener('keyup', this.handleKeyUp);
  }
}
</script>

<style scoped>
.data-directory-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.left-panel {
  padding: 20px;
  width: 150px;  /* 或您想要的任何其他宽度 */
}
.right-panel {
  flex: 2;
  padding: 20px;
  display: flex;  /* 设置为flex容器 */
  flex-wrap: wrap;  /* 允许子元素换行 */
  align-items: center;  /* 垂直居中子元素 */
}
.right-panel input,
.right-panel button {
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table th {
  background-color: #4CAF50;
  color: white;
}
.date-range {
  display: flex;
  align-items: center;
  gap: 5px; /* 根据需要调整间距 */
}
.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.9);
}

.modal-content {
    margin: auto;
    display: block;
    width: 90%;  /* 根据需要调整宽度 */
    max-width: 900px;  /* 根据需要调整最大宽度 */
    object-fit: cover;  /* 确保图片填充其容器 */
}

.close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
}
</style>
