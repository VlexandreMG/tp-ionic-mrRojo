<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText } from '@ionic/vue';
import {ref} from 'vue';
import api from '@/services/api';

const commandes = ref([]);

async function charger() {
  try {
    commandes.value = await api.getCommandes();
  } catch (error) {
    
  }
}
</script>


<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Commandes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p class="ion-text-center">
        <ion-text color="medium">Page à construire (fiche 04).</ion-text>
      </p>
    </ion-content>
  </ion-page>
</template>
