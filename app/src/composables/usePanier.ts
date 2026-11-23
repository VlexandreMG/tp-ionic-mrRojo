import {computed, ref} from 'vue';
import type {Plat, LignePanier} from '@/types/gargote';

const lignes = ref<LignePanier[]>([]);

export function usePanier() {
    function ajouter(plat: Plat): void {
        const ligne = lignes.value.find(l => l.plat.id === plat.id);
        if (ligne !== undefined) {
            ligne.quantite++;
        } else {
            lignes.value.push({plat,quantite: 1});
        }
    }

    function changerQuantite(platId: number , delta: number) {
        const line = lignes.value.find(l => l.plat.id === platId);
        if (line !== undefined) {
            line.quantite += delta;
            if (line.quantite <= 0) {
                lignes.value = lignes.value.filter(l => l.plat.id != platId);
            }
        }
    }

    function vider() {
        lignes.value = [];
    }

    const nombreArticles = computed(() => 
        lignes.value.reduce((somme,l) => somme + l.quantite, 0));
    const total = computed(() => 
        lignes.value.reduce((somme,l) => somme + Number(l.plat.prix) * l.quantite,0));

    return {lignes, ajouter, changerQuantite, vider, nombreArticles, total};
}