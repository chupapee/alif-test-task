import { Flex, Image, Indicator, Title } from '@mantine/core';
import { selectCartProducts } from '@pages/cart';
import { useAppSelector } from '@shared/config/redux-hooks';
import { Link, Outlet } from 'react-router-dom';

export const App = () => {
	return (
		<Flex direction="column" py={25} px={15}>
			<Header />
			<Outlet />
		</Flex>
	);
};

const Header = () => {
	const cartProducts = useAppSelector(selectCartProducts);

	return (
		<Flex
			justify="space-between"
			align="center"
			className="sticky -top-1 bg-white z-10 py-4 mt-0"
		>
			<Title className="text-xl md:text-2xl" weight={500}>
				E-Commerce
			</Title>
			<Link
				to="/cart"
				className="hover:-translate-y-2 transition-[transform_.1s_linear]"
			>
				<Indicator
					disabled={cartProducts.length === 0}
					size={20}
					label={cartProducts.length}
				>
					<Image src="/cart.svg" alt="cart" width="30px" />
				</Indicator>
			</Link>
		</Flex>
	);
};
