/*
 * Tous les appels à l'API passent par ce fichier.
 * Les pages n'utilisent jamais fetch() directement.
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
import type { Categorie, Commande, NouvelleCommande, Plat } from '@/types/gargote';

export class ErreurApi extends Error {
  constructor(
    message: string,
    public statut: number,
    public details: Record<string, string> = {},
  ) {
    super(message);
  }
}

/**
 * Envoie une requête et renvoie le JSON de la réponse.
 * En cas de code HTTP d'erreur (4xx, 5xx), lève une Error qui contient
 * le statut et le corps de la réponse (message, erreurs...).
 */
async function requete<T>(chemin: string, options: RequestInit = {}): Promise<T> {
  // ... même corps qu'avant, mais :
    const reponse = await fetch(BASE_URL + chemin, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    });

    const donnees = reponse.status === 204 ? null : await reponse.json();

    if (!reponse.ok) {
      throw new ErreurApi(donnees?.message ?? `Erreur HTTP ${reponse.status}`, reponse.status, donnees?.erreurs ?? {});
    }
      return donnees as T;
}

export default {
  getCategories(): Promise<Categorie> {
    return requete('/categories');
  },

  getPlats(categorieId?:number | null): Promise<Plat[]> {
    if (categorieId != null) {
      return requete(`/plats?categorie=${categorieId}`)
    } else {
      return requete('/plats')
    }
  },

  getOnePlat(id: number | null): Promise<Plat> {
    return requete(`/plats/${id}`)
  },

  creerCommande(commande: NouvelleCommande): Promise<NouvelleCommande> {
    return requete('/commandes', { method: 'POST', body: JSON.stringify(commande) });
  },

  getCommandes(): Promise<Commande[]> {
    return requete('/commandes');
  },
};
