const vm = new Vue({
    el: '#app',
    data: {
        list: [
            {
                type: 0,
                title: '正在进行',
                task: ['吃饭', '睡觉'],
                taskNum: null
            },
            {
                type: 1,
                title: '已经完成',
                task: ['玩耍', '喝水'],
                taskNum: null
            }
        ]
    },
    methods: {
        insert: function () {
            var oInp = document.getElementById('inp');
            this.list[0].task.push(oInp.value);
            this.list[0].taskNum += 1;
            oInp.value = '';
        },
        change: function (task, taskIndex, item) {
            if (item.type == 0) {
                this.list[0].task.splice(taskIndex, 1);
                this.list[1].task.push(task);
                this.list[0].taskNum -= 1;
                this.list[1].taskNum += 1;
            }else {
                this.list[1].task.splice(taskIndex, 1);
                this.list[0].task.push(task);
                this.list[1].taskNum -= 1;
                this.list[0].taskNum += 1;
            }
        },
        deleteTask: function (task, taskIndex, item) {
            if (item.type == 0) {
                this.list[0].task.splice(taskIndex, 1);
                this.list[0].taskNum -= 1;
            }else {
                this.list[1].task.splice(taskIndex, 1);
                this.list[1].taskNum -= 1;
            }
        }
    },
    created () {
        this.list[0].taskNum = this.list[0].task.length;
        this.list[1].taskNum = this.list[1].task.length;
    }
})