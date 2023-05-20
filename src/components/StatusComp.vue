<template>
    <div>
        <span :class="[typeClass]" class="white-text badge">{{stage}}</span>
    </div>
  </template>
  
  <script>
import constants from '@/utils/constants';
  
  export default {
     data: function () {
         return {
            typeClass: '',
            stage: ''
         };
     },
     mounted () {
        // eslint-disable-next-line
        Object.entries(constants.statuses).forEach(([key, value]) => {
            if(this.params.value === value.label) {
                this.typeClass = value.color
            }
        });  
        this.stage = this.params.value
     }
  }
  </script>
  
  <style>
  span.badge {
  min-width: 8rem;
  height: 25px;
  border: solid;
  border-color: black;
  border-width: 2px;
  font-size: smaller;
  margin-top: 6%;
  text-align: center;
}
  </style>