const vm = new Vue({
    el: '#app',
    data: {
        goodsList: [
          {
            title: '上装',
            typeList: ['全部', '针织衫', '毛呢外套', 'T恤', '羽绒服', '棉衣', '卫衣', '风衣' ],
            id: 1,
          },
          {
            title: '裤装',
            typeList: ['全部', '牛仔裤', '小脚/铅笔裤', '休闲裤' ,'打底裤', '哈伦裤'],
            id: 2,
          },
          {
            title: '裙装',
            typeList: ['全部', '连衣裙', '半身裙', '长袖连衣裙', '中长款连衣裙'],
            id: 3,
          }
        ],
        filterList: {},
        flag: true,
    },
    methods: {
        add: function (goodsIndex, goods, itemIndex, item) {
            if (item == '全部') {
                this.$delete(this.filterList, goodsIndex);
                this.$set(goods, 'index', 0);
                this.isShow();
            }else {
                this.flag = false;
                goods.index = itemIndex;
                this.$set(this.filterList, goodsIndex, item)
            }
        },
        deleteItem: function (key) {
            this.goodsList[key].index = 0;
            this.$delete(this.filterList, key);
            this.isShow();
        },
        isShow: function () {
            this.flag = JSON.stringify(this.filterList) == '{}' ? true : false;
        }
    }
})
vm.goodsList.forEach(ele => vm.$set(ele, 'index', 0));