<script setup>
import {ref , onMounted} from 'vue';
import api from '@/services/api';
import {
    IonHeader , IonPage , IonButtons , IonBackButton , IonCard , IonCardHeader ,
    IonCardContent , IonCardTitle , IonCardSubtitle , IonText , IonButton , useIonRouter
} from '@ionic/vue'
import { useRoute } from 'vue-router';
import { usePanier } from '@/composables/usePanier';

const { ajouter } = usePanier();
const ionRouter = useIonRouter();
const plat = ref("")
const erreur = ref("")
const route = useRoute();
const id = route.params.id;

async function addInBasket(plat) {
    ajouter(plat);
    ionRouter.back();
}

async function charger() {
    try {
        plat.value = await api.getOnePlat(id);
    } catch (error) {
        if (error.statut === 404) {
            erreur.value = "Ce plat n'existe pas"
        } else {
            erreur.value = "Impossible de joindre l'API"
        }
    }
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

        <div v-if="erreur" class="ion-padding">
                <ion-text color="danger">
                <p>{{ erreur }}</p>
                </ion-text>
        </div>

        <ion-card v-if="plat">
            <ion-card-header>
                <ion-card-title>{{ plat.nom }}</ion-card-title>
                <ion-card-subtitle>{{ plat.categorie.nom }}</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
                <p>{{ plat.description }}</p>
                <p>{{ plat.prix }}</p>
            
            <ion-button expand="block" :disabled="!plat.disponible"
            @click="addInBasket(plat)">
            Ajouter au panier
            </ion-button>

            </ion-card-content>
        </ion-card>
    </ion-page>
</template>