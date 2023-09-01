<template>
  <div>
    <header>
      <h1><a href="http://ids.ceode.ac.cn/gfds/query">科学数据中心共享服务平台</a> 使用帮助</h1>
    </header>
    <section class="cd-faq">
      <ul class="cd-faq-categories">
        <li><a class="selected" href="http://ids.ceode.ac.cn/gfds/help/faq.html#FTP">FTP下载</a></li>
        <li><a href="http://ids.ceode.ac.cn/gfds/help/faq.html#account">系统账号和下载额度</a></li>
        <li><a href="http://ids.ceode.ac.cn/gfds/help/faq.html#unzip">数据解压缩问题</a></li>
        <li><a href="http://ids.ceode.ac.cn/gfds/help/faq.html#downloadlist">下载清单</a></li>
        <li><a href="http://ids.ceode.ac.cn/gfds/help/faq.html#other">其他</a></li>
      </ul>
      <div class="cd-faq-items">
        <ul id="FTP" class="cd-faq-group">
          <li class="cd-faq-title"><h2>FTP下载</h2></li>
          <li v-for="item in ftpItems" :key="item.title">
            <a class="cd-faq-trigger" :href="item.link">{{ item.title }}</a>
            <div class="cd-faq-content">
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>

        <ul id="account" class="cd-faq-group">
          <li class="cd-faq-title"><h2>系统账号和下载额度</h2></li>
          <li v-for="item in accountItems" :key="item.title">
            <a class="cd-faq-trigger" :href="item.link">{{ item.title }}</a>
            <div class="cd-faq-content">
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>

        <ul id="unzip" class="cd-faq-group">
          <li class="cd-faq-title"><h2>数据解压缩问题</h2></li>
          <li v-for="item in unzipItems" :key="item.title">
            <a class="cd-faq-trigger" :href="item.link">{{ item.title }}</a>
            <div class="cd-faq-content">
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>

        <ul id="downloadlist" class="cd-faq-group">
          <li class="cd-faq-title"><h2>下载清单</h2></li>
          <li v-for="item in downloadListItems" :key="item.title">
            <a class="cd-faq-trigger" :href="item.link">{{ item.title }}</a>
            <div class="cd-faq-content">
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>

        <ul id="other" class="cd-faq-group">
          <li class="cd-faq-title"><h2>其他问题</h2></li>
          <li v-for="item in otherItems" :key="item.title">
            <a class="cd-faq-trigger" :href="item.link">{{ item.title }}</a>
            <div class="cd-faq-content">
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>
      </div>
      <a href="http://ids.ceode.ac.cn/gfds/help/faq.html#0" class="cd-close-panel">Close</a>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ftpItems: [
        {
          title: '网站数据怎么使用FTP下载？',
          link: 'http://ids.ceode.ac.cn/gfds/help/faq.html#0',
          content: '数据下载清单中的数据，均可以使用ftp进行下载。ftp地址： ftp://124.16.184.35 。ftp用户名和密码与本系统相同。...'
        },
        {
          title: 'FTP实现数据批量下载的步骤与流程是什么？',
          link: 'http://ids.ceode.ac.cn/gfds/help/faq.html#0',
          content: '用户可以借助FTP客户端工具实现内部共享数据的批量下载功能。...'
        },
        // ... More FTP items
      ],
      accountItems: [
        {
          title: '我的系统账号是什么？',
          link: 'http://ids.ceode.ac.cn/gfds/help/faq.html#0',
          content: '名字为三个字的员工，在本系统的账号规则是 ：air_+姓的全拼+名字的首字母。...'
        },
        {
          title: '从哪里可以查询我的系统账号？',
          link: 'http://ids.ceode.ac.cn/gfds/help/faq.html#0',
          content: '如果您无法确认自己的账户名，也可以发邮件到duanjb@aircas.ac.cn进行查询。...'
        },
        // ... More account items
      ],
      unzipItems: [
        {
          title: '下载的数据怎么解压缩不了？',
          link: 'http://ids.ceode.ac.cn/gfds/help/faq.html#0',
          content: '系统的数据解压缩要使用专用的7Zip解压缩软件，软件请从以下地址下载:...'
        },
        // ... More unzip items
      ],
      downloadListItems: [
        {
          title: '数据下载清单是什么意思，和数据下载额度有什么关系？',
          link: 'http://ids.ceode.ac.cn/gfds/help/faq.html#0',
          content: '数据下载清单记录了所有要下载和已经下载的数据。数据加入下载清单后，就可以从网页或者通过FTP进行下载。...'
        },
        // ... More download list items
      ],
      otherItems: [
        {
          title: '系统使用过程中遇到了问题，应该找谁联系咨询呢？',
          link: 'http://ids.ceode.ac.cn/gfds/help/faq.html#0',
          content: '如在数据查询和下载中遇到疑问，请联系：duanjb@aircas.ac.cn或者liusb@aircas.ac.cn。...'
        },
        // ... More other items
      ],
    };
  },
};
</script>

