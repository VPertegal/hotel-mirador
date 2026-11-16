<script setup lang="ts">

import { reactive } from 'vue';
// @ts-ignore TypeScript has no declaration for this Vue component.
import HeaderComponent from '../components/HeaderComponent.vue';
import { useRoomStore } from '../stores/room.ts';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import router from '../router/index.ts';


const route = useRoute()
const roomStore = useRoomStore()

const state = reactive({
    date: "",
    available: false,
    dirty: false,
    reserved: true,
    occupant: "",
    dni: "",
})


let roomID = route.params.id;
let roomIDS = roomID.toString()
let room = roomStore.getRoom(roomIDS);


const funSubmit = () => {

    const bookDate = dayjs(state.date)
    const today = dayjs()

    if(bookDate.isBefore(today)) {
        alert ("No se puede seleccionar un día inferior al día de hoy")
        return;
    }
 else {
    roomStore.bookRoom( roomIDS, { ...state }) 
    roomStore.addDateTH(state.date)
    
    router.push({ path: "/rooms" })
}
}


</script>
<template>
    <HeaderComponent />
    <h2>Reserva para la habitación {{ room?.id }}</h2>
    <div class="form-container"> 
    <form @submit.prevent="funSubmit">
        <section class="form-section">
        <label class="labels">Fecha de reserva: </label>
        <input type="date" name="date" id="date" v-model="state.date" required>
        <br>
        <label class="labels">Titular de la reserva: </label>
        <input type="text" name="occupant" id="occupant" v-model="state.occupant" required>
        <br>
        <label class="labels">DNI: </label>
        <input type="text" name="dni" id="dni" v-model="state.dni" required>
        </section>
        <section class="form-btn">
        <button style="background-color: blue; color: white; border-radius: 5px; ">Reserva</button>
        </section>
    </form>
    </div>

</template>
<style>
.form-container {
     background-color: #0f172a;
    border: 1px solid #334155;
    border-radius: 12px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    margin: 20px auto;
    padding: 20px;
    max-width: 600px;
    color: #f8fafc;
    display: flex;
    justify-content: space-between;

.form-section {
    text-align: left;
    margin-top: 20px;
    margin-bottom: 20px;
    
    .labels {
       
        margin: 10px;
        color: white;
    }
.form-btn {
    text-align: center;
    }
}
}
</style>