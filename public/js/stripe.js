import axios from 'axios';
import { showAlert } from './alert';

// eslint-disable-next-line no-undef
const stripe = Stripe(
  'pk_test_51N0hsWG78snuLnjhRakCKM1jVJsb6kW1IRZEtWDPO0lwSNYM8ECzExO10fzOwFRRjltXDZUQFnlm6DhMlDzM4u3o00UkS8WJMs'
);
export const bookTour = async (tourId) => {
  try {
    //1 Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    //2 Create checkout form + chanre credit card

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
