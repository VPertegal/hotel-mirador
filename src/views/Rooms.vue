<script setup lang="ts">
import dayjs from 'dayjs'
import RoomRow from '../components/RoomRow.vue';

import { useRoomStore } from '../stores/room';
// @ts-ignore TypeScript has no declaration for this Vue component.
import HeaderComponent from '../components/HeaderComponent.vue';
import FilterComponent from '../components/FilterComponent.vue';


const roomStore = useRoomStore()




</script>
<template>
    <HeaderComponent />
    
   <FilterComponent />
   <div class="div-tbl">
    <table>
        <thead>
  <tr> <!-- Abre una fila para la cabecera -->
    <th>Habitación</th>
    <th>Piso</th> 
    <th>Tipo</th>
    <!-- Genera dinámicamente los encabezados de fecha -->
    <template v-if="roomStore.dateTH.size > 0">
      <th v-for="n in roomStore.dateTH" :key="n">
        {{ dayjs(n).format("DD/MM/YYYY") }}
      </th>
    </template>
  </tr>
</thead>
        <tbody>
            <tr v-for="room in roomStore.filteredRooms" :key="room.id">
                <RoomRow :room="room"></RoomRow>
            </tr>
        </tbody>
    </table>
    </div>
</template>
<style>

/* Contenedor principal que alinea y limita el ancho de la tabla con el header */
.div-tbl {
  width: 100%;
  max-width: 1300px;
  margin: 30px auto; /* Centra la tabla horizontalmente */
  overflow-x: auto;  /* Permite scroll horizontal si la pantalla es pequeña */
  background-color: #0f172a;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  border: 1px solid #334155;
}

/* Estilo nativo y correcto para la tabla */
table {
  width: 100%;
  border-collapse: collapse; /* Elimina espacios entre celdas para que cuadren las columnas */
  text-align: center;
  color: #f8fafc;
}

/* Cabecera */
thead {
  background-color: #1e293b;
  border-bottom: 2px solid #334155;
}

th {
  padding: 1rem 1.5rem;
  font-size: 0.8rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #94a3b8;
}

/* Celdas del cuerpo */
td {
  padding: 1rem 1.5rem;
  font-size: 0.95rem;
  border-bottom: 1px solid #1e293b;
}

/* Alternancia de colores elegante para tema oscuro */
tbody tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.02);
}

tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

</style>