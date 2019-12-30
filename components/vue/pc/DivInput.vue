<template>
    <div class="div-input" :class="{'div-input_focus': isLock}">
          <div 
            class="edit-input" 
            :style="{'font-size':fontSize}"
            v-html="innerText"
            :contenteditable="isEdit"
            @focus="isLock = true"
            @blur="onBlur"
            @input="changeText">
         </div>
    </div> 
</template>

<script>
export default {
 name: 'DivInput',
 props:{
     value:{
         type:String,
         default:''
     },
     isEdit:{
         type:Boolean,
         default:true
     },
     fontSize:{
         type:String,
         default:'14px' 
     }
 },
 data() {
 return {
   innerText:this.value,
   isLock:false
 }
 },
 created(){},
 mounted(){},
 watch: {
    'value'(){   
         if(!this.isLock || !this.innerText) {
                this.innerText =this.value;
                }
            }
  },
 methods:{
    onBlur(e){
        this.isLock = false
        if(!e.target.innerText){
            e.target.innerText=this.innerText
            this.$emit('input',e.target.innerText)
        }
    },
   changeText(e){
       this.$emit('input',e.target.innerText);
   }
 }
}
</script>

<style lang='scss' scoped>
    .div-input{
        box-sizing: border-box;
        border-radius: 2px;
        border: solid 1px transparent;
        div[contenteditable=true]{
            clear: both;
            overflow: hidden;
        }
       .edit-input{
            padding: 6px 10px;
            font-size: 14px;
            color: #333;
            outline:none;
       }
    }
    .div-input:hover{
        border:1px dashed #aaa;
    }
    .div-input_focus{
       background-color: #f4f4f4;
       border: solid 1px #f4f4f4;
       padding: 0;
    }
    .div-input_focus:hover{
        border-color: #f4f4f4;
    }
</style>
