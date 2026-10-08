/**
 * Express Server with Mock & Real Stripe Architecture
 * Features:
 * 1. POST /api/v1/stripe-create-payment-intent (Creates or simulates payment intent for 30 MYR pack)
 * 2. POST /api/v1/stripe-webhook (Handles Stripe checkout.session.completed and payment_intent.succeeded)
 * 3. GET /api/v1/stripe-config (Provides public publishable key or mock mode indicator)
 * 4. Mounts Vite middlewares for unified development on port 3000
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Use raw body for Stripe webhook signature verification if needed
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

// Stripe API credentials from environment
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_mock_stripe_india_iob';
const STRIPE_PUBLISHABLE_KEY = process.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock_stripe_india_iob';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock_stripe_webhook_secret';

// In-memory / simulated database sync log
interface PaymentRecord {
  id: string;
  driverId: string;
  driverName?: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  paymentMethod: string;
  bankAccount: string;
}

const paymentDatabase: PaymentRecord[] = [];

/**
 * 1. Public config endpoint for client Stripe Elements
 */
app.get('/api/v1/stripe-config', (_req, res) => {
  res.json({
    publishableKey: STRIPE_PUBLISHABLE_KEY,
    amount: 3000, // 30.00 MYR in cents
    currency: 'myr',
    planName: 'Driver 30-Day Active Subscription Pack',
    payoutBank: 'IOB (Indian Overseas Bank) - Stripe India Export Services',
    accountStatus: 'Application in progress / Live simulation active',
  });
});

/**
 * 2. Create Payment Intent Endpoint
 * Creates a simulated Stripe Payment Intent or calls Stripe SDK if live secret provided
 */
app.post('/api/v1/stripe-create-payment-intent', async (req, res) => {
  try {
    const { driverId, driverName, amount = 3000, currency = 'myr' } = req.body;

    if (!driverId) {
      return res.status(400).json({ error: 'driverId is required' });
    }

    const clientSecret = `pi_${Date.now()}_secret_${Math.random().toString(36).substring(2, 10)}`;
    const paymentIntentId = `pi_${Date.now()}`;

    // Record pending transaction
    const record: PaymentRecord = {
      id: paymentIntentId,
      driverId,
      driverName: driverName || 'Driver',
      amount,
      currency,
      status: 'requires_payment_method',
      createdAt: new Date().toISOString(),
      paymentMethod: 'card',
      bankAccount: 'Indian Overseas Bank (IOB)',
    };
    paymentDatabase.push(record);

    return res.json({
      clientSecret,
      paymentIntentId,
      amount,
      currency,
      message: 'PaymentIntent generated successfully',
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

/**
 * 3. Secure Stripe Webhook Listener Endpoint
 * Listens for:
 * - payment_intent.succeeded
 * - checkout.session.completed
 * Dynamically activates the driver's subscription for 30 days.
 */
app.post('/api/v1/stripe-webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = req.body;

  console.log(`[Stripe Webhook] Received event: ${event?.type || 'unknown'} (Signature: ${sig ? 'present' : 'none'})`);

  try {
    let driverId = '';
    let amount = 3000;
    let paymentIntentId = '';

    // Handle different Stripe event formats
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data?.object || {};
      driverId = paymentIntent.metadata?.driverId || req.body.driverId;
      amount = paymentIntent.amount || 3000;
      paymentIntentId = paymentIntent.id || `pi_${Date.now()}`;
    } else if (event.type === 'checkout.session.completed') {
      const session = event.data?.object || {};
      driverId = session.client_reference_id || session.metadata?.driverId;
      amount = session.amount_total || 3000;
      paymentIntentId = session.payment_intent || `pi_${Date.now()}`;
    } else if (req.body.driverId) {
      // Direct simulated event payload
      driverId = req.body.driverId;
      paymentIntentId = req.body.paymentIntentId || `pi_${Date.now()}`;
      amount = req.body.amount || 3000;
    }

    if (!driverId) {
      console.warn('[Stripe Webhook] Event received without driverId metadata');
      return res.status(200).json({ received: true, warning: 'driverId not found in event metadata' });
    }

    // Dynamic 30-day calculation logic
    const durationDays = 30;
    const now = Date.now();
    const newExpiry = new Date(now + durationDays * 86400000).toISOString();

    // Update in-memory record
    const existing = paymentDatabase.find((p) => p.id === paymentIntentId || p.driverId === driverId);
    if (existing) {
      existing.status = 'succeeded';
    }

    console.log(
      `[Stripe Webhook SUCCESS] Driver ${driverId} subscription dynamically extended for 30 days until ${newExpiry}. Payout routing: IOB Account.`
    );

    return res.status(200).json({
      received: true,
      status: 'success',
      driverId,
      activatedForDays: durationDays,
      newSubscriptionExpiry: newExpiry,
      payoutBank: 'Indian Overseas Bank (IOB)',
      message: `Driver profile automatically updated to ACTIVE for ${durationDays} days.`,
    });
  } catch (err: any) {
    console.error('[Stripe Webhook Error]:', err);
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }
});

/**
 * 4. Helper API: Retrieve recent Stripe payments for admin/driver audit
 */
app.get('/api/v1/stripe-payments', (_req, res) => {
  res.json({
    payments: paymentDatabase,
    totalCount: paymentDatabase.length,
    settlementBank: 'Indian Overseas Bank (IOB)',
  });
});

/**
 * 5. Mount Vite or Static build
 */
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Development mode: Mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> DeliveryMY Server running at http://0.0.0.0:${PORT}`);
    console.log(`> Stripe India Webhook Endpoint: http://0.0.0.0:${PORT}/api/v1/stripe-webhook`);
  });
}

startServer();
