import { useNavigate } from 'react-router-dom';

import { Modal, ModalProps } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useAppDispatch } from '@shared/config/redux-hooks';

import { buyProducts } from '../model';
import { CheckoutForm } from './checkout-form';
import { PaymentSchema } from './types';

type CheckoutModalProps = ModalProps;

export const CheckoutModal = ({ ...attrs }: CheckoutModalProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handlePaymentSubmit = (paymentData: PaymentSchema) => {
		//** do something with payment data */
		console.log(paymentData);
		dispatch(buyProducts());
		notifications.show({
			title: 'Thank You!',
			message: 'Your purchase was successfull!',
			withCloseButton: true,
			color: 'green',
		});
		navigate('/products');
	};

	return (
		<Modal {...attrs} title="Checkout">
			<CheckoutForm onSubmit={handlePaymentSubmit} />
		</Modal>
	);
};
