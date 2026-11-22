export interface Categorie {
  id: number;
  nom: string;
}

export interface Plat {
  id: number;
  nom: string;
  description: string;
  /** Montant envoyé par l'API sous forme de chaîne : "6000.00" */
  prix: string;
  categorie_id: number;
  disponible: boolean;
  categorie: Categorie | null;
}

export type StatutCommande = 'en_attente' | 'en_preparation' | 'servie' | 'payee' 

export interface LigneCommande {
  plat_id: number;
  nom: string;
  quantite: number;
  prix_unitaire: string;
  sous_total: string;
}

export interface Commande {
  id: number;
  table: number;
  date: string;
  statut: StatutCommande;
  total: string;
  lignes: LigneCommande[];
}

export interface LignePanier {
  plat: Plat;
  quantite: number;
}

export interface NouvelleCommande {
  table: Number;
  lignes: {plat_id:number ; quantite:number}[];
}