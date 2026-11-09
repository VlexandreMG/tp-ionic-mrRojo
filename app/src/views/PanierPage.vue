<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText , IonButton , IonList , IonItem, IonLabel , IonIcon, IonInput, alertController, loadingController} from '@ionic/vue';
import { usePanier } from '@/composables/usePanier';
import { formatAriary } from '../utils/format';
import {ref, computed} from 'vue';
import {addCircleOutline , removeCircleOutline} from 'ionicons/icons';

const { lignes , vider , total , changerQuantite } = usePanier();
const panierLignes = lignes;
const totalEnAriary = computed(() => formatAriary(total.value));
const table = ref('');
const erreurTable = ref('');
const envoi = ref(false);

async function envoyer() {
  // Afficher le chargement 
  const loading = await loadingController.create({ message: 'Envoi de la commande…' });
  await loading.present();
  try {
    // Etapes 4.2 et 4.3
  } catch (error) {
    // Etapes 4.4
  } finally {
    // Fermer le chargement 
    await loading.dismiss();
  }
}

async function confirmer() {
    const alerte = await alertController.create({
    header: 'Confirmer la commande',
    message: `Table ${table.value} : ${formatAriary(total.value)}`,  
    buttons: [
      {text: 'Annuler', role: 'cancel'},
      {text: 'Envoyer', role: 'confirm'},
    ],

  });
  // Affiche l'alert
  await alerte.present();
 // Quand l'alert se ferme 
  const { role } = await alerte.onDidDismiss();
  if (role === 'confirm') await envoyer();
}
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
      label-placement="floating" fill="outline" :class="{'ion-invalid ion-touched': erreurTable}" :error-text="erreurTable">
        <ion-button expand="block" class="ion-margin-top" :disabled="envoi" @click="confirmer">
          Envoyer la commande
        </ion-button>
      </ion-input>
    </ion-content>
  </ion-page>
</template>


