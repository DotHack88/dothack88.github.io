
# Game Over – Digital Services Shop (Full Stack Demo)

Full-stack demo per la vendita di servizi digitali (profili gioco, streaming).  
Frontend React + Tailwind (Vite). Backend Node.js + Express + MongoDB (con flusso pagamento **mock** e fulfillment automatico).

> **Attenzione legale:** i marchi citati appartengono ai rispettivi proprietari. Questo progetto è una demo tecnica per servizi digitali generici.

## Avvio rapido (Docker consigliato)
1. Copia `.env.example` in `.env` e personalizza le variabili.
2. Avvia tutto con:
   ```bash
   docker-compose up --build
   ```
3. Frontend: http://localhost:5173  
   Backend API: http://localhost:8080

## Avvio manuale (senza Docker)
- Backend
  ```bash
  cd backend
  cp .env.example .env
  npm i
  npm run dev
  ```
- Frontend
  ```bash
  cd frontend
  npm i
  npm run dev
  ```

## Flusso pagamento mock
- Il checkout usa l'endpoint `/api/pay/mock/:orderId` che **simula** il pagamento, marca l'ordine come `paid` e attiva il **fulfillment**: l'ordine viene popolato con credenziali generate e lo stato passa a `fulfilled`.
- Integrare Stripe è facile: sostituisci la chiamata mock con una sessione Checkout e abilita il webhook `/api/webhook/stripe` (già predisposto).

## Credenziali admin (seed)
Nessuna area admin in questa demo. Puoi modificare i prodotti nel seed (`backend/src/seed.ts`).

## Note
- La persistenza utenti non è necessaria per effettuare ordini: il checkout richiede un'email.
- Sicurezza: JWT opzionale per area utente (non inclusa in questa demo).
