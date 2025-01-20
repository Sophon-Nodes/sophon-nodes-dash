<template>     
    <div class="mt-2.5 grid grid-cols-10 gap-1 self-stretch">
      <div v-for="(group, index) in progressGroups" :key="index"
           class="progress-bar flex p-[3px] items-center gap-[3px] self-stretch rounded-full"
           :class="[getBarClass(index), index === 0 ? 'col-span-6' : 'col-span-2']">
        <div v-for="(segment, segIndex) in group.segments" :key="segIndex" 
             class="progress-segment h-2.5 flex-1 rounded-full" 
             :class="getSegmentClass(index, segIndex)"></div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    uptimePercentage: {
      type: Number,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      progressGroups: [
        { segments: Array(6).fill(0) },
        { segments: Array(2).fill(0) },
        { segments: Array(2).fill(0) }
      ],
    };
  },
  computed: {
    totalSegments() {
      return this.progressGroups.reduce((total, group) => total + group.segments.length, 0);
    },
    activeSegments() {
      if (this.uptimePercentage < 60) {
        // Scale 0-59.99% across 6 segments
        return Math.min(6, Math.ceil((this.uptimePercentage / 60) * 6));
      } else if (this.uptimePercentage < 70) {
        // 60-69.99% = 7 segments
        return 7;
      } else if (this.uptimePercentage < 80) {
        // 70-79.99% = 8 segments
        return 8;
      } else if (this.uptimePercentage < 90) {
        // 80-89.99% = 9 segments
        return 9;
      } else {
        // 90-100% = 10 segments
        return 10;
      }
    },
    progressColor() {
      if (this.uptimePercentage >= 80) {
        return 'green';
      } else if (this.uptimePercentage >= 60) {
        return 'blue';
      } else {
        return 'red';
      }
    }
  },
  methods: {
    getBarClass(groupIndex) {
      if (!this.isActive) return 'bg-gray-100 dark:bg-gray-900';
      
      let segmentCount = 0;
      for (let i = 0; i < groupIndex; i++) {
        segmentCount += this.progressGroups[i].segments.length;
      }
      let groupEnd = segmentCount + this.progressGroups[groupIndex].segments.length;
      let groupStart = segmentCount;
      
      let allActiveSegments = this.activeSegments >= groupEnd;
      let hasActiveSegments = this.activeSegments > groupStart && this.activeSegments <= groupEnd;
      
      if (allActiveSegments || hasActiveSegments) {
        if (this.progressColor === 'red') return 'bg-red-100 dark:bg-[#6C0404]';
        if (this.progressColor === 'blue') return 'bg-blue-100 dark:bg-[#053B7A]';
        return 'bg-green-100 dark:bg-[#21432A]';
      }
      return 'bg-gray-100 dark:bg-[#272727]';
    },
    getSegmentClass(groupIndex, segmentIndex) {
      if (!this.isActive) return 'bg-gray-200 dark:bg-[#1A1A1A] dark:border dark:border-[#373737]';

      let segmentCount = 0;
      for (let i = 0; i < groupIndex; i++) {
        segmentCount += this.progressGroups[i].segments.length;
      }
      segmentCount += segmentIndex;
      
      let groupEnd = segmentCount - segmentIndex + this.progressGroups[groupIndex].segments.length;
      let groupStart = segmentCount - segmentIndex;
      
      let hasActiveSegments = this.activeSegments > groupStart && this.activeSegments <= groupEnd;
      
      if (segmentCount < this.activeSegments) {
        if (this.progressColor === 'red') return 'bg-red-600 border-red-700 dark:bg-[#E00000] dark:border dark:border-[#FF6363]';
        if (this.progressColor === 'blue') return 'bg-blue-600 border-blue-700 dark:bg-[#0079FE] dark:border dark:border-[#63B6FF]';
        return 'bg-green-600 border-green-700 dark:bg-[#34C85A] dark:border dark:border-[#87E8A1]';
      } else {
        if (!hasActiveSegments) {
          return 'bg-gray-200 dark:bg-[#1A1A1A] dark:border dark:border-[#373737]';
        } else {
          if (this.progressColor === 'red') return 'bg-red-50 dark:bg-[#450303]';
          if (this.progressColor === 'blue') return 'bg-blue-50 dark:bg-[#032449]';
          return 'bg-green-50 dark:bg-[#14291A]';
        }
      }
    }
  }
}
</script>

<style scoped>
.progress-segment {
  transition: all 0.2s ease-in-out;
}
</style>