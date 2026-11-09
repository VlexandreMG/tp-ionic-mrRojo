<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText , IonList ,IonItem , IonLabel , IonButton, toastController , onIonViewWillEnter, IonBadge} from '@ionic/vue';
import {ref} from 'vue';
import api from '@/services/api';
import { formatDate , formatAriary } from '../utils/format';
import {usePanier} from '@/composables/usePanier';

const {total} = usePanier();
const commandes = ref([]);

function detailLignes(cmd) {
  return cmd.lignes.map(l => `${l.quantite} x ${l.nom}`).join(', ');
}

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

onIonViewWillEnter(charger);
</script>


<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Commandes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="commandes.length === 0">
          <ion-text color="danger" >Vous n'avez pas fait votre commande</ion-text>
          <ion-button router-link="/tabs/menu/" color="danger">Allez commandez dans le menu</ion-button>
      </div>

      <ion-list v-else>
        <ion-item v-for="cmd in commandes" :key="cmd.id">
          <ion-label>
            <h2> N°{{ cmd.id }}</h2>
            <p>Table N°{{ cmd.table }}</p>
            <p>Date : {{ formatDate(cmd.date) }}</p>
          </ion-label>
          <ion-label>
            <h2>{{ detailLignes(cmd) }}</h2>
            <h3>Total : {{ formatAriary(cmd.total) }}</h3>
          </ion-label>
          <ion-badge slot="end" color="warning">{{ cmd.statut }}</ion-badge>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
