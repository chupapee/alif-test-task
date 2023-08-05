import { FormEventHandler, useState } from 'react';

import { Button, Flex, Stack, TextInput } from '@mantine/core';

import { PaymentSchema } from './types';

interface CheckoutFormProps {
	onSubmit: (paymentData: PaymentSchema) => void;
}

export const CheckoutForm = ({ onSubmit }: CheckoutFormProps) => {
	const [user, setUser] = useState({ name: '', email: '' });
	const [card, setCard] = useState({
		cardNumber: '',
		cvc: '',
		expiryDate: '',
	});

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		onSubmit({ ...user, cardData: { ...card } });
	};

	return (
		<Stack spacing="sm">
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<TextInput
					minLength={2}
					placeholder="Your name"
					label="Name"
					required
					value={user.name}
					onChange={(e) =>
						setUser((prev) => ({ ...prev, name: e.target.value }))
					}
				/>
				<TextInput
					placeholder="Your email"
					label="Email"
					required
					value={user.email}
					onChange={(e) =>
						setUser((prev) => ({ ...prev, email: e.target.value }))
					}
				/>
				<TextInput
					placeholder="1234 4567 ****"
					label="Card number"
					required
					maxLength={12}
					minLength={12}
					className="mb-1"
					value={card.cardNumber}
					onChange={(e) =>
						setCard((prev) => ({
							...prev,
							cardNumber: e.target.value,
						}))
					}
				/>
				<Flex
					gap={4}
					justify="space-between"
					className="[&>*]:w-full mb-2"
				>
					<TextInput
						maxLength={4}
						minLength={4}
						placeholder="MM/YY"
						required
						value={card.expiryDate}
						onChange={(e) =>
							setCard((prev) => ({
								...prev,
								expiryDate: e.target.value,
							}))
						}
					/>
					<TextInput
						maxLength={3}
						minLength={3}
						placeholder="CVC"
						required
						value={card.cvc}
						onChange={(e) =>
							setCard((prev) => ({
								...prev,
								cvc: e.target.value,
							}))
						}
					/>
				</Flex>
				<Button type="submit" variant="filled" className="bg-blue-500">
					Pay now
				</Button>
			</form>
		</Stack>
	);
};
