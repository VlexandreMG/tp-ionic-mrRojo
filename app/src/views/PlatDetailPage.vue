<script setup>
import {ref , onMounted} from 'vue';
import api from '@/services/api';
import {
    IonHeader , IonPage , IonButtons , IonBackButton , IonCard , IonCardHeader ,
    IonCardContent , IonCardTitle , IonCardSubtitle , 
} from '@ionic/vue'
import { useRoute } from 'vue-router';

const plat = ref("")
const route = useRoute();
const id = route.params.id;

async function charger() {
    plat.value = await api.getOnePlat(id);
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

        <ion-card v-if="plat">
            <ion-card-header>
                <ion-card-title>{{ plat.nom }}</ion-card-title>
                <ion-card-subtitle>{{ plat.categorie.nom }}</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
                <p>{{ plat.description }}</p>
                <p>{{ plat.prix }}</p>
            </ion-card-content>
        </ion-card>
    </ion-page>
</template>