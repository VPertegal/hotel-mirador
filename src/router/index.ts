import { createRouter, createWebHistory } from 'vue-router';
import Principal from '../views/Principal.vue';
import Rooms from '../views/Rooms.vue';
import RoomDetails from '../views/RoomDetails.vue';
import BookRoom from '../views/BookRoom.vue';
import BookingHistory from '../views/BookingHistory.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: "/",
        name: "Principal",
        component: Principal
    },
    {
        path: "/rooms",
        name: "Rooms",
        component: Rooms
    },
    {
        path: "/rooms/:id",
        name: "roomDetails",
        component: RoomDetails
    },
    {
        path: "/rooms/:id/bookroom",
        name: "bookRoom",
        component: BookRoom
    },
    {
        path:"/bookinghistory",
        name: "bookingHistory",
        component: BookingHistory
    }
]

})

export default router;