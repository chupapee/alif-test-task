import { Flex, Image, Title } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';

export const App = () => {
	return (
		<Flex direction="column" py={25} px={15} gap="lg">
			<Header />
			<Outlet />
		</Flex>
	);
};

const Header = () => (
	<Flex justify="space-between" align="center">
		<Title className="text-xl md:text-2xl" weight={500}>
			E-commerce app
		</Title>
		<div className="flex gap-4 items-center">
			<Link to="/wishlist">
				<Image src="/wishlist.svg" alt="wishlist" width="40px" />
			</Link>
			<Link to="/cart">
				<Image src="/cart.svg" alt="cart" width="40px" />
			</Link>
		</div>
	</Flex>
);
