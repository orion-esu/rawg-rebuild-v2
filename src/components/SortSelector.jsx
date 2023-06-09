import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import useGameQueryStore from '../store';

const SortSelector = () => {
	const sortValue = useGameQueryStore((state) => state.gameQuery.sortValue);
	const setSortValue = useGameQueryStore((state) => state.setSortValue);

	const sortOrders = [
		{ value: '', label: 'Relevance' },
		{ value: '-name', label: 'Name' },
		{ value: '-released', label: 'Released' },
		{ value: '-added', label: 'Added' },
		{ value: '-rating', label: 'Rating' },
		{ value: '-metacritic', label: 'Metacritic' },
	];

	const currentOrder = sortOrders.find((el) => el.value === sortValue);

	return (
		<Menu>
			<MenuButton
				borderRadius='md'
				borderWidth='1px'
				as={Button}
				rightIcon={<BsChevronDown />}
			>
				Order By: {currentOrder?.label || 'Relevance'}
			</MenuButton>
			<MenuList>
				{sortOrders.map((order) => (
					<MenuItem
						key={order.value}
						value={order.value}
						onClick={() => setSortValue(order.value)}
					>
						{order.label}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

export default SortSelector;
