import { Button, Flex, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isExist, isNumber } from '@shared/utils';

import { PaymentSchema } from './types';

interface CheckoutFormProps {
	onSubmit: (paymentData: PaymentSchema) => void;
}

export const CheckoutForm = ({ onSubmit }: CheckoutFormProps) => {
	const paymentForm = useForm({
		initialValues: {
			name: '',
			email: '',
			cardNumber: '',
			cvc: '',
			expireDate: '',
		},

		validate: {
			name: (val) => (val.length > 1 ? null : 'too short name'),
			email: (val) =>
				isExist(val) && val.includes('@') && val.includes('.')
					? null
					: 'invalid email',
			cardNumber: (val) =>
				!isNumber(val)
					? 'type only number please'
					: // eslint-disable-next-line unicorn/no-nested-ternary
					val.length < 12
					? 'at least 12 numbers required'
					: null,
			cvc: (val) => (isNumber(val) ? null : 'type only number please'),
			expireDate: (val) =>
				isNumber(val) ? null : 'type only number please',
		},
	});

	return (
		<Stack spacing="sm">
			<form
				onSubmit={paymentForm.onSubmit((vals) => onSubmit(vals))}
				className="flex flex-col gap-2"
			>
				<TextInput
					minLength={2}
					placeholder="Your name"
					type="text"
					label="Name"
					required
					{...paymentForm.getInputProps('name')}
				/>
				<TextInput
					placeholder="Your email"
					label="Email"
					required
					{...paymentForm.getInputProps('email')}
				/>
				<TextInput
					placeholder="1234 4567 ****"
					label="Card number"
					required
					maxLength={12}
					minLength={12}
					className="mb-1"
					{...paymentForm.getInputProps('cardNumber')}
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
						{...paymentForm.getInputProps('expireDate')}
					/>
					<TextInput
						maxLength={3}
						minLength={3}
						placeholder="CVC"
						required
						{...paymentForm.getInputProps('cvc')}
					/>
				</Flex>
				<Button type="submit" variant="filled" className="bg-blue-500">
					Pay now
				</Button>
			</form>
		</Stack>
	);
};
