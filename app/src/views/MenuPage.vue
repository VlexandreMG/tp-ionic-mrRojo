<template>
  <!-- ion-page : l'enveloppe obligatoire de chaque page -->
  <ion-page>
    <!-- En-tête fixe en haut de l'écran -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu du jour</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar v-model ="recherche" placeholder="Rechercher un plat" :debounce="250"></ion-searchbar>
      </ion-toolbar>
         <!-- Troisième barre -->
      <ion-toolbar>
      <ion-segment v-model="categorieChoisie" scrollable @ion-change="charger">
        <ion-segment-button value="Toutes"><ion-label>Tout</ion-label></ion-segment-button>
        <ion-segment-button v-for="c in categories" :key="c.id" :value="String(c.id)">
        <ion-label>{{ c.nom }}</ion-label>
      </ion-segment-button>
    </ion-segment>
      </ion-toolbar>
    </ion-header> 

    <!-- Zone qui défile -->
    <ion-content>
      <ion-refresher slot="fixed" @ion-refresh="rafraichir">
        <ion-refresher-content />
      </ion-refresher>

      <!-- 1. Chargement en cours -->
      <div v-if="chargement" class="ion-text-center ion-padding">
        <ion-spinner />
      </div>

      <!-- 2. Erreur -->
      <div v-else-if="platsFiltre.length == 0" class="ion-padding">
        <ion-text color="danger">
          <p>{{ message }}</p>
        </ion-text>
        <ion-button expand="block" @click="charger">Réessayer</ion-button>
      </div>

      <!-- 3. La liste des plats -->
      <ion-list v-else>
        <ion-item v-for="plat in platsFiltre" :key="plat.id">
          <ion-label>
            <h2>{{ plat.nom }}</h2>
            <p>{{ plat.categorie.nom }}</p>
            <p>{{ plat.description }}</p>
            <ion-text color="primary"><strong>{{ plat.prix }}</strong></ion-text><ion-badge v-if="!plat.disponible" color="medium">Epuise</ion-badge>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted , computed} from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonSearchbar, IonBadge,
  IonRefresher, IonRefresherContent ,IonSpinner, IonText, IonButton, IonSegment , IonSegmentButton
} from '@ionic/vue';
import api from '@/services/api';

const plats = ref([]);
const categories = ref([]);
const chargement = ref(true);
const erreur = ref(null);
const recherche = ref("");
const categorieChoisie  = ref("Toutes");
const message = ref("")

const platsFiltre = computed (() => {
    const listePlats = plats.value
    const choosen = listePlats.filter((lp) => lp.nom.toLowerCase().includes(recherche.value.toLowerCase()))
    return choosen
})

async function rafraichir(event) {
  await charger();
  event.target.complete(); // arrête l'animation
}


async function charger() {
  chargement.value = true;
  erreur.value = null;
  try {
    if (categorieChoisie.value === "Toutes") {
      message.value = "Ne rien afficher XD"
      plats.value = []
    } else {
      plats.value = await api.getPlats(categorieChoisie.value);
    }
  } catch (e) {
    erreur.value = "Impossible de joindre l'API. Est-elle lancée ?";
    console.error(e);
  } finally {
    chargement.value = false;
  }
}

onMounted (async () => {
  charger();
  categories.value = await api.getCategories();
});

</script>
