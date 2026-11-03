# ✂️ Etienne Coiffure — Site vitrine

Site web statique du salon de coiffure **Etienne Coiffure**, situé au 131 rue Sébastien Gryphe, Lyon 7ᵉ (69007).

## 🧩 Contenu du dépôt

| Fichier | Rôle |
|---|---|
| `index.html` | Page unique du site (accueil, salon, prestations, horaires, avis, contact) |
| `css/style.css` | Styles modernes et responsive (thème charbon / doré) |
| `js/script.js` | Menu mobile, horaires du jour, statut ouvert/fermé, validation du formulaire |
| `vercel.json` | Configuration Vercel (cleanUrls, en-têtes de sécurité) |

## 📋 Informations du salon

- **Adresse** : 131 Rue Sébastien Gryphe, 69007 Lyon
- **Téléphone** : 07 49 92 58 12
- **Horaires** : Lundi 09:00–19:00 · Mardi–Samedi 09:00–12:00 / 13:30–19:00 · Dimanche fermé
- **Réservation en ligne** : [Planity](https://www.planity.com/etienne-coiffure-69007-lyon)

## 🚀 Déploiement sur Vercel

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous (GitHub recommandé).
2. Cliquez sur **Add New → Project**, puis sélectionnez le dépôt `ptt45/etienne-coiffure`.
3. Vercel détecte automatiquement un site statique : laissez tous les paramètres par défaut.
4. Cliquez sur **Deploy**.
5. Après le déploiement, ajoutez votre nom de domaine dans **Settings → Domains** si vous en avez un.

Chaque fusion (merge) sur la branche `main` déclenche automatiquement une mise en production, et chaque push sur `develop` crée un aperçu (*preview*) sur Vercel.

## ✏️ Personnalisation

- **Textes** : modifiez directement `index.html` (chaque section est commentée).
- **Photo du salon** : déposez une image `img/salon.jpg` dans le dépôt, puis remplacez la carte `placeholder-card` de la section « Le salon » par :

  ```html
  <img src="img/salon.jpg" alt="Le salon Etienne Coiffure" style="border-radius:14px;box-shadow:0 10px 30px rgba(23,19,17,.1);">
  ```

- **Couleurs** : ajustez les variables CSS en haut de `css/style.css` (`--noir`, `--or`, `--creme`…).
- **Horaires** : mettez à jour le tableau dans `index.html` **et** l'objet `OPENING_HOURS` dans `js/script.js`.
