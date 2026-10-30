<script setup>
import {ref , onMounted} from 'vue';
import api from '@/services/api';
import {
    IonHeader , IonPage , IonButtons , IonBackButton
} from '@ionic/vue'
import { useRoute } from 'vue-router';

const plat = ref(null)
const route = useRoute();
const id = route.params.id;

async function charger() {
    plat.value = await api.getPlats(id);
}

onMounted(charger);

</script>

<template>
    <ion-page>
        <ion-header>
            <ion-buttons slot="start">
              <ion-back-button default-href="/tabs/menu" text="Menu" />
            </ion-buttons>
        </ion-header>
    </ion-page>
</template>