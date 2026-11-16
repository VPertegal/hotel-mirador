<script setup lang="ts">
// @ts-ignore TypeScript has no declaration for this Vue component.
import HeaderComponent from '../components/HeaderComponent.vue';
import { computed } from 'vue';
import { useRoomStore } from '../stores/room'; // Ajusta la ruta según la ubicación de tu store
import dayjs from 'dayjs';


const roomStore = useRoomStore();

// Propiedad computada para extraer todas las reservas de forma aplanada
const historicalBookings = computed(() => {
    const bookings: Array<{ id: string; roomType: string; date: string; occupant: string, dni: string }> = [];
    // Recorremos las habitaciones de la store
    roomStore.rooms.forEach(room => {
        // Recorremos el array 'state' de cada habitación
        room.state.forEach(day => {
            // Si está reservado, lo añadimos a nuestra lista histórica
            if (day.reserved) {
                
                bookings.push({
                    id: room.id,
                    roomType: room.roomType,
                    date: day.date,
                    occupant: day.occupant || 'Sin nombre',
                    dni: day.dni
                    
                });

                bookings.sort(function (a, b) {
                    if (a.date > b.date) {
                        return 1;
                    }
                    if (a.date < b.date) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
            }
        });
    });

    return bookings;
});


</script>
<template>
    <HeaderComponent />
    <h2>Histórico de reservas</h2>
    
<h4 v-if="historicalBookings.length === 0"> No existen reservas </h4>
    <ul class="booking-list" v-for="(booking, index) in historicalBookings" :key="index">
        
        <li class="booking-item">
            
            <div class="booking-details">
            <h4>Fecha: {{ dayjs(booking.date).format("DD/MM/YYYY") }}</h4>
            <p >Habitación: {{ booking.id }}</p>
            <p>Tipo: {{ booking.roomType }}</p>
            <p>Ocupante: {{ booking.occupant }}</p>
            <p>DNI: {{ booking.dni }}</p>
            </div>
            <div class="booking-actions">
            <button class="delete-button" @click="roomStore.delBook(booking.id, booking.date)"> <img src="..\assets\papelera.png" alt="Borrar reserva" title="Borrar reserva"/> </button>
            </div>
            
        </li>

    </ul>
    
</template>
<style>

h2 {
    text-align: center;
    color: #f8fafc;
    margin-top: 20px;
}

.booking-list {
    list-style-type: none; /* Elimina los puntos de la lista */}
    .booking-item {
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

        .booking-details {
            flex: 1;
            margin-right: 20px;
        }
        .booking-actions {
            display: flex;
            align-items: center;
        }
    }

    .delete-button {
        background-color: transparent;
        border: none;
        img {
            width: 30px;
            height: 30px;
        }

        img:hover {
            filter: brightness(0.8);
            width: 35px;
            height: 35px;
            cursor: pointer;
        }
    }


</style>