<template>
    <div>
        <input type="text" name="name" v-model="input">
        <div>
            {{input}}
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            input:'GUMX-1'
        }
    }
}
</script>

