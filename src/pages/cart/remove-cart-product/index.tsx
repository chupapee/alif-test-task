import { PropsWithChildren } from 'react';

import {
	Button,
	ButtonProps,
	Flex,
	Modal,
	ModalProps,
	Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { ProductDetailsDto } from '@pages/product-details';
import { useAppDispatch } from '@shared/config/redux-hooks';

import { removeCartProduct } from '../model';

interface RemoveCartProductButtonProps extends PropsWithChildren, ButtonProps {
	product: ProductDetailsDto;
}

export const RemoveCartProductButton = ({
	product,
	children,
	...attrs
}: RemoveCartProductButtonProps) => {
	const dispatch = useAppDispatch();
	const [confirmOpened, { open, close }] = useDisclosure(false);

	const handleSubmit = () => {
		notifications.show({ message: `${product.title} removed.` });
		dispatch(removeCartProduct(product));
		close();
	};

	return (
		<>
			<Button
				{...attrs}
				variant="white"
				className="sm:hover:-translate-y-1 transition-[transform_.1s_linear]"
				onClick={open}
			>
				{children}
			</Button>
			<ConfirmationModal
				title={`Remove ${product.title} from cart`}
				opened={confirmOpened}
				onClose={close}
				onConfirm={handleSubmit}
			/>
		</>
	);
};

interface ConfirmationModalProps extends ModalProps {
	onConfirm: () => void;
}

const ConfirmationModal = ({
	onConfirm,
	onClose,
	...attrs
}: ConfirmationModalProps) => {
	return (
		<Modal {...attrs} onClose={onClose} centered>
			<Text className="text-lg p-2">
				Are you sure you want to delete product from cart?
			</Text>
			<Flex justify="end">
				<Button onClick={onClose} variant="white">
					Cancel
				</Button>
				<Button color="red" onClick={onConfirm} className="bg-red-400">
					Confirm
				</Button>
			</Flex>
		</Modal>
	);
};
