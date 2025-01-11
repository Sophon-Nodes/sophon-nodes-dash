<template>     
    <div class="progress-bar-container">
      <div class="progress-bar" :class="getBarClass(index)" v-for="(group, index) in progressGroups" :key="index">
        <div v-for="(segment, segIndex) in group.segments" :key="segIndex" class="progress-segment" :class="getSegmentClass(index, segIndex)"></div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    uptimePercentage: {
      type: Number,
      required: true
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
      return Math.floor((this.uptimePercentage / 100) * this.totalSegments);
    },
    progressColor() {
      if (this.uptimePercentage > 90) {
        return 'green';
      } else if (this.uptimePercentage > 50) {
        return 'blue';
      } else {
        return 'red';
      }
    }
  },
  methods: {
    getSegmentClass(groupIndex, segmentIndex) {
      let segmentCount = 0;
      for (let i = 0; i < groupIndex; i++) {
        segmentCount += this.progressGroups[i].segments.length;
      }
      segmentCount += segmentIndex;
      
      let groupEnd = segmentCount - segmentIndex + this.progressGroups[groupIndex].segments.length;
      let groupStart = segmentCount - segmentIndex;
      
      let hasActiveSegments = this.activeSegments > groupStart && this.activeSegments <= groupEnd;
      
      if (segmentCount < this.activeSegments) {
        return `${this.progressColor}-segment`;
      } else {
        if (!hasActiveSegments) {
          return 'inactive-segment';
        } else {
          return `inactive-${this.progressColor}-segment`;
        }
      }
    },
    getBarClass(groupIndex) {
      let segmentCount = 0;
      for (let i = 0; i < groupIndex; i++) {
        segmentCount += this.progressGroups[i].segments.length;
      }
      let groupEnd = segmentCount + this.progressGroups[groupIndex].segments.length;
      let groupStart = segmentCount;
      
      let allActiveSegments = this.activeSegments >= groupEnd;
      
      let hasActiveSegments = this.activeSegments > groupStart && this.activeSegments <= groupEnd;
      
      if (allActiveSegments) {
        return this.progressColor;
      } else if (hasActiveSegments) {
        return this.progressColor;
      } else {
        return 'inactive-bar';
      }
    }
  }
}
</script>

<style scoped>
.progress-bar-container {
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
}

.progress-bar {
  display: flex;
  padding: 3px;
  align-items: center;
  gap: 3px;
  align-self: stretch;
  border-radius: 9999px;
}

.progress-bar.inactive-bar {
  background: #272727;
}

.progress-bar.red {
  background: #6C0404;
}

.progress-bar.blue {
  background: #053B7A;
}

.progress-bar.green {
  background: #21432A;
}

.progress-segment {
  width: 36px;
  height: 12px;
  border-radius: 9999px;
}

.progress-segment:last-child {
  border-right: none;
}

.inactive-segment {
  border: 1px solid #373737;
  background: #1A1A1A;
}

.red-segment {
  border: 1px solid #FF6363;
  background: #E00000;
}

.blue-segment {
  border: 1px solid #63B6FF;
  background: #0079FE;
}

.green-segment {
  border: 1px solid #87E8A1;
  background: #34C85A;
}

.inactive-red-segment {
  border: 1px solid #300;
  background: #300;
}

.inactive-blue-segment {
  border: 1px solid #002042;
  background: #002042;
}

.inactive-green-segment {
  border: 1px solid #0E341D;
  background: #0E341D;
}
</style>