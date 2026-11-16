<script setup lang="ts">
defineProps({
    room: {
        type: Object,
        required: true
    },
})
</script>
<template>

    <td class="room-id">
        <RouterLink :to="{ name: 'roomDetails', params: { id: room?.id } }"> {{ room.id }}</RouterLink>
    </td>
    <td>{{ room.floor }}</td>
    <td>{{ room.roomType }}</td>
    <td v-for="(n, index) in room.state" :key="index">
        <p v-if="n.available && !n.dirty && !n.reserved" style="color: green;">Disponible</p>
        <p v-if="!n.available && !n.dirty && !n.reserved" style="color: red;">No disponible</p>
        <p v-if="!n.available && n.dirty" style="color: yellow;">Sucia</p>
        <p v-if="!n.available && !n.dirty && n.reserved" style="color: blue;">Reservada</p>
    </td>


</template>
<style></style>

/* ?. (El encadenamiento opcional): Evalúa si room tiene un valor
válido (es decir, que no sea null ni undefined).

Si room existe: Continúa y lee la propiedad.

Si room es null o undefined: Se detiene inmediatamente y devuelve
undefined en lugar de romper el código.*/