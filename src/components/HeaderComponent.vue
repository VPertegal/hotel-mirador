<script setup>

</script>
<template>
    <header class="header">
    

        <h1>Hotel Mirador</h1>

        <nav class="nav-list">
           
        <ul class="list">
<!--Se usa la etiqueta a para enlaces fuera de nuestra web.
Para enlaces dentro: RouterLink-->
            <li><RouterLink class="link" to="/">Inicio</RouterLink></li>
            <li><RouterLink class="link" to="/rooms">Habitaciones</RouterLink></li>
            <li><RouterLink class="link" to="/bookinghistory">Reservas</RouterLink></li>
        </ul>
        </nav>
    </header>
</template>
<style>
.header {
    background-color: gray;
    color: black;
    text-align: center;
    padding: 20px;
    .nav-list {
        .list {
            display: flex;
            justify-content: space-around;
            list-style-type: none;
            .link {
                color: black;
                text-decoration: none;
            
                }
            }
        
    }
    
}
.link:hover {
    font-weight: bold;
}
</style>