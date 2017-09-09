<template>
  <div class="container body">
    <!-- page content -->
    <div class="row">
      <div class="col-xs-12 x_title">
        <h3>笔记本商品列表</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-3">
        <form class="form-inline">
          <div class="form-group">
            <label for="page-size">每页显示记录数：</label>
            <select class="form-control" @change="modifyPageSize" id="page-size">
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="40">40</option>
                                            <option value="60">60</option>
                                            <option value="80">80</option>
                                            <option value="100">100</option>
                                          </select>
          </div>
        </form>
      </div>
      <div class="col-xs-4 col-xs-offset-5">
        <div class="form-group has-feedback">
          <label for="product-kw" class="sr-only">搜索关键字：</label>
          <input class="form-control" type="text" v-model="searchTxt" id="product-kw " placeholder="请输入搜索关键字 ">
          <span class="glyphicon glyphicon-search form-control-feedback "></span>
        </div>
      </div>
    </div>
    <div class="row ">
      <div class="col-xs-12 ">
        <div class="table-responsive ">
          <table class="table table-hover table-striped " id="table-laptop ">
            <thead>
              <tr>
                <th>
                  <div class="checkbox " style="margin: 0; ">
                    <label><input type="checkbox"/>全选</label>
                  </div>
                </th>
                <th>编号</th>
                <th>图片</th>
                <th>型号</th>
                <th>主标题</th>
                <th>规格</th>
                <th>单价</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!isReady ">
                <td colspan="8 ">
                  <div class="loading ">
  
                  </div>
                </td>
              </tr>
              <tr v-for="detail in pager.data " v-if="isReady ">
                <td><input type="checkbox" /></td>
                <td>{{detail.lid}}</td>
                <td>
                  <img class="pic" :src="require( '../assets/'+detail.pic) ">
                </td>
                <td>
                  <p class="fname" :title="detail.fname ">{{detail.fname}}</p>
                </td>
                <td>
                  <p class="title" :title="detail.title ">{{detail.title}}</p>
                </td>
                <td>
                  <p class="spec" :title="detail.spec ">{{detail.spec}}</p>
                </td>
                <td>￥{{detail.price}}</td>
                <td>
                  <a href="product_details.html ">详情</a>
                  <a href="product_update.html ">修改</a>
                  <a href="product_delete.html ">删除</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row ">
          <div class="col-xs-12 ">
            <ul class="pagination pull-right " id="pagination ">
              <li v-if="pageNo !=1 ">
                <a @click="prevPageNo() ">上一页</a>
              </li>
              <li :class="pageActive(index) " v-for="index of pageCountNums ">
                <a @click="modifyPageNo(index) ">{{index}}</a>
              </li>
              <li v-if="pageNo !=pageCount "><a @click="nextPageNo() ">下一页</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <br>
    <!-- /page content -->
  </div>
</template>

<script>
  export default {
    name: 'productList',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        isReady: false,
        pager: [],
        pageSize: 10,
        pageNo: 1,
        pageCount: 1,
        pageCountNums: [],
        searchTxt: ''
      }
    },
    mounted: function() {
      this.loadProductByPage(1, 10)
    },
    watch: {
      searchTxt: function() {
        this.loadProductByPage(1, this.pageSize, this.searchTxt);
      }
    },
    methods: {
      pageActive: function(index) {
        return {
          active: index == this.pageNo
        }
      },
      modifyPageSize: function(e) {
        console.log(e.target.value);
        this.pageSize = e.target.value
        this.loadProductByPage(this.pageNo, this.pageSize);
      },
      prevPageNo: function() {
        this.pageNo--;
        this.modifyPageNo(this.pageNo);
      },
      nextPageNo: function() {
        this.pageNo++;
        this.modifyPageNo(this.pageNo);
      },
      modifyPageNo: function(index) {
        if (index == 1) {
          //禁用上一页
        } else if (index == this.pageCount) {
          //禁用下一页
        }
        this.pageNo = index;
        this.loadProductByPage(this.pageNo, this.pageSize);
      },
      loadProductByPage: function(pno, pageSize, searchTxt) {
        //$('#table-laptop tbody').html('<div class="loading"><img src="../assets/img/loading.gif" alt=""></div>');
        var url = 'http://localhost/ajia/admin/data_callback/product_list.php?pageSize=' +
          pageSize + "&pno=" + pno;
        if (searchTxt) {
          url += "&kw=" + searchTxt
        }
        this.$http.jsonp(url)
          .then(function(response) {
            this.isReady = true;
            this.pager = response.data;
            this.pageCount = response.data.pageCount;
            this.pageCountNums.length = 0;
            for (var i = 0; i < this.pageCount; i++) {
              var index = i + 1;
              this.pageCountNums.push(index);
            }
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #table-laptop p {
    margin: 0;
  }
  
  td .title,
  td .fname,
  td .spec {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  td .title {
    width: 120px;
  }
  
  td .fname {
    width: 80px;
  }
  
  td .spec {
    width: 60px;
  }
  
  td .pic {
    width: 40px;
    vertical-align: middle;
    position: absolute;
    margin-top: -8px;
  }
</style>
