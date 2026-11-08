<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText , IonButton , IonList , IonItem} from '@ionic/vue';
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
        <div v-if="panierLignes.length === 0">
          <ion-text color="danger" >Votre panier est vide</ion-text>
          <ion-button router-link="/tabs/menu/" color="danger">Voir le menu</ion-button>
        </div>

        <ion-list v-else>
          <ion-item>

          </ion-item>
        </ion-list>
    </ion-content>
  </ion-page>
</template>


