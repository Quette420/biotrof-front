<template>
    <div>
        <div class="v-popup__header">
            <span>
               
            </span>
            <span>
                <i 
                class="material-icons"
                @click="closePopUp"
                >close</i>
            </span>
        </div>
        <div class="v-popup__content">
            <slot></slot>
            <OrdersInfographic
            />
        </div>
        <div class="v-popup__footer">
          
        </div>
    </div>
</template>

<script>
import OrdersInfographic from '../../views/OrdersInfographics.vue'

export default {
    name: "v-popup",
    components: {
        OrdersInfographic
    },
    data() {
        return {}
    },
    methods: {
        closePopUp() {
            this.$emit('closePopUp');
        }
    }
}

</script>

<style lang="scss">
    .v-popup {
        padding: 16px;
        position: fixed;
        top: 50px;
        width: 400px;
        background: #ffffff;
        box-shadow: 0 0 17px 0 #e7e7e7;
        &__header, &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .submit_btn {
        padding: 8px;
        color: #ffffff;
        background: #26ae68;
    }
    .close {
        padding: 8px;
        color: #ffffff;
        background: red;
    }
</style>