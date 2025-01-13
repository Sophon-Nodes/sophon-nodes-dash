<template>     
    <div class="mt-2.5 grid grid-cols-10 gap-1 self-stretch">
      <div v-for="(group, index) in progressGroups" :key="index"
           class="progress-bar flex p-[2px] items-center gap-[3px] self-stretch rounded-full"
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
    }
  },
  methods: {
    getBarClass(groupIndex) {
      if (!this.isActive) return 'bg-gray-900';
      
      if (groupIndex === 0) {
        return this.uptimePercentage < 60 ? 'bg-red-900' : 'bg-green-900';
      } else if (groupIndex === 1) {
        return this.uptimePercentage < 80 ? 'bg-red-900' : 'bg-green-900';
      } else {
        return this.uptimePercentage < 90 ? 'bg-red-900' : 'bg-green-900';
      }
    },
    getSegmentClass(groupIndex, segmentIndex) {
      if (!this.isActive) return 'bg-gray-700';

      let totalPreviousSegments = 0;
      for (let i = 0; i < groupIndex; i++) {
        totalPreviousSegments += this.progressGroups[i].segments.length;
      }
      const currentSegmentNumber = totalPreviousSegments + segmentIndex + 1;

      if (currentSegmentNumber <= this.activeSegments) {
        if (groupIndex === 0) {
          return this.uptimePercentage < 60 ? 'bg-red-500' : 'bg-green-500';
        } else if (groupIndex === 1) {
          return this.uptimePercentage < 80 ? 'bg-red-500' : 'bg-green-500';
        } else {
          return this.uptimePercentage < 90 ? 'bg-red-500' : 'bg-green-500';
        }
      }
      return 'bg-gray-700';
    }
  }
}
</script>

<style scoped>
.progress-bar.bg-red-900 {
  background: #6C0404;
}

.progress-bar.bg-blue-900 {
  background: #053B7A;
}

.progress-bar.bg-green-900 {
  background: #21432A;
}

.progress-bar.bg-gray-900 {
  background: #272727;
}

.bg-gray-700 {
  border: 1px solid #373737;
  background: #1A1A1A;
}

.bg-red-500 {
  border: 1px solid #FF6363;
  background: #E00000;
}

.bg-blue-500 {
  border: 1px solid #63B6FF;
  background: #0079FE;
}

.bg-green-500 {
  border: 1px solid #87E8A1;
  background: #34C85A;
}
</style>