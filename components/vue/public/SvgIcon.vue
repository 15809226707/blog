<template>
  <svg class="svg-icon" aria-hidden="true" :style="iconSize">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    size:{
      type:String,
      default:''
    }
  },
  computed: {
    iconName() {
      return `#${this.iconClass }`
    },
    iconSize(){
      return this.size ? `font-size:${this.size}` : ''
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  transform: rotate(0deg);
}
</style>
