<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText } from '@ionic/vue';
import { usePanier } from '@/composables/usePanier';
import { formatAriary } from '../utils/format';
import { computed} from 'vue';

const { lignes , vider , total , changerQuantite } = usePanier();
const panierLignes = lignes;
const totalEnAriary = computed(() => formatAriary(total.value));
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Panier</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="lignes.lenght === 0">
        <ion-text color="medium">Votre panier est vide</ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>


