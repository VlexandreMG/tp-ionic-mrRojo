<script setup>
import {
    IonHeader , IonPage , IonButtons , IonBackButton
} from '@ionic/vue'
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-buttons slot="start">
              <ion-back-button default-href="/tabs/menu" text="Menu" />
            </ion-buttons>
        </ion-header>
    </ion-page>
</template>