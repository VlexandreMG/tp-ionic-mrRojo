import {ref} from 'vue';

const lignes = ref([]);

export function usePanier() {
    function ajouter(plat) {
        const ligne = lignes.value.find(l => l.plat.id === plat.id);
        if (ligne != undefined) {
            ligne.quantite++;
        } else {
            lignes.push({plat,quantite: 1});
        }
    }

    function chargerQuantite(platId , delta) {
        const line = lignes.value.find(l => l.plat.id === platId);
        if (line != undefined) {
            line.quantite += delta;
            if (line.quantite <= 0) {
                lignes.value.filter(l => l.plat.id != platId);
            }
        }
    }
}