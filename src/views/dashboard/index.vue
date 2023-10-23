<script lang="ts" setup>
import { ref, computed } from "vue"

const data = ref([
  { value: 7, name: "A", date: "2023-10-04" },
  { value: 4, name: "B", date: "2023-10-05" },
  { value: 9, name: "C", date: "2023-10-06" },
  { value: 3, name: "D", date: "2023-10-07" },
  { value: 6, name: "E", date: "2023-10-08" }
])

// setInterval(() => {
//   data.value = data.value.map((item) => ({
//     ...item,
//     value: Math.random() * 100
//   }))
// }, 1000)

const option = computed(() => {
  // return {
  //   xAxis: {
  //     type: "category",
  //     data: data.value.map((el) => el.name)
  //   },
  //   yAxis: {
  //     type: "value"
  //   },
  //   series: [
  //     {
  //       data: data.value.map((el) => el.value),
  //       type: "line"
  //     }
  //   ]
  // }
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
</script>

<template>
  <!-- <el-row>
    <el-col :span="4">
      <div>总销售额</div>
    </el-col>
    <el-col :span="10">
      <e-charts class="h-80" :option="option" />
    </el-col>
    <el-col :span="10">
      <e-charts class="h-80" :option="option" />
    </el-col>
  </el-row> -->
  <div class="app-container">
    <div class="flex justify-around">
      <div class="w-96 h-50 flex flex-col bg-white rounded-md">
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

      <div class="w-96 h-50 flex flex-col bg-white rounded-md">
        <div class="flex justify-between px-4 py-3 border-b border-gray-200">
          <div class="font-sans text-sm" text-gray-600>访问量</div>
          <el-tag size="mini" type="danger">日</el-tag>
        </div>
        <!-- <div class="h-24"> -->
        <div class="h-10 px-4 py-5 font-sans text-3xl">8,846</div>
        <e-charts class="h-17 pb-3 border-b border-gray-200" :option="option" />
        <!-- </div> -->
        <div class="px-4 py-3 font-sans text-sm text-gray-600">日访问量1,234</div>
      </div>

      <div class="w-96 h-50 flex flex-col bg-white rounded-md">
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

      <div class="w-96 h-50 flex flex-col bg-white rounded-md">
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
    </div>
  </div>
</template>
