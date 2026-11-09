<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText , IonButton , IonList , IonItem, IonLabel , IonIcon, IonInput} from '@ionic/vue';
import { usePanier } from '@/composables/usePanier';
import { formatAriary } from '../utils/format';
import { computed} from 'vue';
import {addCircleOutline , removeCircleOutline} from 'ionicons/icons';

const { lignes , vider , total , changerQuantite } = usePanier();
const panierLignes = lignes;
const totalEnAriary = computed(() => formatAriary(total.value));
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Panier</ion-title>
        <ion-button slot="end" color="secondary" @click="vider">
          Vider
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
        <div v-if="panierLignes.length === 0">
          <ion-text color="danger" >Votre panier est vide</ion-text>
          <ion-button router-link="/tabs/menu/" color="danger">Voir le menu</ion-button>
        </div>

        <ion-list v-else>
          <ion-item v-for="ligne in lignes" :key="ligne.plat.id">
            <ion-label>
              <h2>{{ ligne.plat.nom }}</h2>
              <p>{{ formatAriary(ligne.plat.prix) }} × {{ ligne.quantite }}</p>
            </ion-label>
            <ion-button slot="end" fill="clear" @click="changerQuantite(ligne.plat.id , -1)">
              <ion-icon slot="icon-only" :icon="removeCircleOutline"></ion-icon>
            </ion-button>
            <ion-button slot="end" fill="clear" @click="changerQuantite(ligne.plat.id , +1)">
              <ion-icon slot="icon-only" :icon="addCircleOutline"></ion-icon>
            </ion-button>
            <ion-label>
              <h2>Total : {{ totalEnAriary }}</h2>
            </ion-label>
          </ion-item>
        </ion-list>

      <ion-input v-model="table" type="number" label="Numéro de table"
      label-placement="floating" fill="outline">

      </ion-input>
    </ion-content>
  </ion-page>
</template>


