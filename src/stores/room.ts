import { defineStore } from "pinia";
import { computed, ref } from "vue";
import dayjs from "dayjs";

export const useRoomStore = defineStore(
  "room",
  () => {
    const dateTH = ref(new Set([dayjs().format("YYYY-MM-DD")]));

    const rooms = ref([
      {
        id: "100",
        floor: "1",
        roomType: "Individual",
        state: [
          {
            date: dayjs().format("YYYY-MM-DD"),
            available: true,
            dirty: false,
            reserved: false,
            occupant: "",
            dni: "",
          },
        ],
      },

      {
        id: "101",
        floor: "1",
        roomType: "Doble",
        state: [
          {
            date: dayjs().format("YYYY-MM-DD"),
            available: true,
            dirty: false,
            reserved: false,
            occupant: "",
            dni: "",
          },
        ],
      },

      {
        id: "200",
        floor: "2",
        roomType: "Doble",
        state: [
          {
            date: dayjs().format("YYYY-MM-DD"),
            available: true,
            dirty: false,
            reserved: false,
            occupant: "",
            dni: "",
          },
        ],
      },

      {
        id: "201",
        floor: "2",
        roomType: "Triple",
        state: [
          {
            date: dayjs().format("YYYY-MM-DD"),
            available: true,
            dirty: false,
            reserved: false,
            occupant: "",
            dni: "",
          },
        ],
      },

      {
        id: "300",
        floor: "3",
        roomType: "Individual",
        state: [
          {
            date: dayjs().format("YYYY-MM-DD"),
            available: true,
            dirty: false,
            reserved: false,
            occupant: "",
            dni: "",
          },
        ],
      },

      {
        id: "301",
        floor: "3",
        roomType: "Triple",
        state: [
          {
            date: dayjs().format("YYYY-MM-DD"),
            available: true,
            dirty: false,
            reserved: false,
            occupant: "",
            dni: "",
          },
        ],
      },
    ]);

    const getRoom = (roomID: string) => {
      return rooms.value.find((room) => room.id === roomID);
    };

    //Recibe la fecha como parámetro
    const addDateTH = (dateP: string) => {
      if (!dateTH.value.has(dateP)) {
        const restDays = dayjs(dateP).diff(dayjs(), "days");

        for (let i = 1; i <= restDays; i++) {
          dateTH.value.add(dayjs().add(i, "day").format("YYYY-MM-DD"));
        }
        dateTH.value.add(dateP);
      }
    };

    const bookRoom = (
      roomID: string,
      state: {
        date: string;
        available: boolean;
        dirty: boolean;
        reserved: boolean;
        occupant: string;
        dni: string;
      },
    ) => {
      const IDfind = rooms.value.find((room) => room.id === roomID);
      if (IDfind) {
        const dateFind = IDfind.state.findIndex(
          (room) => room.date === state.date,
        );

        if (dateFind >= 0) {
          const targetDay = IDfind.state[dateFind];
          if (!targetDay.reserved && targetDay.available) {
            alert("Se realizó la reserva");

            IDfind.state.splice(dateFind, 1, state);
          } else {
            alert("No se puede reservar esta fecha (ya está ocupada)");
          }
        } else {
          const restDays = dayjs(state.date).diff(IDfind.state[IDfind.state.length-1].date, "days");

          for (let i = 1; i < restDays; i++) {

            let newDate = dayjs(IDfind.state[IDfind.state.length-1].date).add(1, "day").format("YYYY-MM-DD");
            
            IDfind.state.push({
              date: newDate,
              available: true,
              dirty: false,
              reserved: false,
              occupant: "",
              dni: "",
            });
          }

          // Si el día no existe en el array, se añade como nueva reserva
          IDfind.state.push(state);

          IDfind.state.sort(function (a, b) {
            if (a.date > b.date) {
              return 1;
            }
            if (a.date < b.date) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });

         

          alert("Se realizó la reserva");
        }
      }
    };

    const filters = ref({ floor: "", roomType: "", available: false, dirty: false });

    const filteredRooms = computed(() => {
      return rooms.value.filter((room) => {
        const matchesFloor =
          !filters.value.floor || room.floor === filters.value.floor;
        const matchesType =
          !filters.value.roomType ||
          room.roomType.toLocaleLowerCase() ===
            filters.value.roomType.toLocaleLowerCase();
        const matchesAvailable =
          !filters.value.available ||
          room.state[0]?.available === filters.value.available;

        const matchesDirty =
          !filters.value.dirty ||
          room.state[0]?.dirty === filters.value.dirty;
       
        return matchesFloor && matchesType && matchesAvailable && matchesDirty;
      });

      
    });

    const delBook = (roomID: string, roomDATE: string) => {
      const IDfind = rooms.value.find((room) => room.id === roomID);
      if (IDfind) {
        let uDate = dayjs(roomDATE).format("YYYY-MM-DD");
        const dateFind = IDfind.state.findIndex((room) => room.date === uDate);

        if (dateFind >= 0) {
          const targetDay = IDfind.state[dateFind];
          if (targetDay.reserved) {
            alert("Se borró la reserva");
            targetDay.date = targetDay.date
            targetDay.available = true;
            targetDay.occupant = "";
            targetDay.reserved = false;
            targetDay.dni = ""
            targetDay.dirty = false;
            
          } else {
            alert("No se puede borrar esta fecha");
          }
        }
      } else {
        alert("No se encuentra la habitación");
      }
    };

    return {
      getRoom,
      addDateTH,
      dateTH,
      bookRoom,
      rooms,
      filters,
      filteredRooms,
      delBook,
    };
  },
  {
    persist: true,
  },
);
