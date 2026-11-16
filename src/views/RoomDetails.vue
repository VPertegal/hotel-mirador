<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useRoomStore } from '../stores/room';
import { watch } from 'vue';
// @ts-ignore TypeScript has no declaration for this Vue component.
import HeaderComponent from '../components/HeaderComponent.vue';

const route = useRoute()
const roomStore = useRoomStore()
const name = ref("")
const dni = ref("")



let roomID = route.params.id;
let roomIDS = roomID.toString()
let room = roomStore.getRoom(roomIDS);

watch(
    () => route.params.id,
    () => {
        roomID = route.params.id;
        room = roomStore.getRoom(roomIDS);
    }
)

const checkIn = () => {

    room!.state[0].occupant = name.value
    room!.state[0].dni = dni.value
    room!.state[0].available = false;

    name.value = ""
    dni.value = ""
}

const checkOut = () => {
    alert("Se realizó el check-out")
    room!.state[0].dirty = true;
}

const clean = () => {
    alert("Se limpió la habitación. Disponible")
    room!.state[0].dirty = false;
    room!.state[0].available = true;
}

</script>
<template>
    <HeaderComponent />
    <h2>Detalles de la habitación</h2>
    <h3 v-if="!room">La habitación no existe</h3>
    <div v-else class="room-details-container">

        <section class="room-details">


            <h4>Habitación: {{ room.id }}</h4>

            <p>Planta: {{ room.floor }}</p>
            <p>Tipo: {{ room.roomType }}</p>
            <p v-if="room.state[0].available">Estado: Disponible</p>
            <p v-else-if="!room.state[0].available && !room.state[0].dirty"> Estado: No disponible <br>
                Ocupada por: {{ room.state[0].occupant }}
            </p>
            <p v-else>Estado: Sucia</p>
        </section>

        <section class="booking-actions">
            <div v-if="room.state[0].available">
                <form class="formu" @submit.prevent="checkIn">
                    <label class="labels">Nombre: </label>
                    <input type="text" placeholder="Inserte nombre" v-model="name" required>
                    <br>
                    <label class="labels">DNI: </label>
                    <input type="text" placeholder="Inserte DNI" v-model="dni" required>
                    <br>
                    <button style="background-color: green; color: white; border-radius: 5px;">Check-in</button>
                </form>
            </div>
            <div v-if="!room.state[0].available && !room.state[0].dirty">

                <button v-on:click="checkOut" style="background-color: red; color: white; border-radius: 5px;">Check-out</button>

            </div>
            <div v-if="room.state[0].dirty">
                <button v-on:click="clean" style="background-color: yellow; color: black; border-radius: 5px;">Limpiar</button>
            </div>
            <div>
                <p>
               
                    <RouterLink :to="{ name: 'bookRoom', params: { id: room?.id } }"> <button style="background-color: blue; color: white; border-radius: 5px;">Reservar habitación </button>
                    </RouterLink>
                </p>
            </div>
        </section>
    </div>


</template>
<style>
.room-details-container {
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

    .room-details {
        flex: 1;
        margin-right: 20px;
        text-align: left;
    }

    .booking-actions {
        text-align: right;
        .formu {
            
            margin-top: 20px;
            margin-bottom: 20px;

            .labels {

                margin: 10px;
                color: white;
            }

        }
    }
}
</style>

/* ! (Operador de aserción no nula):
Este es un operador exclusivo de TypeScript. Le dice al compilador:
"Confía en mí, sé que room existe y no es null ni undefined en este momento".

¿Por qué se pone? Porque métodos como .find() a veces pueden no encontrar
nada y devolver undefined. Si TypeScript fuera estricto, se quejaría si intentas
leer propiedades de algo que podría ser undefined. Con el ! le quitas esa advertencia.*/