<template lang="pug">
    .indexInfo
        .indexLogo
            img.logoImage(src = "../assets/p_1_n.png")
            .listImg
                img(src = "../assets/p_4_2.png")
                img(src = "../assets/p_4_2.png")
                img(src = "../assets/p_4_2.png")
            .loginEntry
                .gologin(@click="goUrl('/login',{from:'index'})")                        
                    span 登录
                .gologin(@click="goUrl('/register')")
                    span 注册  
                .index_icon                      
                    img(src = "../assets/p_2.jpg")
                    img(src = "../assets/p_2.jpg")
                    img(src = "../assets/p_2.jpg")
                    img(src = "../assets/p_2.jpg")
            .indexClock
                img(src="../assets/p_36.jpg")            
</template>

<script>
    export default {
        name: 'index',
        data(){
            return {
            }
        },
        methods: {           
        }
    }
</script>

<style lang="sass" scoped>

</style>
