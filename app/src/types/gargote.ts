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
