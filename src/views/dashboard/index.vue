<script lang="ts" setup>
import { ref, reactive, computed } from "vue"

const data = ref([
  { value: 7, name: "A", date: "2023-10-04" },
  { value: 4, name: "B", date: "2023-10-05" },
  { value: 9, name: "C", date: "2023-10-06" },
  { value: 3, name: "D", date: "2023-10-07" },
  { value: 6, name: "E", date: "2023-10-08" }
])

const dataPay = ref([
  {
    date: "2020-06-12",
    value: 7
  },
  {
    date: "2020-06-13",
    value: 5
  },
  {
    date: "2020-06-14",
    value: 4
  },
  {
    date: "2020-06-15",
    value: 2
  },
  {
    date: "2020-06-16",
    value: 4
  },
  {
    date: "2020-06-17",
    value: 7
  },
  {
    date: "2020-06-18",
    value: 5
  },
  {
    date: "2020-06-19",
    value: 6
  },
  {
    date: "2020-06-20",
    value: 5
  },
  {
    date: "2020-06-21",
    value: 9
  },
  {
    date: "2020-06-22",
    value: 6
  },
  {
    date: "2020-06-23",
    value: 3
  },
  {
    date: "2020-06-24",
    value: 1
  },
  {
    date: "2020-06-25",
    value: 5
  },
  {
    date: "2020-06-26",
    value: 3
  },
  {
    date: "2020-06-27",
    value: 6
  },
  {
    date: "2020-06-18",
    value: 5
  }
])

const saleSearch = reactive({
  type: "saleroom",
  dateType: 0,
  datetime: ""
})

// 销售量趋势数据
const saleroomData1 = reactive([
  {
    month: "1月",
    value: 816
  },
  {
    month: "2月",
    value: 542
  },
  {
    month: "3月",
    value: 914
  },
  {
    month: "4月",
    value: 781
  },
  {
    month: "5月",
    value: 355
  },
  {
    month: "6月",
    value: 796
  },
  {
    month: "7月",
    value: 714
  },
  {
    month: "8月",
    value: 1195
  },
  {
    month: "9月",
    value: 1055
  },
  {
    month: "10月",
    value: 271
  },
  {
    month: "11月",
    value: 384
  },
  {
    month: "12月",
    value: 1098
  }
])
// 访问量趋势数据
const saleroomData2 = reactive([
  {
    month: "1月",
    value: 1098
  },
  {
    month: "2月",
    value: 384
  },
  {
    month: "3月",
    value: 271
  },
  {
    month: "4月",
    value: 1055
  },
  {
    month: "5月",
    value: 1195
  },
  {
    month: "6月",
    value: 714
  },
  {
    month: "7月",
    value: 796
  },
  {
    month: "8月",
    value: 355
  },
  {
    month: "9月",
    value: 781
  },
  {
    month: "10月",
    value: 914
  },
  {
    month: "11月",
    value: 542
  },
  {
    month: "12月",
    value: 816
  }
])

const saleroomRankData = [
  { name: "工专路 1 号店", value: "323,234" },
  { name: "工专路 2 号店", value: "323,234" },
  { name: "工专路 3 号店", value: "323,234" },
  { name: "工专路 4 号店", value: "323,234" },
  { name: "工专路 5 号店", value: "323,234" },
  { name: "工专路 6 号店", value: "323,234" },
  { name: "工专路 7 号店", value: "323,234" }
]

const visitsData = [
  {
    time: "16:00",
    visits: 15,
    views: 45
  },
  {
    time: "16:05",
    visits: 39,
    views: 169
  },
  {
    time: "16:10",
    visits: 152,
    views: 400
  },
  {
    time: "16:15",
    visits: 94,
    views: 285
  },
  {
    time: "16:20",
    visits: 102,
    views: 316
  },
  {
    time: "16:25",
    visits: 86,
    views: 148
  },
  {
    time: "16:30",
    visits: 39,
    views: 150
  },
  {
    time: "16:35",
    visits: 38,
    views: 234
  },
  {
    time: "16:40",
    visits: 95,
    views: 158
  },
  {
    time: "16:45",
    visits: 30,
    views: 100
  },
  {
    time: "16:50",
    visits: 86,
    views: 266
  }
]

const hotSearch = [
  {
    name: "软妹子",
    value: 23
  },
  {
    name: "汪星人",
    value: 23
  },
  {
    name: "长腿欧巴",
    value: 23
  },
  {
    name: "萝莉",
    value: 22
  },
  {
    name: "辣~",
    value: 22
  },
  {
    name: "K歌",
    value: 22
  },
  {
    name: "大长腿",
    value: 21
  },
  {
    name: "川妹子",
    value: 21
  },
  {
    name: "女神",
    value: 21
  },
  {
    name: "米粉",
    value: 20
  },
  {
    name: "专注设计",
    value: 20
  },
  {
    name: "逛街",
    value: 20
  },
  {
    name: "黑长直",
    value: 20
  },
  {
    name: "海纳百川",
    value: 19
  },
  {
    name: "萌萌哒",
    value: 19
  },
  {
    name: "坚持",
    value: 19
  },
  {
    name: "话唠",
    value: 19
  },
  {
    name: "果粉",
    value: 18
  },
  {
    name: "喵星人",
    value: 18
  },
  {
    name: "花粉",
    value: 18
  },
  {
    name: "衬衫控",
    value: 18
  },
  {
    name: "宅男",
    value: 17
  },
  {
    name: "小清新",
    value: 17
  },
  {
    name: "眼镜男",
    value: 17
  },
  {
    name: "琼瑶",
    value: 17
  },
  {
    name: "穷游党",
    value: 16
  },
  {
    name: "铲屎官",
    value: 16
  },
  {
    name: "正太",
    value: 16
  },
  {
    name: "中二病",
    value: 16
  },
  {
    name: "夜猫子",
    value: 15
  },
  {
    name: "逗比",
    value: 15
  },
  {
    name: "腹黑",
    value: 15
  },
  {
    name: "吃鸡",
    value: 15
  },
  {
    name: "为了联盟",
    value: 14
  },
  {
    name: "背包客",
    value: 14
  },
  {
    name: "民谣",
    value: 14
  },
  {
    name: "为了部落",
    value: 14
  },
  {
    name: "懒癌患者",
    value: 13
  },
  {
    name: "追剧",
    value: 13
  },
  {
    name: "IT民工",
    value: 13
  },
  {
    name: "CNB成员",
    value: 13
  },
  {
    name: "选择困难",
    value: 12
  },
  {
    name: "锤粉",
    value: 12
  },
  {
    name: "欧皇",
    value: 12
  },
  {
    name: "仙气十足",
    value: 12
  }
]

// setInterval(() => {
//   data.value = data.value.map((item) => ({
//     ...item,
//     value: Math.random() * 100
//   }))
// }, 1000)

const option = computed(() => {
  return {
    color: "#975fe5",
    tooltip: {
      trigger: "axis",
      formatter: '<i class="ele-chart-dot" style="background: #975fe5;"></i>{b0}: {c0}'
    },
    grid: {
      top: 10,
      bottom: 0,
      left: 0,
      right: 0
    },
    xAxis: [
      {
        show: false,
        type: "category",
        boundaryGap: false,
        data: data.value.map((d) => d.date)
      }
    ],
    yAxis: [
      {
        show: false,
        type: "value",
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        type: "line",
        smooth: true,
        symbol: "none",
        areaStyle: {
          opacity: 0.5
        },
        data: data.value.map((d) => d.value)
      }
    ]
  }
})

const payNumChartOption = computed(() => {
  return {
    tooltip: {
      trigger: "axis",
      formatter: '<i class="ele-chart-dot" style="background: #5b8ff9;"></i>{b0}: {c0}'
    },
    grid: {
      top: 10,
      bottom: 0,
      left: 0,
      right: 0
    },
    xAxis: [
      {
        show: false,
        type: "category",
        data: dataPay.value.map((d) => d.date)
      }
    ],
    yAxis: [
      {
        show: false,
        type: "value",
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        type: "bar",
        itemStyle: {
          color: "#6495ED" // 柱状图颜色
        },
        data: dataPay.value.map((d) => d.value)
      }
    ]
  }
})

const saleChartOption = computed(() => {
  const isSale = saleSearch.type === "saleroom"
  const data = isSale ? saleroomData1 : saleroomData2
  return {
    tooltip: {
      trigger: "axis"
    },
    grid: {
      top: "10%",
      left: "5%",
      right: "5%",
      bottom: "5%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: data.map((d) => d.month),
        axisTick: {
          alignWithLabel: true,
          length: 0
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          lineStyle: {
            type: "dotted",
            width: 2
          },
          show: true
        }
      }
    ],
    series: [
      {
        type: "bar",
        barCategoryGap: "60%",
        itemStyle: {
          color: "#6495ED" // 柱状图颜色
        },
        data: data.map((d) => d.value)
      }
    ]
  }
})

const visitsOption = computed(() => {
  return {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["浏览量", "访问量"],
      right: 20
    },
    grid: {
      top: "10%",
      left: "3%",
      right: "3%",
      // bottom: "10%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: visitsData.map((d) => d.time),
        axisTick: {
          alignWithLabel: true
          // length: 0
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          lineStyle: {
            type: "dotted",
            width: 2
          },
          show: true
        }
      }
    ],
    series: [
      {
        name: "浏览量",
        type: "line",
        smooth: true,
        symbol: "none",
        color: "#5e94fb",
        areaStyle: {
          opacity: 0.5
        },
        data: visitsData.map((d) => d.views)
      },
      {
        name: "访问量",
        type: "line",
        smooth: true,
        symbol: "none",
        color: "#61ddaa",
        areaStyle: {
          opacity: 0.5
        },
        data: visitsData.map((d) => d.visits)
      }
    ]
  }
})

const hotSearchOption = computed(() => {
  return {
    tooltip: {
      show: true,
      confine: true,
      borderWidth: 1
    },
    series: [
      {
        type: "wordCloud",
        top: -20,
        width: "100%",
        height: "100%",
        sizeRange: [12, 20],
        gridSize: 6,
        textStyle: {
          normal: {
            color: function () {
              //文字颜色的随机色
              return (
                "rgb(" +
                [
                  Math.round(Math.random() * 250),
                  Math.round(Math.random() * 250),
                  Math.round(Math.random() * 250)
                ].join(",") +
                ")"
              )
            }
          },
          //悬停上去的字体的阴影设置
          emphasis: {
            shadowBlur: 10,
            shadowColor: "#333"
          }
        },
        data: hotSearch
      }
    ]
  }
})
</script>

<template>
  <div class="app-container">
    <div class="flex w-full justify-between box-border">
      <!-- 总销售额 -->
      <div class="w-3/12 h-50 flex flex-col bg-white rounded-md mr-3">
        <div class="px-4 py-3 border-b border-gray-200 font-sans text-sm" text-gray-600>总销售额</div>
        <div class="px-4 py-5 font-sans text-3xl">￥126,560</div>
        <div class="flex mx-4 pb-4 border-b border-gray-200">
          <div class="font-sans text-sm flex items-center text-gray-600">
            周同比12% <CaretTop style="width: 1em; height: 1em; margin-right: 8px; display: inline; color: #ff4d4f" />
          </div>
          <div class="font-sans text-sm flex items-center text-gray-600">
            日同比11%
            <CaretBottom style="width: 1em; height: 1em; margin-right: 8px; display: inline; color: #52c41a" />
          </div>
        </div>
        <div class="px-4 py-3 font-sans text-sm text-gray-600">日销售额￥12,423</div>
      </div>

      <!-- 访问量 -->
      <div class="w-3/12 h-50 flex flex-col bg-white rounded-md mr-3">
        <div class="flex justify-between px-4 py-3 border-b border-gray-200">
          <div class="font-sans text-sm" text-gray-600>访问量</div>
          <el-tag type="danger">日</el-tag>
        </div>
        <!-- <div class="h-24"> -->
        <div class="h-10 px-4 py-5 font-sans text-3xl">8,846</div>
        <e-charts class="w-full h-17 pb-3 border-b border-gray-200" :option="option" />
        <!-- </div> -->
        <div class="px-4 py-3 font-sans text-sm text-gray-600">日访问量1,234</div>
      </div>

      <!-- 支付笔数 -->
      <div class="w-3/12 h-50 flex flex-col bg-white rounded-md mr-3">
        <div class="flex justify-between px-4 py-3 border-b border-gray-200">
          <div class="font-sans text-sm" text-gray-600>支付笔数</div>
          <el-tag>月</el-tag>
        </div>
        <!-- <div class="h-24"> -->
        <div class="h-10 px-4 py-5 font-sans text-3xl">6,560</div>
        <e-charts class="h-17 pb-3 border-b border-gray-200 w-full" :option="payNumChartOption" :auto-resize="true" />
        <!-- </div> -->
        <div class="px-4 py-3 font-sans text-sm text-gray-600">转化率60%</div>
      </div>

      <!-- 运营活动效果 -->
      <div class="w-3/12 h-50 flex flex-col bg-white rounded-md">
        <div class="flex justify-between px-4 py-3 border-b border-gray-200">
          <div class="font-sans text-sm" text-gray-600>运营活动效果</div>
          <el-tag type="success">周</el-tag>
        </div>
        <div class="px-4 py-5 font-sans text-3xl">78%</div>
        <div class="mx-4 pb-4 border-b border-gray-200">
          <el-progress :percentage="78" :stroke-width="10" color="#13c2c2" />
        </div>
        <div class="px-4 py-3 font-sans text-sm text-gray-600 flex">
          <div class="font-sans text-sm flex items-center text-gray-600">
            周同比12% <CaretTop style="width: 1em; height: 1em; margin-right: 8px; display: inline; color: #ff4d4f" />
          </div>
          <div class="font-sans text-sm flex items-center text-gray-600">
            日同比11%
            <CaretBottom style="width: 1em; height: 1em; margin-right: 8px; display: inline; color: #52c41a" />
          </div>
        </div>
      </div>
    </div>

    <!-- 销售量/访问量 -->
    <div class="w-full h-100 mt-3 bg-white rounded-md box-border">
      <div class="demo-monitor-tool">
        <el-tabs v-model="saleSearch.type" class="demo-monitor-tabs">
          <el-tab-pane label="销售额" name="saleroom" />
          <el-tab-pane label="访问量" name="visits" />
        </el-tabs>
      </div>
      <div class="flex w-full h-80 border-t border-gray-200">
        <div class="w-9/12">
          <div class="font-sans text-sm text-gray-600 px-8 mt-4">
            <span v-if="saleSearch.type === 'saleroom'">销售额趋势</span>
            <span v-else>访问量趋势</span>
          </div>
          <e-charts ref="saleChart" class="w-full" :option="saleChartOption" />
        </div>
        <div class="w-3/12">
          <div class="font-sans text-sm text-gray-600 px-8 mt-4 flex">
            <div>门店</div>
            <div>
              <span v-if="saleSearch.type === 'saleroom'">销售额</span>
              <span v-else>访问量</span>
            </div>
            <div>排名</div>
          </div>
          <div
            v-for="(item, index) in saleroomRankData"
            :key="index"
            class="flex justify-between justify-self-center p-3 w-full"
          >
            <div class="flex h-5">
              <div class="bg-slate-800 text-white w-5 h-5 rounded-full text-center leading-5 text-sm">
                {{ index + 1 }}
              </div>
              <div class="text-sm ml-2">{{ item.name }}</div>
            </div>
            <div class="text-sm text-gray-500">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近1小时访问情况 -->
    <div class="w-full h-100 mt-3 flex">
      <div class="w-9/12 bg-white rounded-md box-border mr-3">
        <div class="font-sans text-base text-gray-700 px-8 mt-4 pb-4 border-b border-gray-200">最近1小时访问情况</div>
        <e-charts ref="visitsChart" class="w-full" :option="visitsOption" />
      </div>
      <div class="w-3/12 bg-white rounded-md box-border">
        <div class="font-sans text-base text-gray-700 px-8 mt-4 pb-4 border-b border-gray-200">热门搜索</div>
        <e-charts ref="visits2Chart" class="w-full" :option="hotSearchOption" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 销售额、访问量工具栏 */
.demo-monitor-tool {
  padding: 0 20px;

  .demo-monitor-tabs {
    height: 51px;
  }

  :deep(.el-tabs__item) {
    height: 51px;
    line-height: 51px;
    font-size: 15px;
  }

  :deep(.el-tabs__nav-wrap:after) {
    display: none;
  }
}

/* 小标题 */
.demo-monitor-title {
  padding: 0 20px;
  margin: 15px 0 5px 0;
}

/* 排名 item */
.demo-monitor-rank-item {
  padding: 0 20px;
  line-height: 20px;
  margin-top: 18px;
}
</style>
