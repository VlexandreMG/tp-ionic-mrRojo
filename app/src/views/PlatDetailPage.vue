<script setup>
import {ref , onMounted} from 'vue';
import api from '@/services/api';
import {
    IonHeader , IonPage , IonButtons , IonBackButton
} from '@ionic/vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
onMounted(charger);

const plat = ref(null)
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