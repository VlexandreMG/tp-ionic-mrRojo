<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText } from '@ionic/vue';
import {ref} from 'vue';
import api from '@/services/api';
import { usePanier } from '@/composables/usePanier';

const { lignes } = usePanier();
const commandes = ref([]);
const panierLignes = lignes;

async function charger() {
  try {
    commandes.value = await api.getCommandes();
  } catch (error) {
    const toast = await toastController.create({
        message:`${error.message}`,
        duration: 1500, color: 'danger',
      });
      await toast.present();
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
      <div v-if="panierLignes.length === 0">
          <ion-text color="danger" >Votre panier est vide</ion-text>
          <ion-button router-link="/tabs/menu/" color="danger">Voir le menu</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>
